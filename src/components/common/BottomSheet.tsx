import type { ReactNode } from 'react'

interface BottomSheetProps {
  open: boolean
  /** 딤 영역 클릭 시 호출 */
  onClose: () => void
  children: ReactNode
}

/**
 * 하단에서 올라오는 바텀시트 (피그마 바텀 시트 컴포넌트 기준: 상단 라운드 25px, 그래버 포함)
 *
 * @example
 * <BottomSheet open={open} onClose={() => setOpen(false)}>
 *   <p className="text-h3-sb">약관 동의</p>
 * </BottomSheet>
 */
export default function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="relative flex w-full flex-col items-center rounded-t-[25px] bg-white px-[18px] pb-8 pt-3.5">
        <div className="mb-6 h-[3px] w-9 shrink-0 rounded-full bg-[#3c3c43]/30" />
        {children}
      </div>
    </div>
  )
}
