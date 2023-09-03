import { useState } from "react";
import { useSelector } from "react-redux";

export default function List({ categoryList }) {
  const [meesage, setMessage] = useState("");

  const [inputValues, setInputValues] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    imgs: [],
  });
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?._id);

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    setInputValues({ ...inputValues, imgs: files });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    for (const [key, value] of Object.entries(inputValues)) {
      if (key === "imgs") {
        value.forEach((file) => {
          formData.append("imgs", file);
        });
      } else {
        formData.append(key, value);
      }
    }
    formData.append(`userId`, userId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container m-auto flex min-h-[calc(100vh-(94px+76px))] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-secondary-900">
          أضف إعلان جديد
        </h2>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-secondary-900"
        >
          العنوان
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 p-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-primary-500 sm:text-sm sm:leading-6"
            type="text"
            name="title"
            id="title"
            autoComplete="title"
            required
            value={inputValues.title}
            onChange={(e) =>
              setInputValues({ ...inputValues, title: e.target.value })
            }
          />
        </div>
        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 text-secondary-900"
        >
          الفئة
        </label>
        <div className="mt-2">
          <select
            className="block w-full rounded-md border-0 p-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-primary-500 sm:text-sm sm:leading-6"
            type="text"
            name="category"
            id="category"
            autoComplete="category"
            required
            value={inputValues.category}
            onChange={(e) =>
              setInputValues({ ...inputValues, category: e.target.value })
            }
          >
            {categoryList.map((category) => (
              <option value={category._id}>{category.title}</option>
            ))}
          </select>
        </div>
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-secondary-900"
        >
          السعر
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 p-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-primary-500 sm:text-sm sm:leading-6"
            type="text"
            name="price"
            id="price"
            autoComplete="price"
            required
            value={inputValues.price}
            onChange={(e) =>
              setInputValues({ ...inputValues, price: e.target.value })
            }
          />
        </div>
        <label
          htmlFor="imgs"
          className="block text-sm font-medium leading-6 text-secondary-900"
        >
          الصور
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 p-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-primary-500 sm:text-sm sm:leading-6"
            type="file"
            name="imgs"
            id="imgs"
            multiple
            required
            onChange={handleFileChange}
          />
        </div>
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-secondary-900"
        >
          الوصف
        </label>
        <div className="mt-2">
          <textarea
            className="block w-full h-40 resize-none rounded-md border-0 p-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-primary-500 sm:text-sm sm:leading-6"
            type="text"
            name="description"
            id="description"
            autoComplete="description"
            required
            value={inputValues.description}
            onChange={(e) =>
              setInputValues({ ...inputValues, description: e.target.value })
            }
          />
        </div>
        {meesage && <p className="text-primary-500">{meesage}</p>}
        <div className="mt-2">
          <button
            type="submit"
            className="flex w-32 justify-center rounded-md bg-primary-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            تم
          </button>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const categoryResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
    );
    const categoryList = await categoryResponse.json();
    return {
      props: {
        categoryList,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categoryList: null,
        error: "Failed to fetch data",
      },
    };
  }
}
