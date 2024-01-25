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

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleDeleteTask(id) {
    setTasks((tasks) => tasks.filter((item) => item.id !== id));
  }

  function handleEditTask(id, updatedTodo) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, todo: updatedTodo } : task
      )
    );
  }

  return (
    <div>
      <Form onAddTask={handleAddTask} />
      <Todo
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
}

function Form({ onAddTask }) {
  const [task, setTask] = useState("");

  function handleSubmitTask(e) {
    e.preventDefault();

    if (task === "") return;

    const newId = crypto.randomUUID();
    const newTodo = { id: newId, todo: task };
    onAddTask(newTodo);
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

function Todo({ tasks, onDeleteTask, onEditTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <List
          task={task}
          key={task.id}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
}

function List({ task, onDeleteTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  function handleButtonClick(action) {
    if (action === "edit") {
      setEditedTask(task.todo);
      setIsEditing(true);
    } else if (action === "delete") {
      onDeleteTask(task.id);
    }
  }

  function handleSave() {
    onEditTask(task.id, editedTask);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setEditedTask(task.todo);
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </>
      ) : (
        <>
          {task.todo}
          <Button
            className={"edit-btn"}
            onClick={() => handleButtonClick("edit")}
          >
            Edit
          </Button>
          <Button
            className={"delete-btn"}
            onClick={() => handleButtonClick("delete")}
          >
            Delete
          </Button>
        </>
      )}
    </li>
  );
}

function Button({ children, className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
