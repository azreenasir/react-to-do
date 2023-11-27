import React from "react";
import Task from "./Tasks.js";

const Todo = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className="task-list">
      <h2>To do List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <Task
              task={task}
              onDelete={() => onDelete(index)}
              onEdit={() => onEdit(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
