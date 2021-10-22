import styles from "./blogIntro.module.scss";

export default function BlogIntro({contents}) {
  return (
    <div
      className={styles.postIntro}
      dangerouslySetInnerHTML={{ __html: contents }}
    ></div>
  );
}
