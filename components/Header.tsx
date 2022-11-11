import Image from "next/image";
import Link from "next/link";
import { Phone, ShoppingCart } from "phosphor-react";

const Header = () => {
  return (
    <header className="sticky top-0 flex h-24 bg-orange-400 px-4 text-white z-50">
      <div className="m-auto flex w-full max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-min w-min rounded-full bg-white p-2">
            <Phone size={32} className="text-orange-400" />
          </div>
          <div>
            <div className="text-xs font-medium uppercase">order now!</div>
            <div className="font-bold">012 345 678</div>
          </div>
        </div>

        <nav className="flex font-medium">
          <ul className="flex items-center gap-4">
            <li>Homepage</li>
            <li>Products</li>
            <li>Menu</li>
          </ul>
          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={160} height={69} />
          </Link>
          <ul className="flex items-center gap-4">
            <li>Events</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </nav>

        <Link href="/cart">
          <button className="btn-ghost btn-circle btn">
            <div className="relative">
              <ShoppingCart size={32} />
              <div className="absolute -top-4 -right-4 grid h-6 w-6 place-items-center rounded-full bg-white text-sm font-medium text-orange-400">
                <span>85</span>
              </div>
            </div>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
