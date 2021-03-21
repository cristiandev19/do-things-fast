import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm from '../hooks/useForm';
import './TaskCard.css';
import '../styles/utils.css';
import { taskActions } from '../actions/task.actions';

const TaskCard = ({
  day, dayLabel, handleEvents, taskList = [],
}) => {
  // const [tasks, setTasks] = useState(taskList);
  const [formValues, handleFormChanges] = useForm({
    task: '',
  });

  const { task } = formValues;

  useEffect(() => {
    // console.log('se hizo un cambio en task', task);
  }, [task]);

  const handleAddTask = (event) => {
    event.preventDefault();
    const timeStamp = Date.now();
    // setTasks([
    //   ...tasks,
    //   {
    //     task,
    //     id: timeStamp,
    //   },
    // ]);
    handleEvents({
      type    : taskActions.create,
      payload : {
        task: { task, id: `${timeStamp}` },
        dayLabel,
      },
    });
  };
  const handleSendAnotherList = (e, taskItem) => {
    handleEvents({
      type    : taskActions.move,
      payload : {
        task: { ...taskItem },
        dayLabel,
      },
    });
  };

  return (
    <div className="task-card">
      <h1>{dayLabel}</h1>
      <h1>{day}</h1>
      <form onSubmit={handleAddTask} className="w-100">
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
            taskList.map((taskItem) => (
              <li key={taskItem.id}>
                <span>
                  {taskItem.task}
                </span>
                <button type="button" onClick={(e) => handleSendAnotherList(e, taskItem)}>Enviar a la otra lista</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  day          : PropTypes.string.isRequired,
  dayLabel     : PropTypes.string.isRequired,
  handleEvents : PropTypes.func.isRequired,
  taskList     : PropTypes.arrayOf(
    PropTypes.shape({
      id   : PropTypes.string.isRequired,
      task : PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TaskCard;
