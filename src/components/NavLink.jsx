"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLink({href, label}) {
    const pathname = usePathname()
  return (
    <>
      <Link
        href={href}
        className={`nav-link ${
          pathname === href ? "nav-link-active" : ""
        }`}
      >
        {label}
      </Link>
    </>
  );
}
