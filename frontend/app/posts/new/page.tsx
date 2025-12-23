"use client";

import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import styles from "./PostCreate.module.css";

type Visibility = "ALL" | "GROUP" | "MY";

type Preview = {
  id: string;
  file: File;
  url: string;
};

export default function PostCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [address, setAddress] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("ALL");

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<Preview[]>([]);

  const canSubmit = useMemo(() => {
    return title.trim().length > 0 && content.trim().length > 0 && address.trim().length > 0;
  }, [title, content, address]);

  const addTag = () => {
    const raw = tagInput.trim();
    if (!raw) return;

    const normalized = raw.startsWith("#") ? raw : `#${raw}`;
    const key = normalized.toLowerCase();

    if (tags.some((t) => t.toLowerCase() === key)) {
      setTagInput("");
      return;
    }

    setTags((prev) => [...prev, normalized]);
    setTagInput("");
  };

  const removeTag = (t: string) => {
    setTags((prev) => prev.filter((x) => x !== t));
  };

  const onPickFiles = () => {
    fileRef.current?.click();
  };

  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const remain = Math.max(0, 3 - previews.length);
    const picked = files.slice(0, remain);

    const next = picked.map((file) => {
      const url = URL.createObjectURL(file);
      return { id: crypto.randomUUID(), file, url };
    });

    setPreviews((prev) => [...prev, ...next]);
    e.target.value = "";
  };

  const removePreview = (id: string) => {
    setPreviews((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const onSubmit = async () => {
    if (!canSubmit) return;

    const payload = {
      title,
      content,
      address,
      visibility,
      tags,
      images: previews.map((p) => ({ name: p.file.name, size: p.file.size, type: p.file.type })),
    };

    console.log("[POST CREATE]", payload);
    alert("등록 payload가 콘솔에 출력됐어.");
  };

  return (
    <div className={styles.page}>
      <div className={styles.post}>
        {/* Header */}
        <div className={styles.head}>
          <div className={styles.textWrapper}>spotJam</div>
          <Image
            className={styles.line}
            alt="Line"
            src="/images/postCreate/line-3.svg"
            width={393}
            height={2}
          />
        </div>

        <div className={styles.body}>
          <div className={styles.POST}>
            {/* 공개범위 */}
            <div className={styles.view9}>
              <div className={styles.textWrapper10}>公開範囲</div>

              <div className={styles.view10}>
                <button
                  type="button"
                  className={`${styles.scopeBtn} ${visibility === "ALL" ? styles.scopeBtnActive : ""}`}
                  onClick={() => setVisibility("ALL")}
                >
                  <Image className={styles.image} alt="" src="/images/postCreate/image-6.png" width={18} height={18} />
                  <Image className={styles.image2} alt="" src="/images/postCreate/image-7.png" width={25} height={25} />
                  <span className={styles.textWrapper11}>ALL</span>
                </button>

                <button
                  type="button"
                  className={`${styles.scopeBtn} ${visibility === "GROUP" ? styles.scopeBtnActive : ""}`}
                  onClick={() => setVisibility("GROUP")}
                >
                  <Image className={styles.image3} alt="" src="/images/postCreate/image-4.png" width={15} height={15} />
                  <Image className={styles.image4} alt="" src="/images/postCreate/image-5.png" width={25} height={25} />
                  <span className={styles.textWrapper12}>GROUP</span>
                </button>

                <button
                  type="button"
                  className={`${styles.scopeBtn} ${visibility === "MY" ? styles.scopeBtnActive : ""}`}
                  onClick={() => setVisibility("MY")}
                >
                  <Image className={styles.image5} alt="" src="/images/postCreate/image-3.png" width={15} height={15} />
                  <Image className={styles.image6} alt="" src="/images/postCreate/image-2.png" width={29} height={29} />
                  <span className={styles.textWrapper13}>MY</span>
                </button>
              </div>
            </div>

            {/* 제목 */}
            <div className={styles.view8}>
              <div className={styles.textWrapper8}>タイトル</div>
              <div className={styles.title}>
                <input
                  className={styles.input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="タイトルを入力してください。"
                  maxLength={60}
                />
              </div>
            </div>

            {/* 사진 */}
            <div className={styles.view5}>
              <div className={styles.textWrapper7}>写真</div>

              <input
                ref={fileRef}
                className={styles.fileHidden}
                type="file"
                accept="image/*"
                multiple
                onChange={onFilesChange}
              />

              <button type="button" className={styles.photoSlot} onClick={onPickFiles}>
                {previews[0] ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.previewImg} src={previews[0].url} alt="preview1" />
                    <span
                      className={styles.removeX}
                      onClick={(e) => {
                        e.stopPropagation();
                        removePreview(previews[0].id);
                      }}
                    >
                      ×
                    </span>
                  </>
                ) : (
                  <span className={styles.addCircle} />
                )}
              </button>

              <button type="button" className={styles.photoSlot2} onClick={onPickFiles}>
                {previews[1] ? (
                  <>
                    <img className={styles.previewImg} src={previews[1].url} alt="preview2" />
                    <span
                      className={styles.removeX}
                      onClick={(e) => {
                        e.stopPropagation();
                        removePreview(previews[1].id);
                      }}
                    >
                      ×
                    </span>
                  </>
                ) : (
                  <span className={styles.addCircle2} />
                )}
              </button>

              <button type="button" className={styles.photoSlot3} onClick={onPickFiles}>
                {previews[2] ? (
                  <>
                    <img className={styles.previewImg} src={previews[2].url} alt="preview3" />
                    <span
                      className={styles.removeX}
                      onClick={(e) => {
                        e.stopPropagation();
                        removePreview(previews[2].id);
                      }}
                    >
                      ×
                    </span>
                  </>
                ) : (
                  <span className={styles.addCircle3} />
                )}
              </button>
            </div>

            {/* 해시태그 */}
            <div className={styles.view4}>
              <div className={styles.textWrapper6}>ハッシュタグ</div>

              <div className={styles.tagRow}>
                <div className={styles.tag}>
                  <input
                    className={styles.tagInput}
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="ハッシュタグ追加"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                </div>

                <button type="button" className={styles.tagAddBtn} onClick={addTag} aria-label="add tag">
                  <Image className={styles.img} alt="add" src="/images/postCreate/image.png" width={29} height={29} />
                </button>
              </div>

              <div className={styles.tagChips}>
                {tags.map((t) => (
                  <button key={t} type="button" className={styles.chip} onClick={() => removeTag(t)} title="삭제">
                    {t} <span className={styles.chipX}>×</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 내용 */}
            <div className={styles.view3}>
              <div className={styles.textWrapper3}>内容</div>
              <div className={styles.divWrapper}>
                <textarea
                  className={styles.textarea}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="内容を入力してください。"
                />
              </div>
            </div>

            {/* 위치 */}
            <div className={styles.view}>
              <div className={styles.div}>位置</div>
              <div className={styles.view2}>
                <Image className={styles.pin} alt="Pin" src="/images/postCreate/pin-1.png" width={18} height={18} />
                <input
                  className={styles.addressInput}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="住所を入力してください。"
                />
              </div>
            </div>

            {/* 등록 */}
            <div className={styles.submitBar}>
              <button type="button" className={styles.submitBtn} disabled={!canSubmit} onClick={onSubmit}>
                投稿する
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
