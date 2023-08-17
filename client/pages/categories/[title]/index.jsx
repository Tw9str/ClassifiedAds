import Section from "@/components/widgets/Section";
import { useRouter } from "next/router";

export default function Title() {
  const router = useRouter();
  const { title } = router.query;
  return <Section>{title?.replace("-", " ")}</Section>;
}
