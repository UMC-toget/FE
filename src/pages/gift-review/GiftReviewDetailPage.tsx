import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/common/Header'
import { getMockReview } from './mockReview'
import { REVIEW_LETTER_PALETTE } from './reviewLetterPalette'

/** 스와이프로 인정할 최소 드래그 거리(px) */
const SWIPE_THRESHOLD = 40

/** J01-2) 선물 후기 조회 화면 (/gift/review/:id) */
export default function GiftReviewDetailPage() {
  const { id } = useParams()
  const review = getMockReview(id)
  const letterStyle = REVIEW_LETTER_PALETTE[review.letterColor]
  const hasImages = review.images.length > 0

  const [imageIndex, setImageIndex] = useState(0)
  const pointerStartX = useRef<number | null>(null)

  const goToImage = (next: number) => {
    setImageIndex(Math.min(Math.max(next, 0), review.images.length - 1))
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return
    const delta = event.clientX - pointerStartX.current
    pointerStartX.current = null

    if (delta > SWIPE_THRESHOLD) goToImage(imageIndex - 1)
    else if (delta < -SWIPE_THRESHOLD) goToImage(imageIndex + 1)
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[402px] flex-col bg-white pb-10">
      <Header title="선물 후기" />

      <div className="flex flex-col gap-4 px-[18px] pt-5">
        <h2 className="text-h3-sb text-[#121212]">{review.senderName}님이 보낸 선물 후기</h2>

        {hasImages && (
          <div className="flex flex-col gap-2">
            <div
              className="relative w-full touch-pan-y select-none overflow-hidden rounded-[48px]"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${imageIndex * 100}%)` }}
              >
                {review.images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`${review.senderName}님이 보낸 선물 후기 이미지 ${index + 1}`}
                    draggable={false}
                    className="aspect-square w-full shrink-0 object-cover"
                  />
                ))}
              </div>
              <span className="absolute right-[18px] top-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-b2-m text-gray-700">
                {imageIndex + 1}/{review.images.length}
              </span>
            </div>

            {review.images.length > 1 && (
              <div className="flex items-center justify-center gap-1">
                {review.images.map((_, index) => (
                  <span
                    key={index}
                    className={`rounded-full ${index === imageIndex ? 'size-1.5 bg-pink-500' : 'size-1 bg-gray-300'}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div
          className="flex flex-col gap-1.5 rounded-xl border px-4 py-3"
          style={{ backgroundColor: letterStyle.background, borderColor: letterStyle.border }}
        >
          {review.content.map((line, index) => (
            <p key={index} className="border-b pb-1.5 text-b2-r text-gray-800" style={{ borderColor: letterStyle.line }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
