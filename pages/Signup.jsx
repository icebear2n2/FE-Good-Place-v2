import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { SocialButton } from "../components/SocialButton";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth(); // Get signUp and logIn from the context

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(""); // 초기화
    if (!username || !email || !password) {
      setError(
        "이름 또는 이메일, 비밀번호를 작성하지 않았습니다. 다시 입력해주세요.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("패스워드가 일치하지 않습니다. 다시 입력해주세요.");
      return;
    }

    // 여기서는 패스워드 유효성 검사를 위한 간단한 예시로 대문자를 포함하는지를 확인합니다.
    const passwordPattern = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        "비밀번호는 8자 이상이며, 최소 하나의 대문자를 포함해야 합니다.",
      );
      return;
    }

    try {
      await signUp(username, email, password);
      // 회원가입에 성공하면 로그인 페이지로 리다이렉트합니다.
      navigate("/login", {
        state: { successMessage: "회원가입에 성공했습니다. 로그인해주세요." },
      });
    } catch (error) {
      // 서버에서 반환하는 에러 메시지에 따라 적절한 메시지를 표시합니다.
      switch (error.response?.status) {
        case 409: // 중복된 이메일 (예시)
          setError("이미 사용 중인 이메일입니다.");
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
      case "username":
        return setUsername(value);
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
            <Link
              to="#"
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
            </Link>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                회원가입
              </h2>
              <SocialButton />
              {error && <div className="alert alert-danger">{error}</div>}
              <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    이름
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChange}
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="홍길동"
                    required
                  />
                </div>
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
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="비밀번호 재입력"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-3 text-base font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{ background: "#111827" }}
                >
                  새로운 계정 생성하기
                </button>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  이미 계정이 있으신가요?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    로그인 하기
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

export default Signup;
