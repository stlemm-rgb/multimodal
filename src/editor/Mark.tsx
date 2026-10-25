import type { Annotation } from '../core/types';
import { arrowHead, markColors, markFont, markMetrics, noteLayout } from '../core/markStyle';

export default function Mark({
  item,
  metrics,
}: {
  item: Annotation;
  metrics: ReturnType<typeof markMetrics>;
}) {
  const m = metrics;
  if (item.type === 'note') {
    const layout = noteLayout(item.text, m);
    return (
      <g transform={`translate(${item.position.x} ${item.position.y})`}>
        <rect width={layout.width} height={layout.height} fill={markColors.note} />
        {layout.lines.map((line, index) => (
          <text
            key={index}
            x={m.padding}
            y={m.padding + m.noteFontSize + index * m.lineHeight}
            fontFamily={markFont}
            fontSize={m.noteFontSize}
            fill={markColors.noteText}
            xmlSpace="preserve"
          >
            {line}
          </text>
        ))}
      </g>
    );
  }
  const position = item.type === 'arrow' ? item.start : item.position;
  return (
    <g
      stroke={markColors.stroke}
      strokeWidth={m.lineWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {item.type === 'box' && (
        <rect
          x={item.position.x}
          y={item.position.y}
          width={item.width}
          height={item.height}
          fill="none"
        />
      )}
      {item.type === 'arrow' && (
        <>
          <line x1={item.start.x} y1={item.start.y} x2={item.end.x} y2={item.end.y} />
          <polygon
            points={arrowHead(item.start, item.end, m.arrowSize)
              .map((p) => `${p.x},${p.y}`)
              .join(' ')}
            fill={markColors.stroke}
          />
        </>
      )}
      <circle cx={position.x} cy={position.y} r={m.radius} fill={markColors.stroke} stroke="none" />
      <text
        x={position.x}
        y={position.y + m.fontSize * 0.35}
        textAnchor="middle"
        fontFamily={markFont}
        fontSize={m.fontSize}
        fontWeight="bold"
        fill={markColors.text}
        stroke="none"
      >
        {item.number}
      </text>
    </g>
  );
}
