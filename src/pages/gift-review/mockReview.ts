import reviewSample1 from '../../assets/mock/review-sample-1.jpeg'
import reviewSample2 from '../../assets/mock/review-sample-2.jpeg'
import type { ReviewLetterColor } from './reviewLetterPalette'

export interface GiftReview {
  id: string
  /** 선물을 보낸 사람 이름 */
  senderName: string
  images: string[]
  letterColor: ReviewLetterColor
  /** 편지지에 표시되는 줄 단위 본문 */
  content: string[]
}

/** TODO: 후기 API 연동 후 제거 (피그마 J01-2 디자인 기준 목업 데이터) */
export const MOCK_REVIEWS: GiftReview[] = [
  {
    id: '1',
    senderName: '희주',
    images: [reviewSample1, reviewSample2, reviewSample1, reviewSample2, reviewSample1],
    letterColor: 'pink',
    content: [
      '나에게 생일선물을 줘서 정말 고마워 다들!!',
      '덕분에 매일매일 새로운 에어팟과 함께하고있어 ㅋㅋㅋ',
      '너무너무 고맙고 덕분에 내가 이렇게 많은 사랑을 받았구나',
      '느끼는 하루였어!!! 같이 보내준 편지들도 다 읽어봤어!!',
      '너무너무 고맙고 다들 좋은하루 보내길 바라',
    ],
  },
  {
    id: '2',
    senderName: '민경',
    images: [reviewSample1, reviewSample2],
    letterColor: 'white',
    content: ['생일 축하해준 모두에게 진심으로 고마워!', '받고 싶었던 선물이라 더 특별했어 ❤️', '다음에 꼭 맛있는 거 사줄게!'],
  },
  {
    id: '3',
    senderName: '유나',
    images: [],
    letterColor: 'skyBlue',
    content: ['사진은 못 찍었지만 선물 정말 잘 받았어!', '마음 담아 골라줘서 너무 고마워', '다들 항상 건강하고 행복하길 바라 :)'],
  },
  {
    id: '4',
    senderName: '수아',
    images: [reviewSample2],
    letterColor: 'darkPurple',
    content: ['축하해줘서 고마워!', '오래 갖고 싶었던 물건이라 더 기뻤어', '다음 모임 때 밥 살게~'],
  },
]

/** id에 해당하는 후기를 반환. 없으면 첫 번째 목업으로 대체 */
export function getMockReview(id: string | undefined): GiftReview {
  return MOCK_REVIEWS.find((review) => review.id === id) ?? MOCK_REVIEWS[0]
}
