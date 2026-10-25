import { useEffect, type ReactNode, type RefObject } from 'react';
import { acceptedImages, listenForImagePaste } from '../platform/files';

// 기존 편집기의 파일·붙여넣기·끌어놓기 입력을 새 프로젝트 화면에서도 재사용한다.
export default function Editor({
  inputRef,
  onFiles,
  busy,
  children,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  onFiles: (files: File[]) => void;
  busy: boolean;
  children: ReactNode;
}) {
  useEffect(() => listenForImagePaste(onFiles), [onFiles]);
  return (
    <section
      className="drop-zone"
      aria-label="캡처 작업 공간"
      aria-busy={busy}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        if (!busy) onFiles(Array.from(event.dataTransfer.files));
      }}
    >
      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        multiple
        accept={acceptedImages}
        aria-label="이미지 파일 고르기"
        disabled={busy}
        onChange={(event) => {
          onFiles(Array.from(event.currentTarget.files ?? []));
          event.currentTarget.value = '';
        }}
      />
      {children}
    </section>
  );
}
