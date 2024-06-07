import React, { useState, useEffect, FC, ChangeEvent } from 'react'
import './App.css'
import { ITodo } from './interfaces'
import Todo, { CompletedTodo } from '../components/Todo'


const getLocalItems = () => {
  let list = localStorage.getItem("todos")
  console.log(list)

  if (list) {
    return JSON.parse(list)
  }else {
    return []
  }
}
let todosCreated = 0;
if (localStorage.getItem("todosCreated")) {
  todosCreated = Number(localStorage.getItem("todosCreated"))
}else {
  localStorage.setItem("todosCreated", todosCreated.toString())
}


const App: FC = () => {
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [showInProgress, setShowInProgress] = useState<boolean>(true);

  const [todo, setTodoDesc] = useState<string>('');
  const [todoList, setTodoList] = useState<ITodo[]>(getLocalItems);
  const [completeList, setCompleteList] = useState<ITodo[]>([]);


  const handleEvent = (event: ChangeEvent<HTMLInputElement>): void => {
    setTodoDesc(event.target.value);
  };

  useEffect(() => {
    // getTodoFromStorage();
  }, []);
  
  const getTodoFromStorage = ():void => {
      // for (let index = 0; index <= localStorage.todosCreated; index+=1) {
      //   const todoFromStorg = localStorage[index]
      //   if (!todoList.find((element) => element.desc == todoFromStorg) && todoFromStorg) {
      //     createTodo(todoFromStorg, index)
      // }
      // console.log(todosCreated)
      // console.log(localStorage)
    // }
    const lastCreatedTodo = localStorage.lastCreated;
    if (!todoList.find((element) => element.desc == lastCreatedTodo) && lastCreatedTodo) {
      createTodo(lastCreatedTodo)
    }
  }
  const createTodo = (value: string):void => {
    const newTodo = { id: todosCreated, desc: value, complete: false};
    setTodoList([...todoList, newTodo]);
    console.log(value, todoList)
    // console.log(localStorage)
    setTodoDesc('');
    // console.log(todo)
  }

  const registerTodo = async ():Promise<void> => {
    if (todo !== '') {
      todosCreated += 1;
      localStorage.setItem("lastCreated", todo)
      localStorage.setItem("todosCreated", todosCreated.toString())
      // setLocalStorage()
      createTodo(todo)
      console.log(todosCreated)
      localStorage.setItem("todos", todoList.join("|"))

    } else {
      console.log("todo must have a description");
    }
  }
  
  const deleteTodo = (todoIdToDelete: number): void => {
    setTodoList(todoList.filter((todo) => {
      return todo.id != todoIdToDelete;
    }))
    // resetState()
  }

  const completeTodo = (todoIdToComplete: number): void => {
    const newCompletedTodo = todoList.filter((todo) => {
      return todo.id == todoIdToComplete;
    })[0];
    // console.log(newCompletedTodo)
    deleteTodo(newCompletedTodo.id)
    newCompletedTodo.complete = true
    
    setCompleteList([...completeList, newCompletedTodo])
    localStorage.setItem("todos", JSON.stringify(todoList))
    // console.log(todoList)

  }
  
//"[{"id":1,"desc":"a","complete":false},{"id":2,"desc":"b","complete":false},{"id":3,"desc":"c","complete":false}]"
  const resetState = () => {
    todosCreated += 1
    createTodo("idk")
    // deleteTodo(0)
    todosCreated -= 1
    localStorage.setItem("lastCreated", todo)
    localStorage.setItem("todosCreated", todosCreated.toString())
    localStorage.setItem("todos", JSON.stringify(todoList))

    console.log("resetting...")
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
        <button onClick={() => localStorage.clear()}>CLEAR local storage</button>
        <button onClick={() => console.log(localStorage)}>PRINT local storage</button>
        <button onClick={() => resetState()}>resetState</button>
      </div>

      <div className="todoList" key="shutupstupidconsole">
        { completeList.map((todo: ITodo,  index: number) => {
          return (
            <>
              { showCompleted &&
                <CompletedTodo todo={todo} key={index}  deleteTodo={deleteTodo} />
              }
            </>
          )
        })}
        { todoList.map((todo: ITodo, key: number) => {
          return (
            <>
              { showInProgress &&
                <Todo key={key} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
              }
            </>
          )
        })}
      </div>
    </>
  )
}

export default App;
