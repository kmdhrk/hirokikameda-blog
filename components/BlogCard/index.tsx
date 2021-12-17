import React from "react";
import Image from "next/image";


const BlogCard = ({ cardData, children }) => {

  if (cardData.image) {
    return (
      <a
        href={cardData.url}
        target="_brank"
        className="grid grid-cols-5 bg-white rounded-md p-3"
      >
        <div className="col-span-1 flex justify-start items-center relative w-10 h-10">
          <Image
            src={cardData.image ? cardData.image : "/noimage.png"}
            alt=''
            objectFit="cover"
            objectPosition="center"
            layout="fill"
          />
        </div>
        <div className="col-span-4 flex flex-col justify-start">
          <div className="text-xl font-bold text-black">{cardData.title && cardData.title}</div>
          <div className="text-gray-400 text-xs">{cardData.description && cardData.description}</div>
        </div>
      </a>
    );
  }
  return (
    <a href={cardData.url} target="_brank">
      {children}
    </a>
  );
};

export { BlogCard };
