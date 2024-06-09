import { useState, useEffect, FC, ChangeEvent } from 'react'
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
} else {
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

  // Update local storage whenever TODOs change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);
  useEffect(() => {
    localStorage.setItem('todosCreated', todosCreated.toString());
  }, [todosCreated]);

  const createTodo = (value: string):void => {
    const newTodo = { id: todosCreated, desc: todo, complete: false};
    setTodoList([...todoList, newTodo]);
    console.log(value, todoList)
    // console.log(localStorage)
    setTodoDesc('');
    // console.log(todo)
  }

  const registerTodo = ():void => {
    if (todo !== '') {
      todosCreated += 1;
      createTodo(todo)
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
    deleteTodo(newCompletedTodo.id)
    newCompletedTodo.complete = true
    
    setCompleteList([...completeList, newCompletedTodo])
    localStorage.setItem("todos", JSON.stringify(todoList))
  }

  const editTodo = (todoIdToEdit: number, desc: string): void => {
    for (let index = 0; index < todoList.length; index++) {
      const todo = todoList[index];
      if (todo.id == todoIdToEdit) {
        todo.desc = desc
        setTodoList([...todoList])
      }
    }
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
        {/* <button onClick={() => localStorage.clear()}>CLEAR local storage</button>
        <button onClick={() => console.log(localStorage)}>PRINT local storage</button> */}
      </div>

      <div className="todoList" key="shutupstupidconsole">
        { completeList.map((todo: ITodo,  index: number) => {
          return (
            <>
              { showCompleted &&
                <CompletedTodo todo={todo} key={index} />
              }
            </>
          )
        })}
        { todoList.map((todo: ITodo, key: number) => {
          return (
            <>
              { showInProgress &&
                <Todo key={key} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} editTodo={editTodo}/>
              }
            </>
          )
        })}
      </div>
    </>
  )
}

export default App;
