import './App.css';
import TaskCard from './components/TaskCard';

function App() {
  return (
    <div className="App">
      <h1>Hola</h1>
      <TaskCard day="dia" dayLabel="dia" taskList={[]} />
      <TaskCard day="dia2" dayLabel="dia2" taskList={[]} />
    </div>
  );
}

export default App;
