"use client";
import { cn } from "@v1/ui/utils";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  href: string;
  activeClassName: string;
  nonActiveClassName: string;
}

const NavLink = ({
  children,
  href,
  activeClassName,
  nonActiveClassName,
  className,
  ...rest
}: NavLinkProps) => {
  const pathname = usePathname(); // pathname
  const isActive =
    pathname.endsWith(href) || (href.includes(pathname) && pathname !== "/");
  const newClassName = isActive ? activeClassName : nonActiveClassName;

  return (
    <Link
      href={href}
      className={cn(className, {
        [newClassName]: isActive,
        [nonActiveClassName]: !isActive,
      })}
      {...rest}
    >
      {children}
    </Link>
  );
};
export default NavLink;
