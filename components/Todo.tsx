import { useState, ChangeEvent  } from "react";
import { ITodo } from "../src/interfaces"

interface Props {
  todo: ITodo;
  deleteTodo(todoIdToDelete: number): void;
  completeTodo(todoIdToComplete: number): void;
  editTodo(todoIdToEdit: number): void;
}

function Todo( {todo, deleteTodo, completeTodo, editTodo}: Props) {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [newDesc, setNewDesc] = useState<string>('');


  const handleEvent = (event: ChangeEvent<HTMLInputElement>):void => {
    setNewDesc(event.target.value)
  }
  const saveChange = ():void => {
    if (newDesc !== '') {
      todo.desc = newDesc
    }
    setShowEditor(false)
  }

  return (
    <>
    {!showEditor ? (
      <div className='todo'>
        <h3>{todo.desc}</h3>
        <button onClick={() => completeTodo(todo.id)}>Complete</button>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        <button onClick={() => setShowEditor(true)}>Edit</button>
      </div>
    ) : (
      <div className='todo'>
        <input type="text" defaultValue={todo.desc} onChange={handleEvent}/>
        <p></p>
        <button onClick={saveChange}>Save</button>

      </div>
    )}
    </>
  )
}

interface CompleteProps {todo: ITodo}
export const CompletedTodo = ( {todo}: CompleteProps ) => {
  return (
    <>
    <div className="todo completed">
      <h2>{todo.desc}</h2>
      <h3>{todo.status}</h3>
    </div>
    </>
  )
}

export default Todo