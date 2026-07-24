import BottomSheet from '../../components/common/BottomSheet'
import { BANK_NAMES, BANK_NAME_LABELS } from '../../api/userAccounts'
import type { BankName } from '../../api/userAccounts'

interface BankSelectSheetProps {
  open: boolean
  onClose: () => void
  onSelect: (bank: BankName) => void
}

/** 계좌 등록/수정 시 은행을 고르는 바텀시트 */
export default function BankSelectSheet({ open, onClose, onSelect }: BankSelectSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex w-full flex-col items-start gap-4">
        <p className="text-h3-sb text-black">은행 선택</p>
        <ul className="flex max-h-[50vh] w-full flex-col overflow-y-auto">
          {BANK_NAMES.map((bank) => (
            <li key={bank} className="w-full">
              <button
                type="button"
                onClick={() => onSelect(bank)}
                className="w-full py-2 text-left text-b1-m text-black"
              >
                {BANK_NAME_LABELS[bank]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </BottomSheet>
  )
}
