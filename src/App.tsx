import React, { useState, useEffect, FC, ChangeEvent } from 'react'
import './App.css'
import { ITodo } from './interfaces'
import Todo, { CompletedTodo } from '../components/Todo'
import { loadConfigFromFile } from 'vite'
/// <reference types="vite/client" />


let todosCreated = 0;
if (localStorage.getItem("todosCreated")) {
  todosCreated = Number(localStorage.getItem("todosCreated"))
}else {
  localStorage.setItem("todosCreated", todosCreated.toString())
}

function triggerHMRUpdate() {
  const socket = new WebSocket(`http://localhost:5173/`);

  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({ type: 'custom:update' }));
  });

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'full-reload') {
      window.location.reload();
      console.log("hmr")

    }
  });
}



const App: FC = () => {
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [showInProgress, setShowInProgress] = useState<boolean>(true);

  const [todo, setTodoDesc] = useState<string>('');
  const [todoList, setTodoList] = useState<ITodo[]>([]);


  const handleEvent = (event: ChangeEvent<HTMLInputElement>): void => {
    setTodoDesc(event.target.value);
  };

  useEffect(() => {
    getTodosFromStorage();
  }, []);
  
  const SPLITVAL = "/|/"
  const getTodosFromStorage = ():void => {
    const localTodos = localStorage.getItem("todos")
    if (localTodos && localTodos != null) {
      // console.log(localTodos)
      let todoSaved = localTodos.split(SPLITVAL)
      for (let index = 0; index < todoSaved!.length; index+=1) {
        const todoFromStorg = todoSaved[index]
        if (!todoList.find((element) => element.desc == todoFromStorg)) {
          createTodo(todoFromStorg, index)
          triggerHMRUpdate()
        }
      }
      
      // console.log(todosCreated)
      console.log(localStorage)
    }
  }

  const setLocalStorage = () => {
    if (localStorage.getItem("todos")) {
      // this way bypasses json.stringify async
      localStorage.setItem("todos", localStorage.getItem("todos") + SPLITVAL + todo)
    } else {
      localStorage.setItem("todos", todo)
    }
    console.log(localStorage)
  }

  const createTodo = (value: string, id:number):void => {
    const newTodo = { id: id, desc: value, complete: false};
    setTodoList([...todoList, newTodo]);
    console.log(value, todoList)
    setTodoDesc('');
    // console.log(todo)
  }

  const registerTodo = ():void => {
    if (todo !== '') {
      todosCreated += 1;
      localStorage.setItem("todosCreated", todosCreated.toString())
      setLocalStorage()
      createTodo(todo, todosCreated)

    } else {
      console.log("todo must have a description");
    }
  }


  
  const deleteTodo = (todoIdToDelete: number): void => {
    setTodoList(todoList.filter((todo) => {
      return todo.id != todoIdToDelete;
    }))
  }

  const completeTodo = (todoIdToComplete: number): void => {
    const newCompletedTodo = todoList.filter((todo) => {
      return todo.id == todoIdToComplete;
    })[0];
    // console.log(newCompletedTodo)
    deleteTodo(newCompletedTodo.id)
    newCompletedTodo.complete = true
    
    setTodoList([...todoList])
    // localStorage.removeItem(newCompletedTodo.id.toString())
    // console.log(todoList)

  }


  return (
    <>
      <div className='header'>
        <h1>Add Todo</h1>
        <h2>Description:</h2>
        <input type="text" id="descBox" placeholder='Enter Todo' onChange={handleEvent} value={todo} aria-label='todo-input'/>
        <button onClick={registerTodo} aria-label='createBtn'>Create</button>

        <div className="checkBoxes">
          <input type="checkbox" id="inProgress" defaultChecked onChange={() => setShowInProgress(!showInProgress)}/>
          <label htmlFor="inProgress"> In Progress </label>
          <input type="checkbox" id="completed" defaultChecked onChange={() => setShowCompleted(!showCompleted)}/>
          <label htmlFor="completed"> Completed </label>
        </div>
        <button onClick={triggerHMRUpdate}>Trigger HMR Update</button>
      </div>

      <div className="todoList" key="shutupstupidconsole">
        { todoList.map((todo: ITodo, key: number) => {
          return (todo.complete == true ? (
            <>
              { showCompleted && 
                <CompletedTodo todo={todo} key={key}  deleteTodo={deleteTodo} />
              }
            </>
          ) : ( 
            <>

              { showInProgress && 
                <Todo key={key} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
              }
            </>
          )
        )})}
      </div>

    </>
  )
}

export default App;
