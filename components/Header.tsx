import Image from "next/image";
import Link from "next/link";
import { Phone, ShoppingCart } from "phosphor-react";
import useCart from "../store/useCart";

const Header = () => {
  const { quantity } = useCart();
  return (
    <header className="sticky top-0 z-50 flex h-24 bg-primary px-4 text-white">
      <div className="m-auto flex w-full max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-min w-min rounded-full bg-white p-2">
            <Phone size={32} className="text-primary" />
          </div>
          <div>
            <div className="text-xs font-medium uppercase">order now!</div>
            <div className="font-bold">012 345 678</div>
          </div>
        </div>

        <nav>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={260}
              height={148}
              priority
              className="h-24 w-auto"
            />
          </Link>
        </nav>

        <Link href="/cart">
          <button className="btn-ghost btn-circle btn">
            <div className="indicator">
              <ShoppingCart size={32} />
              <div className="badge indicator-item border-none bg-white text-sm font-medium text-primary">
                <span>{quantity}</span>
              </div>
            </div>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
