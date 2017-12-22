import {AppDispatcher} from './AppDispatcher';
import {AppActionTypes} from './AppActionTypes';

export const AppActions = {
  editTodoDraft(text) {
    AppDispatcher.dispatch({
      type: AppActionTypes.EDIT_TODO_DRAFT,
      text,
    });
  },

  addTodo(text) {
    AppDispatcher.dispatch({
      type: AppActionTypes.ADD_TODO,
      text,
    });
  },

  toggleTodo(id) {
    AppDispatcher.dispatch({
      type: AppActionTypes.TOGGLE_TODO,
      id,
    });
  },

  removeTodo(id) {
    AppDispatcher.dispatch({
      type: AppActionTypes.REMOVE_TODO,
      id,
    });
  },
};
