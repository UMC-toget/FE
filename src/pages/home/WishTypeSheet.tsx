import BottomSheet from '../../components/common/BottomSheet'
import CheckIcon from '../../components/icons/CheckIcon'
import type { WishType } from '../../store/wishStore'

interface WishTypeSheetProps {
  open: boolean
  selected: WishType | null
  onClose: () => void
  onSelect: (type: WishType) => void
}

const OPTIONS: { type: WishType; label: string }[] = [
  { type: 'receive', label: '받고 싶은' },
  { type: 'give', label: '주고 싶은' },
]

/** 상품 카드에서 위시 등록 시 유형(받고 싶은/주고 싶은)을 고르는 바텀시트 (피그마 기준) */
export default function WishTypeSheet({ open, selected, onClose, onSelect }: WishTypeSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex w-full flex-col items-start gap-6">
        <p className="text-h3-sb text-black">위시 유형</p>
        <ul className="flex w-full flex-col">
          {OPTIONS.map((option) => (
            <li key={option.type} className="w-full">
              <button
                type="button"
                onClick={() => onSelect(option.type)}
                className="flex w-full items-center justify-between py-3"
              >
                <span className="text-b1-m text-black">{option.label}</span>
                {selected === option.type && (
                  <span className="flex size-6 items-center justify-center rounded-full bg-black text-white">
                    <CheckIcon className="size-3.5" />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </BottomSheet>
  )
}
