import React, { Component } from 'react';
import './App.css';

export const App = (props) => {
  const {todos, todoDraft, addTodo, editTodoDraft, toggleTodo, removeTodo} = props;

  const todoListItems = [...todos.values()].reverse().map((todo) => (
    <li
      key={todo.id}
      className={[
        todo.done ? 'done' : '',
      ].join(' ')}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleTodo(todo.id)}
        />
      <span className="text">{todo.text}</span>
      <span
        className="delete"
        onClick={() => removeTodo(todo.id)}>delete</span>
    </li>
  ));

  const handleKeyDownForNewTodo = (event) => {
    if (event.keyCode === 13) {
      addTodo(todoDraft);
    }
  };

  return (
    <div className="App">
      <h1>Todo</h1>
      <input type="text"
        value={todoDraft}
        onChange={(event) => editTodoDraft(event.target.value)}
        onKeyDown={handleKeyDownForNewTodo}
        autoFocus={true}
        />
      <ul>{todoListItems}</ul>
    </div>
  );
};
