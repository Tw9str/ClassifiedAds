import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { setLogin } from "@/state/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [message, setMessage] = useState("");

  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  async function handleFormSubmit(e) {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValues),
      }
    );
    const data = await res.json();
    setMessage(data.message);
    dispatch(setLogin(data));

    if (data.success) router.push("/");
  }
  return (
    <div className="flex min-h-[calc(100vh-(94px+76px))] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-secondary-900">
          تسجيل الدخول
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-secondary-900"
            >
              اسم المستخدم
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 p-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-primary-500 sm:text-sm sm:leading-6"
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                required
                value={inputValues.username}
                onChange={(e) =>
                  setInputValues({ ...inputValues, username: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-secondary-900"
              >
                كلمة المرور
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-primary-600 hover:text-primary-500"
                >
                  إعادة تعيين كلمة المرور؟
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 p-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-primary-500 sm:text-sm sm:leading-6"
                value={inputValues.password}
                onChange={(e) =>
                  setInputValues({ ...inputValues, password: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              تسجيل الدخول
            </button>
          </div>
          {message && <p className="text-primary-500">{message}</p>}
        </form>
        <p className="mt-2 text-center text-sm text-secondary-900">
          لم تسجل بعد؟
          <Link
            href="/register"
            className="font-semibold leading-6 text-primary-500 p-1
            hover:text-primary-600"
          >
            سجل من هنا
          </Link>
        </p>
      </div>
    </div>
  );
}
