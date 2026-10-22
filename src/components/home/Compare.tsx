import { home } from "@/data/home";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import styles from "./Compare.module.css";

const { why } = home;

export function Compare() {
  return (
    <section className="container section" aria-labelledby="why-title">
      <div className="heading">
        <SplitText as="h2" id="why-title" className={styles.title} text={why.title} />
        <span className="eyebrow">Why Leads Pro</span>
      </div>
      <p className={styles.intro}>{why.intro}</p>

      <Reveal className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">{why.columns[0]}</th>
              <th scope="col">{why.columns[1]}</th>
            </tr>
          </thead>
          <tbody>
            {why.rows.map(([a, b]) => (
              <tr key={a}>
                <td data-label={why.columns[0]}>{a}</td>
                <td data-label={why.columns[1]}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <p className={styles.outro}>{why.outro}</p>
    </section>
  );
}
