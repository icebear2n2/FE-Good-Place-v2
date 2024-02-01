import kakaoIcon from "../assets/images/kakao-icon.png";

export function SocialButton() {
  const handleKakaoLogin = () => {
    // 카카오 로그인 URL 생성
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };
  return (
    <div className="mt-16 grid space-y-4">
      <button
        className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
        onClick={handleKakaoLogin}
      >
        <div className="relative flex items-center justify-center">
          <img
            src={kakaoIcon}
            className="absolute left-0 w-5"
            alt="google logo"
          />
          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
            카카오 계정으로 계속하기
          </span>
        </div>
      </button>
    </div>
  );
}
