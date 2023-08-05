import Link from "next/link";
import { BsPlusSquare } from "react-icons/bs";

export default function ManageCategories() {
  return (
    <div>
      <h1>ManageCategories</h1>
      <Link href="dashboard/add">
        <BsPlusSquare />
      </Link>
    </div>
  );
}
