import Image from "next/image";
import type { Picture } from "@/data/images";

interface PicProps {
  picture: Picture;
  className?: string;
  preload?: boolean;
  sizes?: string;
}

export function Pic({
  picture,
  className,
  preload,
  sizes = "(max-width: 991px) 100vw, 50vw",
}: PicProps) {
  return (
    <Image
      src={picture.src}
      alt={picture.alt}
      width={picture.width}
      height={picture.height}
      className={className}
      preload={preload}
      sizes={sizes}
    />
  );
}
