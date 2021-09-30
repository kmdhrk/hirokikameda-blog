import "dayjs/locale/ja";
import dayjs from "dayjs";
import styles from "./postMeta.module.scss";

export default function PostMeta({title, published, category}) {

  return (
    <>
      <h1 className={styles.postTitle}>{title}</h1>
      <div className="mt-2">
        <span className="text-gray-600">
          {dayjs(published).format("YYYY.MM.DD")}
        </span>
        <span className="ml-5 text-sm text-gray-600 underline">
          {category && `${category.name}`}
        </span>
      </div>
    </>
  );
}
