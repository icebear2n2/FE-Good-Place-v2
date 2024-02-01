import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { SocialButton } from "../components/SocialButton";

const Login = () => {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { logIn } = useAuth();

  // 성공 메시지가 있으면 5초 후에 사라지도록 함
  useEffect(() => {
    let timer;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer); // 컴포넌트 unmount 시에 타이머를 클리어합니다.
    };
  }, [successMessage]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(""); // 초기화

    if (!email || !password) {
      setError(
        "이메일 또는 비밀번호를 작성하지 않았습니다. 다시 입력해주세요.",
      );
      return;
    }
    try {
      await logIn(email, password);
      window.location.href = "/";
    } catch (error) {
      // 서버에서 반환하는 에러 메시지에 따라 적절한 메시지를 표시합니다.
      switch (error.response?.status) {
        case 401: // 중복된 이메일 (예시)
          setError(
            "이메일 또는 비밀번호가 일치하지 않습니다. 다시 입력해주세요.",
          );
          break;
        case 500: // 내부 서버 에러 (예시)
          setError("서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
          break;
        default:
          setError("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              We invest in the world’s potential
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
            >
              Read more about our app
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                로그인
              </h2>
              <SocialButton />
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {error && <div className="alert alert-danger">{error}</div>}
              <form className="mt-8 space-y-6" action="#" onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="이메일 입력"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    비밀번호
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    id="password"
                    placeholder="비밀번호 입력"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      name="remember"
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="ms-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="font-medium text-gray-500 dark:text-gray-400"
                    >
                      정보 기억하기
                    </label>
                  </div>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    href="#"
                    className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    비밀번호를 잊으셨나요?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full px-5 py-3 text-base font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{ background: "#111827" }}
                >
                  로그인 하기
                </button>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  계정이 없으신가요?{" "}
                  <a
                    href="/signup"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    계정 생성하기
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
