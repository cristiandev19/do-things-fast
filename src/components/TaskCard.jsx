import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useForm from '../hooks/useForm';

const TaskCard = ({ day, dayLabel, taskList = [] }) => {
  const [tasks, setTasks] = useState(taskList);
  const [formValues, handleFormChanges] = useForm({
    task: '',
  });

  const { task } = formValues;

  useEffect(() => {
    console.log('se hizo un cambio en task', task);
  }, [task]);

  const handleAddTask = (event) => {
    event.preventDefault();
    console.log('task', task);
    const timeStamp = Date.now();
    setTasks([
      ...tasks,
      {
        task,
        id: timeStamp,
      },
    ]);
    console.log('tasks', tasks);
  };
  return (
    <>
      <h1>{dayLabel}</h1>
      <h1>{day}</h1>
      <form onSubmit={handleAddTask}>
        <label htmlFor="newTask">
          Nueva tarea:
          <input
            type="text"
            name="task"
            placeholder="Agregue una nueva tarea"
            autoComplete="off"
            value={task}
            onChange={handleFormChanges}
            id="newTask"
          />
        </label>
        <input type="submit" value="Add" />
      </form>

      <div>
        <ul>
          {
            tasks.map((taskItem) => <li key={taskItem.id}>{taskItem.task}</li>)
          }
        </ul>
      </div>
    </>
  );
};

TaskCard.propTypes = {
  day: PropTypes.string.isRequired,
  dayLabel: PropTypes.string.isRequired,
  taskList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      task: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TaskCard;
