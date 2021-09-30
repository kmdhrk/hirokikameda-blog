import styles from "./blogContents.module.scss";

export default function BlogContents({contents}) {
  return (
    <div
      className={styles.postContents}
      dangerouslySetInnerHTML={{ __html: contents }}
    ></div>
  );
}
