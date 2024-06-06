import { useState, ChangeEvent  } from "react";
import { ITodo } from "../src/interfaces"

interface Props {
  todo: ITodo;
  deleteTodo(todoIdToDelete: number): void;
  completeTodo(todoIdToComplete: number): void;
}

function Todo( { todo, deleteTodo, completeTodo }: Props) {
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
    <div className="todo" data-testid={'todo'}>
    {!showEditor ? (
      <>
        <h3>{todo.desc}</h3>
        <button onClick={() => completeTodo(todo.id)} aria-label={'completeBtn'}>Complete</button>
        <button onClick={() => deleteTodo(todo.id)} aria-label={'deleteBtn'}>Delete</button>
        <button onClick={() => setShowEditor(true)}>Edit</button>
      </>
    ) : (
      <>
        <input type="text" defaultValue={todo.desc} onChange={handleEvent}/>
        <p></p>
        <button onClick={saveChange}>Save</button>

      </>
    )}
    </div>
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