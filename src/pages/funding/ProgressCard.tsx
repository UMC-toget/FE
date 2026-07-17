import { useState } from 'react'
import type { FundingDetail } from '../../types/funding'
import { formatDateDots } from '../../utils/formatDate'
import CaretDownIcon from '../../components/icons/CaretDownIcon'

interface ProgressCardProps {
  funding: FundingDetail
}

/**
 * E02 진행 카드 (피그마 '펀딩창' 컴포넌트 기준)
 * 모인 금액/진행률/게이지/참여자 수/마감일 + 위시리스트 아코디언.
 * D04 공개 범위 토글에 따라 조건부 렌더링 (피그마 '펀딩창' 컴포넌트셋 #1714:69054 기준):
 * - showAmount OFF: 모인 금액 자리에 '비공개' 표시 (라벨은 유지)
 * - showProgress OFF: % 숨김 + 핑크 게이지 제거 (회색 트랙만 남음)
 * - showParticipantCount OFF: 'N명 참여 중' 숨김
 */
export default function ProgressCard({ funding }: ProgressCardProps) {
  const [wishOpen, setWishOpen] = useState(false)
  const { visibility, isOwner } = funding

  const showAmount = (visibility.showAmount || isOwner) && funding.currentAmount != null
  const showProgress = (visibility.showProgress || isOwner) && funding.progressPercent != null
  const showCount = (visibility.showParticipantCount || isOwner) && funding.participantCount != null

  return (
    <section className="flex flex-col gap-[37px] rounded-xl border border-gray-200 bg-white px-3.5 py-3">
      <div className="flex flex-col gap-4">
        <p className="text-b2-m leading-normal text-black">모인 금액</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-[3px]">
              <span className="text-b2-m leading-normal text-black">
                {showAmount ? `${funding.currentAmount!.toLocaleString()}원` : '비공개'}
              </span>
              <span className="text-caption1-r leading-normal text-gray-700">/ {funding.targetAmount.toLocaleString()}원</span>
            </p>
            {showProgress && <span className="text-b2-m leading-normal text-black">{funding.progressPercent}%</span>}
          </div>
          {/* 진행률 비공개 시 핑크 게이지 없이 회색 트랙만 표시 */}
          <div className="h-[5px] w-full rounded-full bg-gray-100">
            {showProgress && (
              <div
                className="h-full rounded-full bg-pink-400"
                style={{ width: `${Math.min(funding.gaugePercent, 100)}%` }}
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-caption2-r leading-normal text-gray-700">
              {showCount ? `${funding.participantCount}명 참여 중` : ''}
            </span>
            <span className="text-caption2-r leading-normal text-gray-700">마감 {formatDateDots(new Date(funding.deadline))}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex h-6 items-center justify-between">
          <p className="text-b2-m leading-normal text-gray-700">{funding.hostName}님이 받고 싶은 선물</p>
          <button
            type="button"
            aria-label={wishOpen ? '위시리스트 접기' : '위시리스트 펼치기'}
            onClick={() => setWishOpen((prev) => !prev)}
            className="text-gray-700"
          >
            <CaretDownIcon className={`size-6 ${wishOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        {wishOpen && (
          <ul className="flex flex-col">
            {funding.wishlist.map((item, index) => (
              <li
                key={item.id}
                className={`flex items-center gap-5 py-2 ${index > 0 ? 'border-t border-gray-100' : 'pt-0'}`}
              >
                <img src={item.imageUrl} alt={item.name} className="size-[60px] rounded-[4px] bg-background-2 object-cover" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-caption1-m leading-normal text-black">{item.name}</p>
                    <a
                      href={item.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-[25px] items-center rounded-[4px] bg-background px-2.5 text-caption2-m text-black"
                    >
                      구매링크
                    </a>
                  </div>
                  <p className="text-caption1-r leading-normal text-gray-600">{item.price.toLocaleString()}원</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
