import React, { useState, ChangeEvent } from 'react';
import "./App.css";
import TodoTask from './components/TodoTask';
import {ITodo} from './interfaces'

const App = () => {

  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [id, setId] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const addTask = (): void => {
    const newTask = {id: id+1, taskName: task, created: new Date().toTimeString().slice(0, 5), done: false};
    setId(id+1);
    setTodoList([...todoList, newTask]);
    setTask("");
  };

  const deleteTask = (taskIdToDelete: number): void => {
    setTodoList(todoList.filter((task) => {
      return task.id !== taskIdToDelete;
    }))
  };

  const completeTask = (taskIdToComplete: number): void => {
    setTodoList(todoList.map((task) => {
      if (task.id === taskIdToComplete) {
        task.done = !task.done;
      }
      return task;
    }))
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input 
            type="text" 
            placeholder="할 일을 입력하세요." 
            name="task" 
            value={task}
            onChange={handleChange}
            onKeyPress={(event) => {
              if (event.key === "Enter"){
                if (task.trim() !== "") {
                  addTask();
                } else {
                  alert('할 일을 입력해주세요.')
                }
            }}
          }/>
        </div>
        <button onClick={
          () => {
            if (task.trim() !== "") {
              addTask();
            } else {
              alert('할 일을 입력해주세요.')
            }}
        }>추가</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITodo, key:number) => {
          return <TodoTask key={key} task={task} 
                          completeTask={completeTask}
                          deleteTask={deleteTask}/>
        })}
      </div>
    </div>
  );
}

export default App;