import { getServiceGroups } from "@/lib/services";
import { HeaderNav } from "./HeaderNav";

export function Header() {
  const groups = getServiceGroups().map((g) => ({ name: g.name, href: g.href, slug: g.slug }));
  return <HeaderNav groups={groups} />;
}
