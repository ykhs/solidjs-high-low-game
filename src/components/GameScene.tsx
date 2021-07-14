import type { Component } from "solid-js";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import styles from "../styles/GameScene.module.css";
import { createNewLevel } from "../domains/game-level";

type Props = {
  finishGame: () => void;
  recordMoveCount: (count: number) => void;
};

export const GameScene: Component<Props> = ({
  finishGame,
  recordMoveCount,
}) => {
  const size = 10;
  const level = createNewLevel(size);

  const [getAnswers, setAnswers] = createSignal<number[]>([]);
  const [getRemainings, setRemainings] = createSignal<number[]>(level.choices);
  const [getStatus, setStatus] = createSignal<
    "upper" | "lower" | "correct" | null
  >(null);
  const [getMessage, setMessage] = createSignal("数字を選んでね");

  const getLatestAnswer = createMemo<number>(() => {
    const answers = getAnswers();
    return answers[answers.length - 1] ?? null;
  });

  createEffect(() => {
    const latestAnswer = getLatestAnswer();

    if (latestAnswer === null) {
      // do nothing
    } else if (latestAnswer === level.answer) {
      setMessage("正解！");
      setStatus("correct");
    } else if (latestAnswer > level.answer) {
      setMessage("もっと小さいかも？");
      setStatus("upper");
    } else if (latestAnswer < level.answer) {
      setMessage("もっと大きいかも？");
      setStatus("lower");
    }
  });

  const handleClickNumber = (index: number) => {
    const number = getRemainings()[index];
    setRemainings((remainings) => remainings.filter((v) => v !== number));
    setAnswers((answers) => [...answers, number]);
  };

  const handleClickFinish = () => {
    recordMoveCount(getAnswers().length);
    finishGame();
  };

  return (
    <div class={styles.wrapper}>
      <div class={styles.answers}>
        <h2>あなたの答え</h2>
        <ul>
          <For each={getAnswers()}>
            {(answer) => (
              <li
                classList={{
                  [styles.upper]: answer > level.answer,
                  [styles.lower]: answer < level.answer,
                  [styles.correct]: answer === level.answer,
                }}
              >
                {answer}
              </li>
            )}
          </For>
        </ul>
      </div>
      <div class={styles.numbers}>
        <h2>残りの数字</h2>
        <ul>
          <For each={getRemainings()}>
            {(number, index) => (
              <li>
                <button
                  type="button"
                  onClick={() => handleClickNumber(index())}
                >
                  {number}
                </button>
              </li>
            )}
          </For>
        </ul>
      </div>
      <div class={styles.message}>{getMessage()}</div>
      <Show when={getStatus() === "correct"}>
        <div class={styles.next}>
          <button type="button" onClick={handleClickFinish}>
            すすむ
          </button>
        </div>
      </Show>
    </div>
  );
};
