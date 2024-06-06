import React, { useState, useEffect, FC, ChangeEvent } from 'react'
import './App.css'
import { ITodo } from './interfaces'
import Todo, { CompletedTodo } from '../components/Todo'

const LOREM = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate deserunt velit ducimus doloremque veritatis perferendis nulla laudantium inventore? Incidunt provident error rem quam molestiae iure odit repellat! Fugit, veniam error."

// let todosList: Todo[] = [
//   { id: 0, desc: LOREM },
//   { id: 1, desc: LOREM },
// ];

let todosCreated = 0

const App: FC = () => {
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [showInProgress, setShowInProgress] = useState<boolean>(true);

  const [todo, setTodoDesc] = useState<string>('');
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [completedList, setCompleteList] = useState<ITodo[]>([]);


  const handleEvent = (event: ChangeEvent<HTMLInputElement>): void => {
    setTodoDesc(event.target.value);
  };

  const addTodo = ():void => {
    if (todo !== '') {
      const newTodo = { id: todosCreated+=1, desc: todo, status: "incomplete"};
      setTodoList([...todoList, newTodo]);
      setTodoDesc('');
      // console.log(todoList);
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
    newCompletedTodo.status = 'completed'
    
    setCompleteList([...completedList, newCompletedTodo])
  }

  return (
    <>
      <div className='header'>
        <h1>Add Todo</h1>
        <h2>Description:</h2>
        <input type="text" id="descBox" placeholder='Enter Todo' onChange={handleEvent} value={todo} aria-label='todo-input'/>
        <button onClick={addTodo} aria-label='createBtn'>Create</button>

        <div className="checkBoxes">
          <input type="checkbox" id="inProgress" defaultChecked onChange={() => setShowInProgress(!showInProgress)}/>
          <label htmlFor="inProgress"> In Progress </label>
          <input type="checkbox" id="completed" defaultChecked onChange={() => setShowCompleted(!showCompleted)}/>
          <label htmlFor="completed"> Completed </label>
        </div>
      </div>

      <div className="todoList">
        {showInProgress &&
          <div className="inProgressTodos">
            {todoList.map((todo: ITodo, key: number) => {
              return <Todo key={key} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
            })}
          </div>
        }
        { showCompleted && 
        <div className="completeTodos">
            {completedList.map((todo: ITodo, key: number) => {
              return <CompletedTodo todo={todo} key={key}/>
            })}
        </div>
        }

      </div>

    </>
  )
}

export default App;
