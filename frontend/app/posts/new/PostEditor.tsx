"use client";

import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import styles from "./page.module.css";

export type EditorApi = {
  insertImageByUrl: (url: string) => void;
};

export default function PostEditor({
  apiBase,
  value,
  onChange,
  onReady,
}: {
  apiBase: string;
  value: string;
  onChange: (html: string) => void;
  onReady?: (api: EditorApi) => void;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    immediatelyRender: false, // ✅ SSR/하이드레이션 방지
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({
        placeholder: "内容を入力してください。画像も本文の途中に入れられます。",
      }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // ✅ 외부에서 이미지 삽입할 수 있게 API 노출
  useEffect(() => {
    if (!editor || !onReady) return;

    onReady({
      insertImageByUrl: (url: string) => {
        editor.chain().focus().setImage({ src: url }).run();
      },
    });
  }, [editor, onReady]);

  // ✅ 툴바에서 직접 사진 삽입도 가능
  const pickImage = () => fileRef.current?.click();

  const uploadAndInsert = async (file: File) => {
    if (!editor) return;

    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${apiBase}/api/uploads`, { method: "POST", body: form });
    if (!res.ok) return alert("이미지 업로드 실패");

    const data: { url: string } = await res.json();
    const src = data.url.startsWith("http") ? data.url : `${apiBase}${data.url}`;

    editor.chain().focus().setImage({ src }).run();
  };

  return (
    <div className={styles.editorWrap}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.toolBtn}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          data-active={editor?.isActive("bold") || false}
        >
          B
        </button>

        <button
          type="button"
          className={styles.toolBtn}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          data-active={editor?.isActive("italic") || false}
        >
          I
        </button>

        <button
          type="button"
          className={styles.toolBtn}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          data-active={editor?.isActive("bulletList") || false}
        >
          •
        </button>

        <div className={styles.spacer} />

        <button type="button" className={styles.imageBtn} onClick={pickImage}>
          写真 삽입
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className={styles.hiddenFile}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) uploadAndInsert(f);
            e.currentTarget.value = "";
          }}
        />
      </div>

      {/* ✅ module.css 적용 확실하게: EditorContent에 className */}
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  );
}
