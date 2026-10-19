import type { ReactNode } from "react";

export function accent(title: string): ReactNode {
  const split = title.match(/^(.*?)(\s[—–-]\s|:\s)(.+)$/);
  if (split) {
    return (
      <>
        {split[1]}
        {split[2]}
        <em>{split[3]}</em>
      </>
    );
  }
  const words = title.split(" ");
  if (words.length < 3) return title;
  const take = words.length > 5 ? 3 : words.length > 3 ? 2 : 1;
  return (
    <>
      {words.slice(0, -take).join(" ")} <em>{words.slice(-take).join(" ")}</em>
    </>
  );
}
