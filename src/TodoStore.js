import {OrderedMap} from 'immutable';
import {ReduceStore} from 'flux/utils';
import {AppActionTypes} from './AppActionTypes';
import {Todo} from './Todo';

function genId() {
  return (new Array(10)).fill(null).map(() => Math.floor(Math.random() * 16).toString(16));
}

export class TodoStore extends ReduceStore {
  getInitialState() {
    return OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case AppActionTypes.ADD_TODO: {
        let id = genId();
        return state.set(id, new Todo({
          id,
          text: action.text,
          done: false,
        }));
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
