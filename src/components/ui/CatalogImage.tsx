import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  src: string;
};

export function CatalogImage({ src, alt, ...props }: Props) {
  return <Image src={src || "/images/logo-mark.png"} alt={alt} {...props} />;
}
