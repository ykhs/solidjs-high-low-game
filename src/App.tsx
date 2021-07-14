import type { Component } from "solid-js";
import { createSignal, Match, Switch } from "solid-js";
import styles from "./styles/App.module.css";
import { StartScene } from "./components/StartScene";
import { GameScene } from "./components/GameScene";
import { ResultScene } from "./components/ResultScene";
import { Scene } from "./types";

const App: Component = () => {
  const [getScene, setScene] = createSignal<Scene>("Start");
  const [getMoveCount, setMoveCount] = createSignal(0);

  const startGame = () => {
    setScene("Game");
  };
  const finishGame = () => {
    setScene("Result");
  };
  const restartGame = () => {
    setScene("Start");
  };
  const recordMoveCount = (count: number) => {
    setMoveCount(count);
  };

  return (
    <div class={styles.wrapper}>
      <main class={styles.main}>
        <Switch>
          <Match when={getScene() === "Start"}>
            <StartScene startGame={startGame} />
          </Match>
          <Match when={getScene() === "Game"}>
            <GameScene
              finishGame={finishGame}
              recordMoveCount={recordMoveCount}
            />
          </Match>
          <Match when={getScene() === "Result"}>
            <ResultScene restartGame={restartGame} moveCount={getMoveCount()} />
          </Match>
        </Switch>
      </main>
    </div>
  );
};

export default App;
