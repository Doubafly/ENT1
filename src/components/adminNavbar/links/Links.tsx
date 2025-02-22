"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = ({
  image,
  path,
  title,
}: {
  image: string;
  path: string;
  title: string;
}) => {
  const currentPath = usePathname();

  return (
    <Link
      className={`mx-6 hover:bg-green-100 rounded-lg w-4/5 gap-2 items-center py-3 px-2 flex ${
        currentPath === path && "bg-green-300"
      }`}
      href={path}
    >
      <Image src={image} width={20} height={20} alt="" />
      <p>{title}</p>
    </Link>
  );
};

export default Links;
