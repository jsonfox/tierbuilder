import { useRef, useEffect, useState } from 'react'
import { TbRow } from '../../utils/types'

const pal = {
  bg: '#262626',
  outline: '#000000',
  text: '#000000',
  labelWidth: 96,
  rowHeight: 80,
  maxRowItems: 10
}

export default function Render(rows: TbRow[]) {
  if (!rows || rows.every(r => r.items.length === 0)) return
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursor = { x: 0, y: 0 };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    const paintImage = (url: string, x: number, y: number) => {
      const img = new Image(pal.rowHeight, pal.rowHeight);
      img.src = url;
      img.onload = function () {
        ctx.drawImage(img, x, y);
        img.remove();
      }
    }

    const setCursor = (x: number, y: number) => {
      cursor.x += x;
      cursor.y += y;
    }

    const cur = () => [cursor.x, cursor.y];

    // Paint bg
    ctx.fillStyle = pal.bg
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  })


  return (
    <canvas ref={canvasRef} width={dimensions.w} height={dimensions.h} />
  )
}