"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import type { EditorApi } from "./PostEditor";

type Visibility = "ALL" | "GROUP" | "MY";

// ✅ TipTap은 SSR 이슈 방지 위해 client-only 로드
const PostEditor = dynamic(() => import("./PostEditor"), { ssr: false });

export default function Page() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("ALL");
  const [tags, setTags] = useState<string[]>([]);
  const [contentHtml, setContentHtml] = useState<string>("");

  const editorApiRef = useRef<EditorApi | null>(null);

  const canSubmit = useMemo(() => {
    return title.trim() && address.trim() && stripHtml(contentHtml).trim();
  }, [title, address, contentHtml]);

  const uploadAndInsert = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${apiBase}/api/uploads`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      alert("이미지 업로드 실패");
      return;
    }

    const data: { url: string } = await res.json();

    // ✅ Cloud 대비: 상대경로면 apiBase 붙여서 절대 URL로
    const src = data.url.startsWith("http") ? data.url : `${apiBase}${data.url}`;

    editorApiRef.current?.insertImageByUrl(src);
  };

  const onSubmit = async () => {
    if (!canSubmit) return;

    const payload = {
      title,
      address,
      visibility,
      tags,
      contentHtml,
    };

    const res = await fetch(`${apiBase}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("등록 실패");
      return;
    }

    alert("등록 성공");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.logo}>spotJam</div>
        </header>

        <div className={styles.form}>
          {/* 공개범위 */}
          <div className={styles.row}>
            <div className={styles.sectionTitle}>公開範囲</div>
            <div className={styles.segment}>
              <button
                type="button"
                className={`${styles.segBtn} ${visibility === "ALL" ? styles.active : ""}`}
                onClick={() => setVisibility("ALL")}
              >
                ALL
              </button>
              <button
                type="button"
                className={`${styles.segBtn} ${visibility === "GROUP" ? styles.active : ""}`}
                onClick={() => setVisibility("GROUP")}
              >
                GROUP
              </button>
              <button
                type="button"
                className={`${styles.segBtn} ${visibility === "MY" ? styles.active : ""}`}
                onClick={() => setVisibility("MY")}
              >
                MY
              </button>
            </div>
          </div>

          {/* 제목 */}
          <label className={styles.label}>
            タイトル
            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトルを入力してください。"
              maxLength={60}
            />
          </label>

          {/* ✅ 사진 3칸(기존 UI 유지) → 클릭하면 에디터에 삽입 */}
          <div className={styles.photoSection}>
            <div className={styles.sectionTitle}>写真</div>
            <div className={styles.photoGrid}>
              <PhotoSlot onPick={uploadAndInsert} />
              <PhotoSlot onPick={uploadAndInsert} />
              <PhotoSlot onPick={uploadAndInsert} />
            </div>
            <div className={styles.photoHint}>
              ※ 画像を選ぶと本文に自動で挿入されます
            </div>
          </div>

          {/* 해시태그 */}
          <TagInput tags={tags} setTags={setTags} />

          {/* ✅ 내용(에디터) */}
          <div className={styles.editorBlock}>
            <div className={styles.sectionTitle}>内容</div>
            <PostEditor
              apiBase={apiBase}
              value={contentHtml}
              onChange={setContentHtml}
              onReady={(api) => (editorApiRef.current = api)}
            />
          </div>

          {/* 위치 */}
          <label className={styles.label}>
            位置
            <input
              className={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="住所を入力してください。"
            />
          </label>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.submit}
              disabled={!canSubmit}
              onClick={onSubmit}
            >
              投稿する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ");
}

function PhotoSlot({ onPick }: { onPick: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <button
      type="button"
      className={styles.photoSlot}
      onClick={() => inputRef.current?.click()}
      aria-label="add photo"
    >
      <span className={styles.plus}>＋</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenFile}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
          e.currentTarget.value = "";
        }}
      />
    </button>
  );
}

function TagInput({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (t: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const raw = input.trim();
    if (!raw) return;
    const tag = raw.startsWith("#") ? raw : `#${raw}`;
    const key = tag.toLowerCase();
    if (tags.some((t) => t.toLowerCase() === key)) {
      setInput("");
      return;
    }
    setTags([...tags, tag]);
    setInput("");
  };

  const remove = (tag: string) => setTags(tags.filter((t) => t !== tag));

  return (
    <div className={styles.tags}>
      <div className={styles.sectionTitle}>ハッシュタグ</div>
      <div className={styles.tagRow}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ハッシュタグ追加"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button type="button" className={styles.addTagBtn} onClick={add}>
          追加
        </button>
      </div>

      <div className={styles.chips}>
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            className={styles.chip}
            onClick={() => remove(t)}
            title="삭제"
          >
            {t} <span className={styles.x}>×</span>
          </button>
        ))}
      </div>
    </div>
  );
}
