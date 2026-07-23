export type ReviewWriteType = 'gift' | 'news' | 'message'

interface ReviewWriteTypeConfig {
  key: ReviewWriteType
  /** 상단 헤더 타이틀 */
  headerTitle: string
  /** 안내 문구 제목 */
  guideTitle: string
  /** 안내 문구 설명 */
  guideDescription: string
  /** 제목 입력 라벨 */
  titleLabel: string
  /** 제목 입력 placeholder */
  titlePlaceholder: string
  /** 내용 입력 라벨 */
  contentLabel: string
  /** 내용 입력 placeholder */
  contentPlaceholder: string
  /** 편지지 미리보기에 from. 표기를 노출할지 여부 (마음 전하기는 노출 안 함) */
  showFrom: boolean
  /** 작성 완료 후 이동 경로 (이미지 등록·캐릭터 선택·완료 화면은 별도 이슈라 임시 경로) */
  completePath: string
}

/**
 * J파트 작성물 3종 유형 상수 (피그마 "초기 디자인" 페이지 기준)
 * - gift: J01) 후기: 작성 (#1930:13637)
 * - news: J03) 전달완료 : 소식남기기 (#1930:13512)
 * - message: J02) 마음전하기: 마음전하기 작성 (#1930:14051)
 */
export const REVIEW_WRITE_TYPES: Record<ReviewWriteType, ReviewWriteTypeConfig> = {
  gift: {
    key: 'gift',
    headerTitle: '후기 남기기',
    guideTitle: '선물 후기 남기기',
    guideDescription: '투겟을 통해 선물을 받고, 선물을 전달한 후기를 남겨보세요.',
    titleLabel: '받는 사람',
    titlePlaceholder: '받는사람을 입력해 주세요',
    contentLabel: '후기 내용',
    contentPlaceholder: '후기 내용을 입력해 주세요',
    showFrom: true,
    completePath: '/gift/review/complete/gift',
  },
  news: {
    key: 'news',
    headerTitle: '전달완료 소식남기기',
    guideTitle: '전달완료 소식남기기',
    guideDescription: '함께 준비한 선물에 대한, 전달 완료 소식을 보내보세요.',
    titleLabel: '후기 제목',
    titlePlaceholder: '후기 제목을 입력해 주세요',
    contentLabel: '후기 내용',
    contentPlaceholder: '후기 내용을 입력해 주세요',
    showFrom: true,
    completePath: '/gift/review/complete/news',
  },
  message: {
    key: 'message',
    headerTitle: '마음 전하기',
    guideTitle: '선물과 함께 마음전하기',
    guideDescription: '친구들과 함께 준비한 과정과 마음을 선물을 받을 친구에게 전달하세요.',
    titleLabel: '마음전하기 제목',
    titlePlaceholder: '후기 제목을 입력해 주세요',
    contentLabel: '마음전하기 내용',
    contentPlaceholder: '후기 내용을 입력해 주세요',
    showFrom: false,
    completePath: '/gift/review/complete/message',
  },
}

/** 제목 글자수 제한 */
export const REVIEW_TITLE_MAX_LENGTH = 20
/** 내용 글자수 제한 */
export const REVIEW_CONTENT_MAX_LENGTH = 60
