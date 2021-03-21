import { useEffect, useState } from 'react';
import { taskActions } from './actions/task.actions';
import './App.css';
import TaskCard from './components/TaskCard';
import {
  getTodayText, getTomorrowText,
} from './helpers/date.helper';
import { dayLabel } from './models/general.model';

function App() {
  const [todayList, setTodayList] = useState([]);
  const [tomorrowList, setTomorrowList] = useState([]);

  const [todayInfo, setTodayInfo] = useState({
    dayLabel : dayLabel.today,
    day      : getTodayText(),
  });
  const [tomorrowInfo, setTomorrowInfo] = useState({
    dayLabel : dayLabel.tomorrow,
    day      : getTomorrowText(),
  });

  useEffect(() => {
    setTodayInfo({
      ...todayInfo,
      day: getTodayText(),
    });
    setTomorrowInfo({
      ...tomorrowInfo,
      day: getTomorrowText(),
    });
  }, []);

  const handleCreateTask = (day, task) => {
    switch (day) {
      case dayLabel.today:
        setTodayList([...todayList, task]);
        break;
      case dayLabel.tomorrow:
        setTomorrowList([...tomorrowList, task]);
        break;
      default:
        break;
    }
  };

  const handleUpdateTask = (day, task) => {
    switch (day) {
      case dayLabel.today: {
        const newListToday = [...todayList]
          .map((t) => ((t.id === task.id) ? { ...task } : { ...t }));
        setTodayList([...newListToday]);
        break;
      }
      case dayLabel.tomorrow: {
        const newListTomorrow = [...tomorrowList]
          .map((t) => ((t.id === task.id) ? { ...task } : { ...t }));
        setTomorrowList([...newListTomorrow]);
        break;
      }
      default:
        break;
    }
    // setTodayList();
    // setTomorrowList();
  };

  const handleMoveTask = (day, task) => {
    switch (day) {
      case dayLabel.today: {
        const [selectedTask] = [...todayList].filter((t) => t.id === task.id);
        const newListToday = [...todayList].filter((t) => t.id !== task.id);
        const newListTomorrow = [...tomorrowList, selectedTask];
        setTodayList([...newListToday]);
        setTomorrowList([...newListTomorrow]);
        break;
      }
      case dayLabel.tomorrow: {
        const [selectedTask] = [...tomorrowList].filter((t) => t.id === task.id);
        const newListTomorrow = [...tomorrowList].filter((t) => t.id !== task.id);
        const newListYesterday = [...todayList, selectedTask];
        setTodayList([...newListYesterday]);
        setTomorrowList([...newListTomorrow]);
        break;
      }
      default:
        break;
    }
  };

  const handleTaskCardEvent = ({ type, payload }) => {
    switch (type) {
      case taskActions.create:
        handleCreateTask(payload.dayLabel, payload.task);
        break;
      case taskActions.update:
        handleUpdateTask(payload.dayLabel, payload.task);
        break;
      case taskActions.delete:
        break;
      case taskActions.move:
        handleMoveTask(payload.dayLabel, payload.task);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1>Hola</h1>
      <div className="container-card">
        <TaskCard
          day={todayInfo.day}
          dayLabel={todayInfo.dayLabel}
          taskList={todayList}
          handleEvents={handleTaskCardEvent}
        />
        <TaskCard
          day={tomorrowInfo.day}
          dayLabel={tomorrowInfo.dayLabel}
          taskList={tomorrowList}
          handleEvents={handleTaskCardEvent}
        />
      </div>
    </div>
  );
}

export default App;
