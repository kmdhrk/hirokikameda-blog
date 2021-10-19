import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/">
      <a>
        <h1 className="md:text-4xl text-center font-bold text-2xl text-gray-900">
          Hiroki Kameda Blog
        </h1>
      </a>
    </Link>
  );
  
}