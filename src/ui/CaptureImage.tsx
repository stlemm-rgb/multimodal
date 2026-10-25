import { useEffect, useState } from 'react';
import type { ProjectStore } from '../core/storage';
import { createImageUrl, releaseImageUrl } from '../platform/files';

export default function CaptureImage({
  store,
  captureId,
  alt,
}: {
  store: ProjectStore;
  captureId?: string;
  alt: string;
}) {
  const [url, setUrl] = useState('');
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    let created = '';
    setUrl('');
    setFailed(false);
    if (captureId)
      void (async () => {
        try {
          const capture = await store.getCapture(captureId);
          const blob = capture && (await store.getImage(capture.imageKey));
          if (!active) return;
          if (blob) {
            created = createImageUrl(blob);
            setUrl(created);
          } else setFailed(true);
        } catch {
          if (active) setFailed(true);
        }
      })();
    return () => {
      active = false;
      if (created) releaseImageUrl(created);
    };
  }, [store, captureId]);
  return url && !failed ? (
    <img src={url} alt={alt} onError={() => setFailed(true)} />
  ) : (
    <span className="image-placeholder">
      {failed ? '사진을 읽지 못했어요' : captureId ? '사진 불러오는 중…' : '▧'}
    </span>
  );
}
