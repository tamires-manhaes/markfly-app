import type { ComponentProps } from "react";
import { Link, useLocation } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NavLinkProps extends ComponentProps<typeof Link> {}

export function NavLink(props: NavLinkProps) {
  const location = useLocation();

  const isCurrent = props.to?.toString() === location.pathname;

  return <Link {...props} data-current={isCurrent} />;
}
