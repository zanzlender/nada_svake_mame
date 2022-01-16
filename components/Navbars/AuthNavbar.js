import React from "react";
import Link from "next/link";
// components

export default function Navbar(props) {
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between">
            <Link href="/">
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="#pablo"
              >
                Nada svake mame
              </a>
            </Link>

            <button
              className="cursor-pointer text-xl text-white leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
              type="button"
            >
              <Link href="/auth/login">PRIJAVA</Link>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
