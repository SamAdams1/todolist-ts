interface Props {
  desc: String,
}

function Todo( {desc}: Props) {
  return (
    <div className='todo'>
      <h3>{desc}</h3>
      <button>Complete</button>
      <button>Delete</button>
      <button>Edit</button>
    </div>
  )
}

export default Todo