

function CreateTodoPanel() {
  return (
    <div className='createTodoPanel'>
      <h1>Create Todo</h1>
      <h2>Title</h2>
      <input type="text" name="" id="titleBox" />
      <h3>Description</h3>
      <input type="text" name="" id="descBox" />
      <h4 className="warningLabel">-</h4>
      <button>Create</button>
    </div>
  )
}
 export default CreateTodoPanel;