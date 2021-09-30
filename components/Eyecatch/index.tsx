import Image from "next/image";
export type EyecatchProps = {
  url: string,
  width: number,
  height: number,
}

export default function Eyecatch({ url, height, width }:EyecatchProps) {
  return (
    <>
      {url ? (
        <Image
          src={url}
          width={width}
          height={height}
        />
      ) : (
        <Image src="/noimage.png" alt="No Image" />
      )}
    </>
  );
}