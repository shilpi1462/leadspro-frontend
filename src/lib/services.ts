import { serviceCategories, type ServiceCategory } from "@/data/services";
import { getServices, serviceShortTitle, type Entry } from "./content";

export const servicePath = (slug: string) => `/services/${slug}/`;

export interface ServiceLink {
  name: string;
  href: string;
}

export interface ServiceGroup extends ServiceCategory {
  href: string;
  services: Entry[];
  links: ServiceLink[];
}

export function getServiceGroups(): ServiceGroup[] {
  const all = getServices();
  return serviceCategories.map((cat) => {
    const services = all.filter((s) => s.data.category === cat.slug);
    const links = services.map((s) => ({
      name: serviceShortTitle(s.data.title),
      href: servicePath(s.slug),
    }));
    return { ...cat, services, links, href: links[0]?.href ?? servicePath(cat.slug) };
  });
}

export function getServiceGroup(category: string): ServiceGroup | undefined {
  return getServiceGroups().find((g) => g.slug === category);
}

/** The category a service link belongs to, so anything pointing at a service can wear its colour. */
export function categoryOfHref(href: string): string | undefined {
  const path = href.split("#")[0];
  return getServiceGroups().find(
    (g) => g.href === path || g.services.some((s) => servicePath(s.slug) === path),
  )?.slug;
}
