import {AppDispatcher} from './AppDispatcher';
import {AppActionTypes} from './AppActionTypes';
import * as db from './db';

export const AppActions = {
  restoreTodosFromCache() {
    db.loadTodos().then((todos) => {
      console.log(todos);
      AppDispatcher.dispatch({
        type: AppActionTypes.RESTORE_TODOS,
        todos,
      });
    });
  },

  editTodoDraft(text) {
    AppDispatcher.dispatch({
      type: AppActionTypes.EDIT_TODO_DRAFT,
      text,
    });
  },

  addTodo(text) {
    const todo = {
      id: (new Array(10)).fill(null)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join(''),
      text: text,
      done: false,
      timestamp: Math.floor(+(new Date()) / 1000),
    };
    db.addTodo(todo);
    AppDispatcher.dispatch({
      type: AppActionTypes.ADD_TODO,
      todo,
    });
  },

  toggleTodo(id) {
    db.toggleTodo(id);
    AppDispatcher.dispatch({
      type: AppActionTypes.TOGGLE_TODO,
      id,
    });
  },

  removeTodo(id) {
    db.removeTodo(id);
    AppDispatcher.dispatch({
      type: AppActionTypes.REMOVE_TODO,
      id,
    });
  },
};
