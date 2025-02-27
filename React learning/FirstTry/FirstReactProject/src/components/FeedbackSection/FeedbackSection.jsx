import styles from "./FeedbackSection.module.css";
import Button from "../Button/Button.jsx";
import { useState, useRef } from "react";

function RefTry() {
  const input = useRef()
  const [show, setShow] = useState(false);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
        setShow(true)
    }
  }

  return (
    <div className={`${styles.fieldsContainer}`}>
      <h3>Input value : {show && input.current.value}</h3>
      <input
        ref={input}
        type="text"
        className={`${styles.field}`}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default function FeedbackSection() {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("help");
  const [hasError, setHasError] = useState(true);

  function handleNameChange(event) {
    setName(event.target.value);
    setHasError(event.target.value.trim().length === 0);
  }

  return (
    <>
      <form className={`${styles.fieldsContainer}`}>
        <h3 className={`${styles.header}`}>Обратная связь</h3>

        <label htmlFor="name">Ваше имя</label>
        <input
          type="text"
          id="name"
          className={`${styles.field}`}
          value={name}
          onChange={handleNameChange}
          style={{ border: hasError ? "1px solid red" : null }}
        />

        <label htmlFor="reson">Причина</label>
        <select
          id="reason"
          className={`${styles.field}`}
          onChange={(event) => setReason(event.target.value)}
        >
          <option value="error">Ошибка</option>
          <option value="help">Нужна помощь</option>
          <option value="suggest">Предложение</option>
        </select>

        <Button disabled={hasError} isActive={!hasError}>
          Отправить
        </Button>
      </form>

      <RefTry />
    </>
  );
}
