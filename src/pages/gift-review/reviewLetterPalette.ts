export type ReviewLetterColor =
  | 'white'
  | 'pink'
  | 'red'
  | 'yellow'
  | 'green'
  | 'skyBlue'
  | 'darkPurple'
  | 'lightPurple'

interface ReviewLetterStyle {
  /** 편지지 배경색 */
  background: string
  /** 편지지 테두리색 */
  border: string
  /** 줄 사이 밑줄 색 */
  line: string
}

/** 후기 편지지 배경 색상 팔레트 (피그마 "편지지 열림" 컴포넌트의 속성 1 베리언트 기준) */
export const REVIEW_LETTER_PALETTE: Record<ReviewLetterColor, ReviewLetterStyle> = {
  white: { background: '#FFFFFF', border: '#5B565A', line: '#C1BCC0' },
  pink: { background: '#FFE3ED', border: '#FE71A5', line: 'rgba(254,113,165,0.5)' },
  red: { background: 'rgba(255,103,103,0.4)', border: '#FF6767', line: 'rgba(255,103,103,0.7)' },
  yellow: { background: 'rgba(255,238,126,0.5)', border: '#FFD000', line: '#FFD000' },
  green: { background: 'rgba(147,215,0,0.4)', border: 'rgba(147,215,0,0.7)', line: 'rgba(0,215,43,0.3)' },
  skyBlue: { background: 'rgba(151,215,255,0.5)', border: '#27ACFF', line: 'rgba(39,172,255,0.4)' },
  darkPurple: { background: 'rgba(130,132,255,0.4)', border: '#3724CD', line: 'rgba(55,36,205,0.3)' },
  lightPurple: { background: 'rgba(176,85,255,0.3)', border: '#5A1497', line: 'rgba(90,20,151,0.3)' },
}
