import { ITodo } from '../interfaces'

interface Props {
  task: ITodo;
  deleteTask(taskIdToDelete: number): void;
  completeTask(taskIdToComplete: number): void;
}

const TodoTask = ({ task, deleteTask, completeTask }: Props) => {
  return (
    <div className="task">
      <div className={task.done ? "done" : "content"}
        onClick={() => completeTask(task.id)}
        >
        <span>{task.taskName}</span>
        <span>{task.created}</span>
      </div>
      <button onClick={() => {
        deleteTask(task.id);
      }}>X</button>
    </div>
  )
}

export default TodoTask
