import { home } from "@/data/home";
import { routes } from "@/lib/site";
import { Faq } from "@/components/ui/Faq";
import styles from "./HomeFaq.module.css";

// The shared FAQ accordion, set on a full-width ink block with the Human Edge grid.
export function HomeFaq() {
  return (
    <section className={`on-dark ${styles.block}`} aria-label="Digital marketing agency FAQs">
      <div className="container">
        <Faq
          items={home.faqs}
          title="Digital Marketing Agency FAQs"
          cta={{ label: "Get a Free Digital Growth Audit", href: routes.audit }}
          tone="dark"
        />
      </div>
    </section>
  );
}
