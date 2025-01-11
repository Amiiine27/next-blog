import NavLink from "./NavLink";

export default function Navigation() {
  return (
    <>
      <nav>
        <NavLink href="/" label="Home" />

        <div>
          <NavLink href="/dashboard" label="Dashboard" />
          <NavLink href="/register" label="Register" />
        </div>
      </nav>
    </>
  );
}
