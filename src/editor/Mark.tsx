import { badgeAnchor, badgeMoved, badgePoint } from '../core/annotations';
import { labelLayout } from '../core/labelLayout';
import type { Annotation } from '../core/types';
import { arrowHead, markColors, markFont, markMetrics, noteLayout } from '../core/markStyle';

export default function Mark({
  item,
  metrics,
  width,
  height,
  showLabels,
}: {
  width: number;
  height: number;
  showLabels: boolean;
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
  const label = showLabels ? labelLayout(item, width, height) : null;
  const position = badgePoint(item);
  const anchor = badgeAnchor(item);
  const moved = badgeMoved(item);
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
      {moved && (
        <g className="badge-leader">
          <line
            x1={anchor.x}
            y1={anchor.y}
            x2={position.x}
            y2={position.y}
            strokeDasharray={`${m.lineWidth * 2} ${m.lineWidth * 2}`}
          />
          {item.type === 'pin' && (
            <circle cx={anchor.x} cy={anchor.y} r={m.lineWidth * 1.5} fill={markColors.stroke} />
          )}
        </g>
      )}
      {label && (
        <g
          className="instruction-label"
          stroke="none"
          transform={`translate(${label.x} ${label.y})`}
        >
          <rect
            width={label.width}
            height={label.height}
            rx={label.padding}
            fill={markColors.stroke}
          />
          {label.lines.map((line, index) => (
            <text
              key={index}
              x={label.padding}
              y={label.padding + label.fontSize + index * label.lineHeight}
              fontFamily={markFont}
              fontSize={label.fontSize}
              fill={markColors.text}
              xmlSpace="preserve"
            >
              {line}
            </text>
          ))}
        </g>
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
