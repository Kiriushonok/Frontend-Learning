import Button from "./Button/Button.jsx";
import ModalWindow from "./ModalWindow/ModalWindow.jsx";
import { useState, useEffect } from "react";
import useInput from "../hooks/useInput.js";
import styles from "./FeedbackSection/FeedbackSection.module.css";

export default function EffectsSection() {
  const input = useInput();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchPeople() {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      setUsers(users);
      setLoading(false);
    }

    fetchPeople();
  }, []);

  return (
    <section>
      <h3>Effects</h3>

      <Button onClick={() => setIsModalOpen(true)}>
        Открыть модальное окно
      </Button>

      <ModalWindow open={isModalOpen}>
        <h3>Hello from modal</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          impedit adipisci laudantium, saepe consequuntur recusandae nemo quod
          at! Impedit atque perferendis reiciendis odit accusamus, veritatis
          consequatur iure vitae expedita consectetur.
        </p>
        <Button onClick={() => setIsModalOpen(false)}>
          Закрыть модальное окно
        </Button>
      </ModalWindow>

      {loading && <p>Загрузка</p>}

      {!loading && (
        <>
          <input type="text" className={`${styles.field}`} {...input}></input>
          <ul>
            {users
              .filter((user) =>
                user.name.toLowerCase().includes(input.value.toLowerCase())
              )
              .map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
          </ul>
        </>
      )}
    </section>
  );
}
