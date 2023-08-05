import { useRouter } from "next/router";

export default function Title() {
  const router = useRouter();
  const { title } = router.query;
  return <div>{title?.replace("-", " ")}</div>;
}
