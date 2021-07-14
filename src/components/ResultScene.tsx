import type { Component } from "solid-js";
import styles from "../styles/ResultScene.module.css";

type Props = {
  restartGame: () => void;
  moveCount: number;
};

export const ResultScene: Component<Props> = ({ restartGame, moveCount }) => {
  const handleClickRestart = () => {
    restartGame();
  };

  return (
    <div class={styles.wrapper}>
      <p class={styles.message}>{moveCount}回の手数で正解しました！</p>
      <button class={styles.button} type="button" onClick={handleClickRestart}>
        もういっかい
      </button>
    </div>
  );
};
