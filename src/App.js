import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    todo: "Complete React Tutorial",
  },
  {
    id: 2,
    todo: "Write CSS for Todo App",
  },
  {
    id: 3,
    todo: "Test and Debug the Application",
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleNewTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  return (
    <div>
      <Form onNewTask={handleNewTask} />
      <Todo tasks={tasks} />
    </div>
  );
}

function Form({ onNewTask }) {
  const [task, setTask] = useState("");

  function handleSubmitTask(e) {
    e.preventDefault();

    if (task === "") return;

    const newId = crypto.randomUUID();
    const newTodo = { id: newId, todo: task };
    onNewTask(newTodo);
    setTask("");
  }

  return (
    <div>
      <h1>Todo List</h1>

      <form onSubmit={handleSubmitTask}>
        <label>Task</label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button>Add Task</Button>
      </form>
    </div>
  );
}

function Todo({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <List task={task} key={task.id} />
      ))}
    </ul>
  );
}

function List({ task }) {
  return (
    <li>
      {task.todo}
      <Button className={"edit-btn"}>Edit</Button>
      <Button className={"delete-btn"}>Delete</Button>
    </li>
  );
}

function Button({ children, className }) {
  return <button className={className}>{children}</button>;
}
