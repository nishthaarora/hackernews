import styles from "./MetaInfo.module.css";

export interface MetaInfoType {
  by: string;
  commentsCount: number;
  points: number;
  time: number;
}

export const MetaInfo = ({ points, by, time, commentsCount }: MetaInfoType) => {
  return (
    <div className={styles.metaInfo}>
      <span>
        {points} points by {by} {time}
      </span>
      &nbsp;|&nbsp;<span>{commentsCount} comments</span>
    </div>
  );
};
