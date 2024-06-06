import { expect, it } from 'vitest'
import App from './App.tsx'
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';


it('Adds todo to list', async () => {
  const renderedApp = render(<App />);
  const input = await renderedApp.findByLabelText('todo-input');
  await user.type(input, "do homework");
  const createBtn = await renderedApp.findByLabelText("createBtn");
  await user.click(createBtn);
  const todos = await renderedApp.findAllByTestId("todo");
  expect(todos.length).toBe(1);
});


it('Adds then deletes todo from the todolist', async () => {
  const renderedApp = render(<App />);
  const input = await renderedApp.findByLabelText('todo-input');
  await user.type(input, "do homework");
  const createBtn = await renderedApp.findByLabelText("createBtn");
  await user.click(createBtn);

  const deleteBtn = await renderedApp.findByLabelText("deleteBtn");
  const todos = await renderedApp.findAllByTestId("todo");
  let numTodos = todos.length;
  await user.click(deleteBtn);

  // tries to find todolist, if delete worked will cause error as div wont exist (NOT ELEGANT LOL)
  try {
    await renderedApp.findAllByTestId("todo");
  } catch {
    numTodos = 0;
  }
  expect(numTodos).toBe(0)
})
