// OAuth 클라이언트 ID는 비밀 값이 아니라(브라우저에 그대로 노출되는 공개 값) 코드에 기본값을
// 두어도 안전합니다. 배포 환경마다 다른 값을 쓰고 싶으면 환경변수로 덮어쓸 수 있습니다.
export const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ??
  '822457623986-3cjnid3nq13pujhtrr7qtbqacm3f0da5.apps.googleusercontent.com'

// TODO: 카카오 JavaScript 키 발급 후 채우기
export const KAKAO_JS_KEY: string | undefined = import.meta.env.VITE_KAKAO_JS_KEY
