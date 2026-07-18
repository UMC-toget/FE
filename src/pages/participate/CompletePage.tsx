import { useNavigate, useParams } from 'react-router-dom'
import { useMockFunding } from '../funding/useMockFunding'
import completeCat from '../../assets/complete-cat.svg'
import heartBig from '../../assets/heart-big.svg'
import heartRight from '../../assets/heart-right.svg'
import heartSmall from '../../assets/heart-small.svg'

/**
 * E04) 내 선물 참여: 축하 완료 (피그마 1643-63087)
 */
export default function CompletePage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const funding = useMockFunding()

  return (
    // antialiased 없으면 폰트가 피그마보다 굵게 렌더링됨
    <div className="relative mx-auto min-h-dvh w-full max-w-[402px] overflow-hidden bg-white antialiased">
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: '286px',
          height: '286px',
          left: '58px',
          top: '292px',
          background: '#FE71A5',
          filter: 'blur(100px)',
          opacity: 0.45,
        }}
      />

      <img
        src={heartSmall}
        alt=""
        aria-hidden
        className="pointer-events-none absolute"
        style={{ width: '13.82px', left: '288px', top: '138px', transform: 'rotate(22.94deg)' }}
      />
      <img
        src={heartSmall}
        alt=""
        aria-hidden
        className="pointer-events-none absolute"
        style={{ width: '19.41px', left: '82px', top: '211px', transform: 'rotate(-19.05deg)' }}
      />
      <img
        src={heartSmall}
        alt=""
        aria-hidden
        className="pointer-events-none absolute"
        style={{ width: '29.46px', left: '319px', top: '289px', transform: 'rotate(6.31deg)' }}
      />
      <img
        src={heartBig}
        alt=""
        aria-hidden
        className="pointer-events-none absolute"
        style={{ width: '46.73px', left: '295px', top: '311px', transform: 'rotate(23.45deg)' }}
      />
      <img
        src={heartRight}
        alt=""
        aria-hidden
        className="pointer-events-none absolute"
        style={{ width: '34.84px', left: '38px', top: '505px', transform: 'rotate(-34.26deg)' }}
      />

      {/* relative: 배경 글로우/하트 위에 올라오도록 */}
      <div className="relative flex flex-col items-center" style={{ paddingTop: '154px' }}>
        <h1
          className="text-center font-semibold text-black"
          style={{ fontSize: '24px', lineHeight: '35px' }}
        >
          함께 축하해 주셔서
          <br />
          <span className="text-pink-500">정말 고마워요!</span>
        </h1>

        <p
          className="mt-[23px] w-[267px] text-center text-b2-m text-gray-600"
          style={{ lineHeight: '15px' }}
        >
          {funding.hostName}님의 특별한 날
          <br />
          따뜻한 마음을 모아 전달할게요
        </p>

        <img src={completeCat} alt="축하 완료" className="mt-[59px]" style={{ width: '268px' }} />
      </div>

      <div
        className="absolute flex flex-col"
        style={{ top: '659px', left: '18px', width: '366px', gap: '5px' }}
      >
        <button
          type="button"
          onClick={() => navigate(`/funding/${id}`)}
          className="flex h-[52px] w-full items-center justify-center rounded-xl bg-gray-900 text-h3-sb text-white"
        >
          선물 페이지 보기
        </button>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="flex h-[52px] w-full items-center justify-center rounded-xl text-h3-sb"
          style={{ color: '#978F96' }}
        >
          홈으로 가기
        </button>
      </div>
    </div>
  )
}
