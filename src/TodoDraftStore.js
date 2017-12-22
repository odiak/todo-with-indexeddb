import {ReduceStore} from 'flux/utils';
import {AppActionTypes} from './AppActionTypes';

export class TodoDraftStore extends ReduceStore {
  getInitialState() {
    return '';
  }

  reduce(state, action) {
    switch (action.type) {
      case AppActionTypes.EDIT_TODO_DRAFT:
        return action.text;

      case AppActionTypes.ADD_TODO:
        return '';

      default:
        return state;
    }
  }
}
