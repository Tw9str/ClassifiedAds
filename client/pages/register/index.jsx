import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [message, setMessage] = useState("");
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    for (const [key, value] of Object.entries(inputValues)) {
      formData.append(key, value);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValues),
      }
    );
    const data = await res.json();
    setMessage(data.message);
  }
  return (
    <div className="flex min-h-[calc(100vh-(94px+76px))] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          تسجيل حساب جديد
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              اسم المستخدم
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray focus:outline-primaryColor sm:text-sm sm:leading-6"
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
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              البريد الإلكتروني
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray focus:outline-primaryColor sm:text-sm sm:leading-6"
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                required
                value={inputValues.email}
                onChange={(e) =>
                  setInputValues({ ...inputValues, email: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                كلمة المرور
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
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
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray focus:outline-primaryColor sm:text-sm sm:leading-6"
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
              className="flex w-full justify-center rounded-md bg-primaryColor px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              تسجيل
            </button>
          </div>
          {message && <p className="text-primaryColor">{message}</p>}
        </form>
        <p className="mt-2 text-center text-sm text-gray-500">
          مسجل بالفعل؟
          <Link
            href="/login"
            className="font-semibold leading-6 text-primaryColor p-1
            hover:text-indigo-500"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
