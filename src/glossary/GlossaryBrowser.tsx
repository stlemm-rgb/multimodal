import { useId, useState } from 'react';
import { terms, type Term, type TermKind } from './data/terms';
import { previews } from './previews';
import BottomSheet from '../ui/BottomSheet';
import { copyText } from '../platform/clipboard';
import Toast from '../ui/Toast';

export default function GlossaryBrowser({
  selectedNumber,
  onInsert,
}: {
  selectedNumber?: number;
  onInsert?: (text: string) => void;
}) {
  const [kind, setKind] = useState<TermKind>('still');
  const [detail, setDetail] = useState<Term | null>(null);
  const [message, setMessage] = useState('');
  const id = useId();
  const Preview = detail ? previews[detail.id] : null;
  return (
    <div className="glossary-browser">
      <div className="glossary-tabs" role="tablist" aria-label="용어 종류">
        {(['still', 'motion'] as const).map((value) => (
          <button
            key={value}
            id={`${id}-${value}`}
            role="tab"
            aria-selected={kind === value}
            aria-controls={`${id}-grid`}
            tabIndex={kind === value ? 0 : -1}
            onKeyDown={(event) => {
              if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
                event.preventDefault();
                const next =
                  event.key === 'Home'
                    ? 'still'
                    : event.key === 'End'
                      ? 'motion'
                      : kind === 'still'
                        ? 'motion'
                        : 'still';
                setKind(next);
                document.getElementById(`${id}-${next}`)?.focus();
              }
            }}
            onClick={() => setKind(value)}
          >
            {value === 'still' ? '그림으로 보는 용어' : '움직임이 있는 용어'} (
            {terms.filter((term) => term.kind === value).length})
          </button>
        ))}
      </div>
      <div
        className="glossary-grid"
        id={`${id}-grid`}
        role="tabpanel"
        aria-labelledby={`${id}-${kind}`}
      >
        {terms
          .filter((term) => term.kind === kind)
          .map((term) => {
            const Preview = previews[term.id];
            return (
              <button
                className="term-thumbnail"
                key={term.id}
                onClick={() => {
                  setDetail(term);
                  setMessage('');
                }}
              >
                <Preview />
                <strong>{term.name}</strong>
                <small>{term.english}</small>
              </button>
            );
          })}
      </div>
      {detail && (
        <BottomSheet title={detail.name} onClose={() => setDetail(null)}>
          <div className="term-detail-preview">{Preview && <Preview />}</div>
          <p className="muted">{detail.english}</p>
          <p>{detail.meaning}</p>
          <div className="prompt-example">
            <h3>AI에게는 이렇게 말하세요</h3>
            <p>{detail.sayToAi}</p>
          </div>
          <button
            onClick={() => {
              void copyText(detail.sayToAi)
                .then(() => setMessage('복사했어요'))
                .catch(() => setMessage('복사하지 못했어요. 글을 직접 선택해 복사해 주세요.'));
            }}
          >
            문구 복사
          </button>
          {selectedNumber !== undefined && onInsert && (
            <button
              onClick={() => {
                onInsert(detail.sayToAi);
                setMessage(`${selectedNumber}번 지시에 넣었어요`);
              }}
            >
              {selectedNumber}번 지시에 넣기
            </button>
          )}
          <Toast message={message} />
        </BottomSheet>
      )}
    </div>
  );
}
