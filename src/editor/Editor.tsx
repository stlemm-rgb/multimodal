import { useCallback, useEffect, useState } from 'react';
import type { DragEvent } from 'react';

interface Preview {
  url: string;
  name: string;
}

export default function Editor({ active }: { active: boolean }) {
  const [preview, setPreview] = useState<Preview | null>(null);
  const [error, setError] = useState('');

  const loadImage = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일을 골라 주세요. PNG, JPG 같은 사진 파일을 쓸 수 있어요.');
      return;
    }
    setError('');
    setPreview({ url: URL.createObjectURL(file), name: file.name || '붙여 넣은 이미지' });
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview.url);
    };
  }, [preview]);

  useEffect(() => {
    if (!active) return;
    const onPaste = (event: ClipboardEvent) => {
      const item = Array.from(event.clipboardData?.items ?? []).find((entry) =>
        entry.type.startsWith('image/'),
      );
      const file = item?.getAsFile();
      if (file) {
        event.preventDefault();
        loadImage(file);
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [active, loadImage]);

  function onDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const file = files.find((entry) => entry.type.startsWith('image/')) ?? files[0];
    if (file) loadImage(file);
  }

  return (
    <section
      aria-labelledby="editor-title"
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
    >
      <p className="eyebrow">화면 한 장으로 시작해요</p>
      <h1 id="editor-title">설명할 화면을 가져오세요</h1>
      <p className="intro">캡처한 이미지를 Ctrl+V로 붙여 넣거나 아래로 끌어 놓으세요.</p>
      <div className="drop-zone">
        <div className="import-controls">
          <label className="file-picker">
            <span>이미지 파일 고르기</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) loadImage(file);
                event.currentTarget.value = '';
              }}
            />
          </label>
          <p className="muted">한 번에 한 장씩 볼 수 있어요. Mac에서는 ⌘V로 붙여 넣으세요.</p>
        </div>
        {preview ? (
          <figure className="image-preview">
            <img
              src={preview.url}
              alt="불러온 화면"
              onError={() => {
                setError('이 이미지를 열지 못했어요. PNG나 JPG 파일로 다시 골라 주세요.');
                setPreview(null);
              }}
            />
            <figcaption>{preview.name}</figcaption>
          </figure>
        ) : (
          <p className="empty-state">이미지를 가져오면 여기에 보여요.</p>
        )}
      </div>
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      <p className="status-note">
        지금은 이미지 불러오기까지 할 수 있어요. 번호와 화살표를 얹는 기능은 준비 중이에요.
      </p>
    </section>
  );
}
