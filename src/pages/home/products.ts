import productLipbalm from '../../assets/mock/product-lipbalm.png'
import productVitamin from '../../assets/mock/product-vitamin.png'
import productCamera from '../../assets/mock/product-camera.png'
import productRoomspray from '../../assets/mock/product-roomspray.png'
import productCushion from '../../assets/mock/product-cushion.png'
import productPerfume from '../../assets/mock/product-perfume.png'

export interface Product {
  id: number
  brand: string
  name: string
  price: number
  image: string
}

/** TODO: 상품 API 연동 후 제거 (피그마 디자인 기준 목업 데이터) */
export const MOCK_PRODUCTS: Product[] = [
  { id: 1, brand: '입생로랑', name: '[향수1.2ML증정] 캔디글로우 립밤', price: 49000, image: productLipbalm },
  { id: 2, brand: '오쏘몰', name: '이뮨 멀티비타민 &미네랄 7입', price: 43000, image: productVitamin },
  { id: 3, brand: '부이', name: '부이 Y2K 디지털 카메라', price: 42900, image: productCamera },
  { id: 4, brand: '이솝', name: '콤팩트 룸 스프레이', price: 47000, image: productRoomspray },
  { id: 5, brand: '헤라', name: "[각인] 블랙 쿠션 파운데이션 '싱글' 본품1 + 증정", price: 46800, image: productCushion },
  { id: 6, brand: '포맨트', name: '포맨트 퍼퓸 헬로키티 에디션 +증정 (2종 택1)', price: 49000, image: productPerfume },
]

export const GIFT_CATEGORIES = ['요즘 인기', '생일', '졸업', '집들이'] as const
