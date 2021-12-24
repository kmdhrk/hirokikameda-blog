import styles from "./blogContents.module.scss";
import parse, { domToReact } from "html-react-parser";
import { BlogCard } from "../BlogCard";
import ListBlogContents from "../ListBlogContents";

export default function BlogContents({ contents, cardDatas }) {
  const replace = (node) => {
    if (node.name === "a" && node.parent?.children.length === 1) {
      const indexOfUrl = cardDatas.findIndex((obj) => {
        return obj.url.indexOf(node.attribs?.href) != -1;
      });
      return (
        <BlogCard cardData={cardDatas[indexOfUrl]}>
          {domToReact(node.children)}
        </BlogCard>
      );
    }
    if (
      node.name === "ul" &&
      node.children[0].children[0].data === "//bg-blue"
    ) {
      node.children.shift();
      return (
        <ListBlogContents bgcolor="blue">
          {domToReact(node.children)}
        </ListBlogContents>
      );
    } else if (
      node.name === "ul" &&
      node.children[0].children[0].data === "//bg-gray"
    ) {
      node.children.shift();
      return (
        <ListBlogContents bgcolor="gray">
          {domToReact(node.children)}
        </ListBlogContents>
      );
    } else if (
      node.name === "ul" &&
      node.children[0].children[0].data === "//bg-yellow"
    ) {
      node.children.shift();
      return (
        <ListBlogContents bgcolor="yellow">
          {domToReact(node.children)}
        </ListBlogContents>
      );
    }
    return null;
  };

  return (
    <div className={styles.postContents}>{parse(contents, { replace })}</div>
  );
}
