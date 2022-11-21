import styles from "./StoriesUI.module.css";
import { Header, MetaInfo, SaveStory } from "../../core";
import { StoryDetails } from "../types";

const StoriesUI = ({ stories }: { stories: StoryDetails[] }) => {
  return (
    <ol>
      {stories.map((story) => {
        return (
          <li key={story.id} className={styles.listItems}>
            <Header title={story.title} storyLink={story.url} />
            <div className={styles.displayInRow}>
              <MetaInfo
                points={story.score}
                by={story.by}
                time={story.time}
                commentsCount={story.descendants}
              />
              <SaveStory storyId={story.id} />
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default StoriesUI;
