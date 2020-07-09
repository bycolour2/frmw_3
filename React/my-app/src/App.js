import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [chosenTasks, setChosenTasks] = useState([]);
  const [newTaskValue, setNewTaskValue] = useState("");

  useEffect(() => {
    fetch("https://kodaktor.ru/j/tasklist")
      .then((data) => data.json())
      .then((result) => setTaskList(result.list));
  }, []);

  const addNewTask = () => {
    if (!taskList.includes(newTaskValue) && newTaskValue) {
      setTaskList([...taskList, newTaskValue]);
    }
  };

  const handleChosenTask = (taskText, e) => {
    if (e.target.checked) {
      setChosenTasks([...chosenTasks, taskText]);
    } else {
      const newChosenTasks = [...chosenTasks].filter((el) => el !== taskText);
      setChosenTasks(newChosenTasks);
    }
  };

  const removeChosenTasks = () => {
    const filteredTaskList = taskList.filter((el) => !chosenTasks.includes(el));
    setTaskList([...filteredTaskList]);
    setChosenTasks([]);
  };

  return (
    <div className="App">
      {taskList &&
        taskList.map((text, index) => {
          return (
            <div style={{ display: "flex" }} key={index + 1}>
              <div key={index + 1}>
                {index + 1}. {text}
              </div>
              <input
                key={text}
                type="checkbox"
                onChange={(e) => handleChosenTask(text, e)}
              />
            </div>
          );
        })}
      <div style={{ display: "flex" }}>
        <input
          value={newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
        />
        <button onClick={addNewTask}>Добавить</button>
      </div>
      <button onClick={removeChosenTasks} disabled={!chosenTasks.length}>
        Удалить
      </button>
    </div>
  );
};

export default App;
