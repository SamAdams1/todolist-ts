import React, { useState, useEffect, FC } from 'react'
import CreateTodoPanel from '../components/CreateTodoPanel'
import TodoDisplay from '../components/TodoDisplay'
import './App.css'

const LOREM = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate deserunt velit ducimus doloremque veritatis perferendis nulla laudantium inventore? Incidunt provident error rem quam molestiae iure odit repellat! Fugit, veniam error."

// interface Todo {
//   id: number;
//   desc: string;
// }

// let todosList: Todo[] = [
//   { id: 0, desc: LOREM },
//   { id: 1, desc: LOREM },
// ];

// let todosCreated = 0

const App: FC = () => {
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const [todoDesc, setTodoDesc] = useState<string>('');
  const [todoList, setTodoList] = useState([]);

  function createTodo() {
    if (todoDesc !== '') {
      console.log(todoDesc)
      setShowWarning(false)
    } else {
      console.log("todo must have a description")
      setShowWarning(true)
    }
  }

  return (
    <>
      <div className='header'>
        <h1>Add Todo</h1>
        <h2>Description:</h2>
        <input type="text" id="descBox" placeholder='Enter Todo' onChange={e => setTodoDesc(e.target.value)} />
        {showWarning && <h3 className="warningLabel">Todo must have a description.</h3>}
        <p></p>
        <button onClick={() => createTodo()}>Create</button>
      </div>

      <div className="todoList">
        <TodoDisplay />

      </div>

    </>
  )
}

export default App;
