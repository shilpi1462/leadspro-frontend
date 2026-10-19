import s from "./AiHub.module.css";

export function lit(text: string, phrase: string) {
  const at = text.indexOf(phrase);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className={s.lit}>{phrase}</span>
      {text.slice(at + phrase.length)}
    </>
  );
}
