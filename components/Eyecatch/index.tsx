import Image from "next/image";
export type EyecatchProps = {
  url: string,
  width: number,
  height: number,
  alt?: string, 
}

export default function Eyecatch({ url, height, width, alt}:EyecatchProps) {
  return (
    <>
      {url ? (
        <Image
          src={url}
          width={width}
          height={height}
          alt={alt}
        />
      ) : (
        <Image src="/noimage.png" alt="No Image" />
      )}
    </>
  );
}