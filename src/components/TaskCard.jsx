import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {
  Button, Card, Checkbox, IconButton, List, ListItem, ListItemIcon,
  ListItemSecondaryAction, ListItemText, makeStyles,
} from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import useForm from '../hooks/useForm';
import './TaskCard.css';
import '../styles/utils.css';
import { taskActions } from '../actions/task.actions';
import { daysLabel } from '../models/general.model';

const useStyles = makeStyles(() => ({
  text: {
    wordBreak: 'break-word',
  },
}));

const TaskCard = ({
  day, dayLabel, handleEvents, taskList = [],
}) => {
  const classes = useStyles();
  // const [tasks, setTasks] = useState(taskList);
  const [formValues, handleFormChanges, setValue] = useForm({
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
        task: {
          id   : `${timeStamp}`,
          done : false,
          task,
        },
        dayLabel,
      },
    });
    setValue({
      ...formValues,
      task: '',
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
  const handleCheckTask = (taskItem) => {
    handleEvents({
      type    : taskActions.update,
      payload : {
        task: {
          ...taskItem,
          done: !taskItem.done,
        },
        dayLabel,
      },
    });
  };

  return (
    <div className="task-card">
      <Card>

        <h1 className="t-center">{dayLabel}</h1>
        <h1 className="t-center">{day}</h1>
        <form onSubmit={handleAddTask} className="w-100">
          <TextField
            id="newTask"
            label="Nueva tarea:"
            variant="outlined"
            autoComplete="off"
            value={task}
            onChange={handleFormChanges}
            name="task"
            className="w-100"
            placeholder="Escribe una nueva tarea"
            multiline
            rowsMax={4}
          />
          <Button variant="contained" color="primary" className="w-100" onClick={handleAddTask}>
            Agregar
          </Button>
          {/* <input type="submit" value="Add" /> */}
        </form>

        <div>
          <List aria-label="tasks">
            {
              taskList.map((taskItem) => (
                <ListItem key={taskItem.id}>
                  <ListItemIcon key={taskItem.id}>
                    <Checkbox
                      edge="start"
                      checked={taskItem.done}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': taskItem.id }}
                      onChange={() => handleCheckTask(taskItem)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={taskItem.id}
                    className={classes.text}
                    primary={taskItem.task + dayLabel}
                  />
                  <ListItemSecondaryAction onClick={(e) => handleSendAnotherList(e, taskItem)}>
                    <IconButton edge="end" aria-label="comments">
                      { dayLabel === daysLabel.tomorrow ? <UndoIcon /> : <RedoIcon /> }
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
          </List>
        </div>
      </Card>
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
