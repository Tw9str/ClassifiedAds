import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Store</title>
        <meta name="description" content="Your page description" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
