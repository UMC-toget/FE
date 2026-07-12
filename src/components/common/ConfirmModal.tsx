/** 느낌표 아이콘 (모달용, 흰색) */
function ExclamationIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 4.5V19.5" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <circle cx="16" cy="27" r="2.5" fill="white" />
    </svg>
  )
}

interface ConfirmModalProps {
  open: boolean
  /** 제목 (예: "로그아웃 하시겠습니까?") */
  title: string
  /** 제목 아래 설명 */
  description?: string
  cancelText?: string
  confirmText: string
  onCancel: () => void
  onConfirm: () => void
}

/**
 * 확인 모달 (피그마 "이모티콘 있는 팝업" 기준: 핑크 느낌표 아이콘 + 2버튼)
 *
 * @example
 * <ConfirmModal open={open} title="로그아웃 하시겠습니까?" description="언제든 다시 로그인 할 수 있어요"
 *   confirmText="로그아웃" onCancel={() => setOpen(false)} onConfirm={handleLogout} />
 */
export default function ConfirmModal({
  open,
  title,
  description,
  cancelText = '돌아가기',
  confirmText,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-[18px]">
      <button type="button" aria-label="닫기" onClick={onCancel} className="absolute inset-0 bg-black/50" />
      <div className="relative flex w-[320px] flex-col items-center gap-5 rounded-[20px] bg-white px-6 py-7">
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-col items-center gap-5">
            <div className="flex size-12 items-center justify-center rounded-3xl bg-pink-500">
              <ExclamationIcon />
            </div>
            <p className="text-h3-sb text-black">{title}</p>
          </div>
          {description && <p className="text-b2-r leading-normal text-gray-600">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-[42px] w-[130px] items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex h-[42px] w-[130px] items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
