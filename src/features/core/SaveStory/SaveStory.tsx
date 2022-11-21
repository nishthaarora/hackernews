import { useState } from "react";
import styles from "./SaveStory.module.css";
import { getLocalStorageItems } from "../../utils";

export const SaveStory = ({
  storyId,
  onClick,
}: {
  storyId: number;
  onClick?: (saved: boolean, storyId: number) => void;
}) => {
  function getCurrentIndex() {
    const localStorageItems = getLocalStorageItems();
    return localStorageItems.findIndex((id: number) => id === storyId);
  }
  const [saved, setSaved] = useState<boolean>(getCurrentIndex() >= 0);

  const handleClick = () => {
    const currentSavedIndex = getCurrentIndex();
    let localStorageItems = getLocalStorageItems();

    if (currentSavedIndex < 0) {
      localStorageItems.push(storyId);
      setSaved(true);
    } else {
      setSaved(false);
      localStorageItems = localStorageItems
        .slice(0, currentSavedIndex)
        .concat(
          localStorageItems.slice(
            currentSavedIndex + 1,
            localStorageItems.length
          )
        );
    }

    localStorage.setItem("saved", JSON.stringify(localStorageItems));

    if (onClick) {
      onClick(saved, storyId);
    }
  };

  return (
    <button className={`${styles.saveButton}`} onClick={handleClick}>
      <span className={saved ? styles.filledStar : ""}>&#9733;</span>{" "}
      {saved ? "saved" : "save"}
    </button>
  );
};
