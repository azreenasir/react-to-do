import React from "react";

const Task = ({ task, onDelete, onEdit }) => {
  return (
    <div className="task">
      <span>{task}</span>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Task;
