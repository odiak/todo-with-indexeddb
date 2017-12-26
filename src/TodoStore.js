import {OrderedMap} from 'immutable';
import {ReduceStore} from 'flux/utils';
import {AppActionTypes} from './AppActionTypes';
import {Todo} from './Todo';

export class TodoStore extends ReduceStore {
  getInitialState() {
    return OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case AppActionTypes.RESTORE_TODOS:
        return action.todos.reduce((map, todo) => {
          return map.set(todo.id, new Todo(todo));
        }, OrderedMap());

      case AppActionTypes.ADD_TODO: {
        if (action.todo.text === '') {
          return state;
        }
        return state.set(action.todo.id, new Todo(action.todo));
      }

      case AppActionTypes.TOGGLE_TODO:
        return state.updateIn([action.id, 'done'], (done) => !done);

      case AppActionTypes.REMOVE_TODO:
        return state.delete(action.id);

      default:
        return state;
    }
  }
}
