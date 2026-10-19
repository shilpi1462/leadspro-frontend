import type { ReactNode } from "react";
import k from "./Phones.module.css";

export function HeroPhone({ phone, sticker }: { phone: ReactNode; sticker?: ReactNode }) {
  return (
    <div className={k.hero}>
      <div className={k.box} data-phone-fly-start="">
        {phone}
      </div>
      {sticker && <div className={k.sticker}>{sticker}</div>}
    </div>
  );
}
