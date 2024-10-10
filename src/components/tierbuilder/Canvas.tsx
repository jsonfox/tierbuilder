import React, { Component, createRef, RefObject } from 'react';
import { TbRow } from '../../utils/types';

const pal = {
  bg: '#262626',
  font: '16px sans-serif',
  outlineColor: '#000000',
  outline: 1,
  label: 96,
  labelPadding: 4,
  item: {
    w: 80,
    h: 80
  },
  maxRowItems: 10,
  totalWidth: 899
};

pal.totalWidth = pal.label + pal.item.w * pal.maxRowItems + pal.outline * 3;

interface Props {
  rows: TbRow[];
}

interface State {
  w: number;
  h: number;
}

export default class Canvas extends Component<Props, State> {
  canvasRef: RefObject<HTMLCanvasElement>;
  domRows: number[];

  constructor(props: Props) {
    super(props);

    this.domRows = Array.from(document.querySelectorAll('.row')).map(
      (el) => el.getBoundingClientRect().height
    );

    this.state = {
      w: pal.totalWidth,
      h:
        this.domRows.reduce((acc, a) => acc + a, 0) +
        (this.props.rows.length + 1) * pal.outline
    };

    this.canvasRef = createRef<HTMLCanvasElement>();
  }

  componentDidMount(): void {
    const canvas = this.canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    console.info('Rendering tierbuilder as image');

    const cur = { x: 0, y: 0 };

    const moveCursor = (x: number, y: number) => {
      cur.x += x;
      cur.y += y;
    };

    const paintImage = (url: string, x: number, y: number) => {
      const img = new Image(pal.item.w, pal.item.h);
      img.src = url;
      img.onload = function () {
        ctx.drawImage(img, x, y, pal.item.w, pal.item.h);
        img.remove();
      };
      img.setAttribute('crossorigin', 'anonymous');
    };

    const paintLabel = (text: string, x: number, y: number) => {
      const lineHeight = parseInt(pal.font);
      const maxWidth = pal.label - pal.labelPadding * 2;

      const chars = text.split('');
      let testLine = '';
      let line = '';
      const lines: string[] = [];

      chars.forEach((c, i) => {
        testLine += c;
        if (i === chars.length - 1) {
          line += c;
          lines.push(line);
        } else if (ctx.measureText(testLine)?.width > maxWidth && i > 0) {
          lines.push(line);
          line = testLine = c;
        } else {
          line += c;
        }
      });

      y = Math.floor(y - (lines.length - 1) * (lineHeight / 2));

      lines.forEach((l, i) => {
        ctx.fillText(l, x, y + i * lineHeight, maxWidth);
      });
    };

    // Outline
    ctx.fillStyle = pal.outlineColor;
    ctx.fillRect(cur.x, cur.y, ctx.canvas.width, ctx.canvas.height);
    moveCursor(pal.outline, pal.outline);

    // Rows
    this.props.rows.forEach((r, i) => {
      // Calculate actual row height
      const minHeight = Math.ceil(r.items.length / 10) * pal.item.h;
      const height = this.domRows[i] > minHeight ? this.domRows[i] : minHeight;
      const itemsWidth = pal.item.w * pal.maxRowItems;
      const fullWidth = pal.label + itemsWidth + pal.outline * 3;

      // Row bg
      ctx.fillStyle = pal.bg;
      ctx.fillRect(cur.x, cur.y, fullWidth - pal.outline * 2, height);

      // Label bg
      ctx.fillStyle = r.color;
      ctx.fillRect(cur.x, cur.y, pal.label, height);

      // Label text
      ctx.font = pal.font;
      ctx.fillStyle = pal.outlineColor;
      ctx.textAlign = 'center';
      paintLabel(
        r.name,
        cur.x + pal.label / 2,
        cur.y + parseInt(pal.font) / 2.5 + height / 2
      );

      // Divider
      ctx.fillRect(cur.x + pal.label, cur.y, pal.outline, height);

      // Items
      r.items.forEach(({ imageUrl }, i) => {
        const x =
          pal.label + pal.outline * 2 + pal.item.w * (i % pal.maxRowItems);
        const y = cur.y + Math.floor(i / pal.maxRowItems) * pal.item.h;
        paintImage(imageUrl, x, y);
      });

      moveCursor(0, height + pal.outline);
    });
  }

  render() {
    return (
      <canvas ref={this.canvasRef} width={this.state.w} height={this.state.h} />
    );
  }
}
