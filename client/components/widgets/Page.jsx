export default function Page({ children }) {
  return (
    <section className="container mx-auto min-h-[calc(100vh-220px)] py-12 px-2 my-6">
      {children}
    </section>
  );
}
