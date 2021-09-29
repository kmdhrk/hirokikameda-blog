import Image from "next/image";
import Link from "next/link";
import "dayjs/locale/ja";
import dayjs from "dayjs";

export type CardProps = {
  src: string;
  width: string;
  height: string;
  link: string;
  title: string;
  date: string;
  category: string;
};
dayjs.locale("ja");

export default function Card({
  src,
  width,
  height,
  link,
  date,
  title,
  category,
}: CardProps) {
  return (
    <Link href={link} as={link}>
      <a>
        <article className="hover:opacity-80 transition-opacity hover:translate-y-1">
          {src ? (
            <Image src={src} width={width} height={height} />
          ) : (
            <Image src="/noimage.png" alt="No Image" />
          )}
          <h3 className="font-bold text-xl mt-1 md:mt-3 leading-relaxed text-gray-800">
            {title}
          </h3>
          <div className="mt-1 md:mt-2 ">
            {date && (
              <span className="text-gray-500 text-sm md:text-base">
                {dayjs(date).format("YYYY.MM.DD")}
              </span>
            )}
            {category && (
              <span className="ml-5 text-sm text-gray-600 underline">
                {category}
              </span>
            )}
          </div>
        </article>
      </a>
    </Link>
  );
}
