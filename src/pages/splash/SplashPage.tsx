import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import splashVideo from '../../assets/splash.mp4'

// 영상이 재생되지 않거나 ended가 발생하지 않는 경우를 대비한 안전장치 (영상 길이 4초보다 넉넉하게)
const SPLASH_FALLBACK_MS = 6000

/** 서비스 진입 시 처음 표시되는 스플래시 화면. 디자이너 제공 영상 재생이 끝나면 로그인 페이지로 이동합니다. */
export default function SplashPage() {
  const navigate = useNavigate()
  const navigatedRef = useRef(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const goToLogin = useCallback(() => {
    if (navigatedRef.current) return
    navigatedRef.current = true
    navigate('/login', { replace: true })
  }, [navigate])

  useEffect(() => {
    const timer = setTimeout(goToLogin, SPLASH_FALLBACK_MS)
    return () => clearTimeout(timer)
  }, [goToLogin])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // JSX의 muted 속성만으로는 iOS Safari에서 자동재생 시점에 실제로 음소거 상태가
    // 아직 반영되지 않아 재생이 막히는 경우가 있어, DOM에 직접 설정 후 play()를 호출합니다.
    video.muted = true
    video.play().catch(() => {
      // 기기/브라우저 설정(예: iOS "자동 재생 안 함")으로 재생 자체가 막히면
      // 빈 화면에 재생 버튼만 뜬 채로 방치하지 않고 바로 다음 화면으로 넘어갑니다.
      goToLogin()
    })
  }, [goToLogin])

  return (
    <div className="mx-auto flex h-svh w-full max-w-[402px] items-center justify-center overflow-hidden bg-white">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={goToLogin}
        onError={goToLogin}
        className="size-full object-cover"
      >
        <source src={splashVideo} type="video/mp4" />
      </video>
    </div>
  )
}
