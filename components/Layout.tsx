import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "./Header";

interface ILayout {
  children: React.ReactNode;
}
const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Toaster />
      <Header />
      <main className="m-auto my-10 min-h-screen max-w-screen-2xl px-4">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
