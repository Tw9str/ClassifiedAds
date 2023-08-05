import { useState } from "react";

export default function Form() {
  const [inputValues, setInputValues] = useState({
    img: "",
    title: "",
  });

  async function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    for (const [key, value] of Object.entries(inputValues)) {
      formData.append(key, value);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/add`,
      {
        method: "POST",
        headers: {},
        body: formData,
      }
    );
    const data = await res.json();
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="file"
          name="img"
          onChange={(e) =>
            setInputValues({ ...inputValues, img: e.target.files[0] })
          }
        />
        <input
          type="text"
          name="title"
          placeholder="الإسم"
          value={inputValues.title}
          onChange={(e) =>
            setInputValues({ ...inputValues, title: e.target.value })
          }
        />
        <button>أضف</button>
      </form>
    </div>
  );
}
