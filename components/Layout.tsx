import Footer from "./Footer";
import Header from "./Header";

interface ILayout {
  children: React.ReactNode;
}
const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      <main className="m-auto min-h-screen max-w-screen-2xl px-4">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
