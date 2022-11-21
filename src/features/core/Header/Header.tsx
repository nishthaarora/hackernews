import styles from "./Header.module.css";

export const Header = ({
  title,
  storyLink,
}: {
  title: string;
  storyLink: string;
}) => {
  const hostname = storyLink ? new URL(storyLink).hostname : "";
  return (
    <div className={styles.headerContainer}>
      <h2 className={styles.heading}>{title}</h2>
      {hostname && (
        <a
          href={storyLink}
          target="_blank"
          className={styles.url}
          rel="noreferrer"
        >
          ({hostname})
        </a>
      )}
    </div>
  );
};
