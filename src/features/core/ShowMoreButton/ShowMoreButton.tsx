import styles from "./ShowMoreButton.module.css";

export const ShowMoreButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={styles.showMore} onClick={onClick}>
      show more
    </button>
  );
};
