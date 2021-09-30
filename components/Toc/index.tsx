import styles from "./toc.module.scss";

export default function Toc(toc) {
  return (
    <div className={styles.wrap}>
      <p className="font-bold">目次</p>
      <ol>
        {toc.toc.length
          ? toc.toc.map((toc, index) => (
              <li id={"list" + toc.name} key={index}>
                <a href={"#" + toc.id}>{toc.text}</a>
              </li>
            ))
          : ""}
      </ol>
    </div>
  );
}
