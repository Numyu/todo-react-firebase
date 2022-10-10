import "./App.css";
import { useState, useEffect } from "react";
import Todo from "./components/Todo";

import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo !");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput('')
  };

  // read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos")); // get all todos
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="heading">Todo App</h1>
        <form onSubmit={createTodo} className="form">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add todo"
            className="input"
          />
          <button className="button">+</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              text={todo.text}
              completed={todo.completed}
              id={todo.id}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              key={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
