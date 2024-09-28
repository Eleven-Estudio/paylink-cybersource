import "./styles.css";

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  return (
    <section className="checkout-container h-auto checkout:h-full w-full overflow-hidden flex items-start justify-center bg-white pb-10">
      {children}
    </section>
  );
}
