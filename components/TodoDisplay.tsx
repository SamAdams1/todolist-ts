import Todo from '../components/Todo'

const LOREM = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate deserunt velit ducimus doloremque veritatis perferendis nulla laudantium inventore? Incidunt provident error rem quam molestiae iure odit repellat! Fugit, veniam error."





function TodoDisplay( todos: Todo[]) {
  return (
    <div className='todoDisplay'>
      {/* {todos.map((todoDict, i) => (
        <Todo desc={todoDict.desc}  key={i}/>
      ))} */}
      <Todo desc={LOREM} />
    </div>
  )
}

export default TodoDisplay