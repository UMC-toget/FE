export interface Account {
  id: number
  bankName: string
  /** 은행 로고가 없어 이니셜 뱃지 배경/글자색으로 사용 (피그마 디자인 기준 목업) */
  bankColor: string
  bankTextColor: string
  accountHolder: string
  accountNumber: string
}

/** TODO: 계좌 API 연동 후 제거 (피그마 디자인 기준 목업 데이터) */
export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 1,
    bankName: '신한은행',
    bankColor: '#0046ff',
    bankTextColor: '#ffffff',
    accountHolder: '김희주',
    accountNumber: '110-585-123456',
  },
  {
    id: 2,
    bankName: '카카오뱅크',
    bankColor: '#fee500',
    bankTextColor: '#191919',
    accountHolder: '김희주',
    accountNumber: '110-585-123456',
  },
]
