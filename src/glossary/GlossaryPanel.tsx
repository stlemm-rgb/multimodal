import { useEffect, useState } from 'react';
import BottomSheet from '../ui/BottomSheet';
import GlossaryBrowser from './GlossaryBrowser';
export default function GlossaryPanel({
  onClose,
  selectedNumber,
  onInsert,
}: {
  onClose: () => void;
  selectedNumber?: number;
  onInsert: (text: string) => void;
}) {
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 960px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 960px)');
    const change = () => setWide(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  const content = <GlossaryBrowser selectedNumber={selectedNumber} onInsert={onInsert} />;
  return wide ? (
    <aside className="glossary-panel" aria-label="용어 패널">
      <header className="sheet-header">
        <h2>용어 사전</h2>
        <button aria-label="용어 닫기" onClick={onClose}>
          ×
        </button>
      </header>
      {content}
    </aside>
  ) : (
    <BottomSheet title="용어 사전" onClose={onClose} className="glossary-overlay">
      {content}
    </BottomSheet>
  );
}
