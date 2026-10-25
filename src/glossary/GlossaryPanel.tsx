import BottomSheet from '../ui/BottomSheet';
import GlossaryBrowser from './GlossaryBrowser';

/** 화면 폭과 상관없이 오른쪽에서 밀려 나오는 서랍(drawer)으로 연다. 프로젝트 화면 크기는 그대로. */
export default function GlossaryPanel({
  onClose,
  selectedNumber,
  onInsert,
}: {
  onClose: () => void;
  selectedNumber?: number;
  onInsert: (text: string) => void;
}) {
  return (
    <BottomSheet title="용어 사전" onClose={onClose} className="glossary-overlay">
      <GlossaryBrowser selectedNumber={selectedNumber} onInsert={onInsert} />
    </BottomSheet>
  );
}
