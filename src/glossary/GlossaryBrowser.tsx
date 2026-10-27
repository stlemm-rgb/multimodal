import { useId, useState } from 'react';
import { dictionaries } from './data/dictionaries';
import type { DictionaryTerm } from './data/types';
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
  const [dictionaryId, setDictionaryId] = useState(dictionaries[0].id);
  const dictionary = dictionaries.find((entry) => entry.id === dictionaryId) ?? dictionaries[0];
  const { categories, confusions, terms } = dictionary;
  const [category, setCategory] = useState(categories[0].id);
  const [detail, setDetail] = useState<DictionaryTerm | null>(null);
  const [message, setMessage] = useState('');
  const id = useId();
  // 미리보기 그림은 UI 사전에만 있다.
  const previewOf = (term: DictionaryTerm) =>
    dictionary.id === 'ui' ? previews[term.id] : undefined;
  const Preview = detail ? previewOf(detail) : undefined;
  const similar = detail
    ? confusions.flatMap((pair) => {
        const other = pair.a === detail.id ? pair.b : pair.b === detail.id ? pair.a : '';
        const term = terms.find((entry) => entry.id === other);
        return term ? [{ term, difference: pair.difference }] : [];
      })
    : [];
  return (
    <div className="glossary-browser">
      <div className="dictionary-switch" role="group" aria-label="사전 종류">
        {dictionaries.map((entry) => (
          <button
            key={entry.id}
            aria-pressed={entry.id === dictionary.id}
            onClick={() => {
              setDictionaryId(entry.id);
              setCategory(entry.categories[0].id);
            }}
          >
            {entry.label}
          </button>
        ))}
      </div>
      <div className="glossary-tabs" role="tablist" aria-label="용어 분류">
        {categories.map(({ id: value, label }, index) => (
          <button
            key={value}
            id={`${id}-${value}`}
            role="tab"
            aria-selected={category === value}
            aria-controls={`${id}-grid`}
            tabIndex={category === value ? 0 : -1}
            onKeyDown={(event) => {
              const last = categories.length - 1;
              const target = {
                ArrowLeft: index === 0 ? last : index - 1,
                ArrowRight: index === last ? 0 : index + 1,
                Home: 0,
                End: last,
              }[event.key];
              if (target === undefined) return;
              event.preventDefault();
              const next = categories[target].id;
              setCategory(next);
              document.getElementById(`${id}-${next}`)?.focus();
            }}
            onClick={() => setCategory(value)}
          >
            {label} ({terms.filter((term) => term.category === value).length})
          </button>
        ))}
      </div>
      <div
        className="glossary-grid"
        id={`${id}-grid`}
        role="tabpanel"
        aria-labelledby={`${id}-${category}`}
      >
        {terms
          .filter((term) => term.category === category)
          .map((term) => {
            const Preview = previewOf(term);
            return (
              <button
                className={`term-thumbnail ${Preview ? '' : 'term-text-only'}`}
                key={term.id}
                onClick={() => {
                  setDetail(term);
                  setMessage('');
                }}
              >
                {Preview && <Preview />}
                <strong>{term.name}</strong>
                <small>{term.english}</small>
              </button>
            );
          })}
      </div>
      {detail && (
        <BottomSheet title={detail.name} onClose={() => setDetail(null)}>
          {Preview && (
            <div className="term-detail-preview">
              <Preview />
            </div>
          )}
          <p className="muted">{detail.english}</p>
          <p>{detail.meaning}</p>
          <div className="prompt-example">
            <h3>{dictionary.exampleTitle}</h3>
            <p>{detail.sayToAi}</p>
          </div>
          {similar.length > 0 && (
            <div className="term-similar">
              <h3>헷갈리기 쉬운 말</h3>
              <ul>
                {similar.map(({ term, difference }) => (
                  <li key={term.id}>
                    <button
                      onClick={() => {
                        setDetail(term);
                        setMessage('');
                      }}
                    >
                      {term.name}
                    </button>
                    <p>{difference}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={() => {
              void copyText(detail.sayToAi)
                .then(() => setMessage('복사했어요'))
                .catch(() => setMessage('복사하지 못했어요. 글을 직접 선택해 복사해 주세요.'));
            }}
          >
            문구 복사
          </button>
          {dictionary.forAi && selectedNumber !== undefined && onInsert && (
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
