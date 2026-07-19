import BottomSheet from '../../components/common/BottomSheet'

interface PhotoSourceSheetProps {
  open: boolean
  onClose: () => void
  onSelectLibrary: () => void
  onSelectCamera: () => void
  onSelectFile: () => void
}

/**
 * 프로필 사진 등록 방식을 고르는 바텀시트 (피그마 기준).
 * '웹 사진 검색'은 이미지 검색 API가 없어 비활성 처리했고 클릭해도 아무 동작이 없습니다.
 */
export default function PhotoSourceSheet({
  open,
  onClose,
  onSelectLibrary,
  onSelectCamera,
  onSelectFile,
}: PhotoSourceSheetProps) {
  const options = [
    { id: 'web', label: '웹 사진 검색', onClick: undefined },
    { id: 'library', label: '사진 보관함', onClick: onSelectLibrary },
    { id: 'camera', label: '사진 찍기', onClick: onSelectCamera },
    { id: 'file', label: '파일 선택', onClick: onSelectFile },
  ] as const

  return (
    <BottomSheet open={open} onClose={onClose}>
      <ul className="flex w-full flex-col">
        {options.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              disabled={!option.onClick}
              onClick={option.onClick}
              className={`w-full py-2 text-left text-b1-m ${option.onClick ? 'text-black' : 'text-gray-300'}`}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </BottomSheet>
  )
}
