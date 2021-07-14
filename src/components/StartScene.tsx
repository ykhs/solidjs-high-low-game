import type { Component } from "solid-js";
import styles from "../styles/StartScene.module.css";

type Props = {
  startGame: () => void;
};

export const StartScene: Component<Props> = ({ startGame }) => {
  const handleClickStart = () => {
    startGame();
  };

  return (
    <div class={styles.wrapper}>
      <h1 class={styles.heading}>High Low Game</h1>
      <button class={styles.button} type="button" onClick={handleClickStart}>
        始める
      </button>
    </div>
  );
};
