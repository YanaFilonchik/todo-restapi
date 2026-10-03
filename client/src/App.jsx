import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [titleInput, setTitle] = useState('');
  const [descriptionInput, setDescription] = useState('');

  async function getDate() {
    const result = await axios.get('http://localhost:3000/api/v1/task');
    console.log(result);
    setTasks(result.data);
  }

  async function addTask() {
    const result = await axios.post('http://localhost:3000/api/v1/task', {
      title: titleInput,
      description: descriptionInput,
      date: "2026-08-01",
      status: false,
    });
    getDate();
  }

  async function delTask(id) {
    const result = await axios.delete(`http://localhost:3000/api/v1/task/${id}`);
    getDate();
  }

  useEffect(() => {
    getDate();
  }, [])
  return (
    <>
      <div>
        <input placeholder='title' onChange={(e) => setTitle(e.target.value)}></input>
        <input placeholder='description' onChange={(e) => setDescription(e.target.value)}></input>
        <button onClick={addTask}>Добавить</button>
      </div>
      <div>
        {tasks.map((el) => <div>
          <p>{el.title}</p>
          <p>{el.description}</p>
          <p>{el.date}</p>
          <button onClick={()=>delTask(el.task_id)}>Удалить</button>
          <hr></hr>
        </div>)}
      </div>
    </>
  )
}

export default App
