import type { CSSProperties, ReactNode } from "react";
import { innerFonts } from "@/lib/fonts";
import { ScrollProgress } from "./ScrollProgress";
import kit from "./kit.module.css";

interface InnerPageProps {
  children: ReactNode;
  style?: CSSProperties;
  "data-cat"?: string;
}

export function InnerPage({ children, ...rest }: InnerPageProps) {
  return (
    <div className={`${kit.page} ${innerFonts}`} {...rest}>
      <ScrollProgress />
      {children}
    </div>
  );
}
