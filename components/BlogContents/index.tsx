import styles from "./blogContents.module.scss";
import parse, { domToReact } from "html-react-parser";
import { BlogCard } from "../BlogCard";

export default function BlogContents({ contents, cardDatas }) {
  const replace = (node) => {
    if (
      node.name === "a" && //タグがa
      node.parent?.children.length === 1  //他に並列で要素を持っていない
    ) {
      const indexOfUrl = cardDatas.findIndex((obj) => {
        return obj.url.indexOf(node.attribs?.href) != -1;
      });
      return (
        <BlogCard cardData={cardDatas[indexOfUrl]}>
          {domToReact(node.children)}
        </BlogCard>
      );
    }
    return null;
  };

  return (
    <div className={styles.postContents}>{parse(contents, { replace })}</div>
  );
}
