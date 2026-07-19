import { useEffect, useRef, useState } from 'react'
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon'
import Button from '../../components/common/Button'
import { cropToSquare, loadImage } from '../../utils/cropImage'

const VIEWPORT_SIZE = 366

interface PhotoCropOverlayProps {
  file: File
  onCancel: () => void
  onConfirm: (blob: Blob) => void
  /** 이미지를 불러오거나 자르지 못했을 때 (지원하지 않는 형식 등) */
  onError: () => void
}

interface DragState {
  startX: number
  startY: number
  offsetX: number
  offsetY: number
}

/** 프로필 사진 원형 자르기 화면 (피그마 "사진 자르기" 기준). 드래그로 위치만 조정합니다. */
export default function PhotoCropOverlay({ file, onCancel, onConfirm, onError }: PhotoCropOverlayProps) {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragRef = useRef<DragState | null>(null)

  useEffect(() => {
    const url = URL.createObjectURL(file)
    let cancelled = false
    loadImage(url)
      .then((loaded) => {
        if (cancelled) return
        const coverScale = Math.max(VIEWPORT_SIZE / loaded.naturalWidth, VIEWPORT_SIZE / loaded.naturalHeight)
        setImg(loaded)
        setScale(coverScale)
        setOffset({
          x: (VIEWPORT_SIZE - loaded.naturalWidth * coverScale) / 2,
          y: (VIEWPORT_SIZE - loaded.naturalHeight * coverScale) / 2,
        })
      })
      .catch(() => {
        if (cancelled) return
        onError()
      })
    return () => {
      cancelled = true
      URL.revokeObjectURL(url)
    }
  }, [file, onError])

  const clampOffset = (x: number, y: number, currentImg: HTMLImageElement) => {
    const w = currentImg.naturalWidth * scale
    const h = currentImg.naturalHeight * scale
    return {
      x: Math.min(0, Math.max(VIEWPORT_SIZE - w, x)),
      y: Math.min(0, Math.max(VIEWPORT_SIZE - h, y)),
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!img) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, startY: e.clientY, offsetX: offset.x, offsetY: offset.y }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current || !img) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setOffset(clampOffset(dragRef.current.offsetX + dx, dragRef.current.offsetY + dy, img))
  }

  const handlePointerUp = () => {
    dragRef.current = null
  }

  const handleConfirm = async () => {
    if (!img) return
    try {
      const blob = await cropToSquare(img, offset, scale, VIEWPORT_SIZE)
      onConfirm(blob)
    } catch {
      onError()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <header className="relative flex h-[50px] w-full shrink-0 items-center justify-center border-b border-gray-100 px-[18px]">
        <button type="button" aria-label="뒤로가기" onClick={onCancel} className="absolute left-[18px] text-black">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-h3-sb text-black">사진 자르기</h1>
      </header>

      <div className="flex flex-1 flex-col items-center gap-6 overflow-y-auto px-[18px] py-6">
        <div
          className="relative w-full max-w-[366px] touch-none select-none overflow-hidden rounded-lg bg-gray-900"
          style={{ aspectRatio: '1 / 1' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {img && (
            <img
              src={img.src}
              alt=""
              draggable={false}
              className="pointer-events-none absolute left-0 top-0 max-w-none"
              style={{
                width: img.naturalWidth * scale,
                height: img.naturalHeight * scale,
                transform: `translate(${offset.x}px, ${offset.y}px)`,
              }}
            />
          )}
          {/* 원형 크롭 가이드: 큰 box-shadow로 원 바깥 영역을 어둡게 처리합니다 */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)' }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-full border border-[#ffe3ed]" />
        </div>
        <p className="text-caption1-r text-center text-gray-600">원 안에 보이는 부분이 프로필 사진으로 저장돼요</p>
      </div>

      <div className="shrink-0 px-[18px] pb-8 pt-4">
        <Button disabled={!img} onClick={handleConfirm}>
          다음
        </Button>
      </div>
    </div>
  )
}
