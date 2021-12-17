import styles from "./blogContents.module.scss";
import parse, { domToReact } from "html-react-parser";

export default function BlogContents({ contents, cardDatas }) {
    const replace = (node) => {
      const cardLinks = cardDatas.map((data) => data.url);
      function link(text) {
        return text.indexOf(node.attribs?.href) != -1;
      }
      if (
        node.name === "a" && //タグがa
        node.parent?.name === "p" && //親タグがp
        node.parent?.children.length === 1 && //他に並列で要素を持っていない
        cardLinks.some(function (text) {
          return link(text);
        })
      ) {
        return <a data-true="true">{domToReact(node.children)}リンクカード</a>;
      };
      return null;
    };
  return (
    <div className={styles.postContents}>
      {parse(contents, { replace })}
    </div>
  );
}
