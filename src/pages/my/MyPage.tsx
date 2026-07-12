import BottomNav from '../../components/common/BottomNav'
import SearchIcon from '../../components/icons/SearchIcon'
import ChevronRightIcon from '../../components/icons/ChevronRightIcon'
import avatarCat from '../../assets/avatar-cat.svg'

// TODO: 회원 API 연동 후 실제 사용자 정보로 교체
const MOCK_USER = { name: '최재영', loginProvider: '카카오톡' }

const MENU_SECTIONS: { title: string; items: string[] }[] = [
  { title: '선물 페이지', items: ['내 선물 페이지', '함께 선물 페이지'] },
  { title: '계좌', items: ['등록된 나의 계좌'] },
  { title: '설정', items: ['알림 설정', '고객 문의', '이용약관', '개인정보 처리 방침'] },
]

/** 마이페이지 메뉴 행 (테두리 라운드 카드 + 우측 체브론) */
function MenuRow({ label }: { label: string }) {
  return (
    /* TODO: 각 메뉴 상세 화면 구현 후 라우트 연결 */
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-3.5 py-3"
    >
      <span className="text-b1-m text-black">{label}</span>
      <ChevronRightIcon className="size-6 text-black" />
    </button>
  )
}

/** 마이페이지 (I. 마이, 로그인 상태 기준) */
export default function MyPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[402px] flex-col bg-white pb-32">
      <header className="flex h-[50px] shrink-0 items-center justify-between px-[18px]">
        <h1 className="text-h1-sb text-black">마이</h1>
        {/* TODO: 검색 화면 구현 후 연결 */}
        <button type="button" aria-label="검색" className="text-gray-900">
          <SearchIcon />
        </button>
      </header>

      {/* TODO: 프로필 수정 화면 구현 후 연결 */}
      <button type="button" className="flex w-full items-center justify-between px-[18px] py-6">
        <div className="flex items-center gap-3">
          <span className="flex size-[52px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-t from-[#1e1d1e] from-[76.6%] to-[#3c393c]">
            <img src={avatarCat} alt="" className="w-9" />
          </span>
          <span className="flex flex-col items-start gap-1">
            <span className="text-b1-m text-black">{MOCK_USER.name}</span>
            <span className="text-caption1-r text-gray-600">{MOCK_USER.loginProvider}으로 로그인 중이에요</span>
          </span>
        </div>
        <ChevronRightIcon className="size-6 text-black" />
      </button>

      <div className="h-3 w-full bg-background" />

      <div className="mt-7 flex flex-col gap-8 px-[18px]">
        {MENU_SECTIONS.map((section) => (
          <section key={section.title} className="flex flex-col gap-5">
            <h2 className="text-h3-sb text-black">{section.title}</h2>
            <div className="flex flex-col gap-3">
              {section.items.map((item) => (
                <MenuRow key={item} label={item} />
              ))}
            </div>
          </section>
        ))}
        <p className="text-caption1-r text-gray-600">투겟(ToGet) v1.0.0</p>
      </div>

      <BottomNav active="my" />
    </div>
  )
}
