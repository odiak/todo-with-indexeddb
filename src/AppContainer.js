import {App} from './App';
import {Container} from 'flux/utils';
import {AppActions} from './AppActions';
import {AppDispatcher} from './AppDispatcher';
import {TodoStore} from './TodoStore';
import {TodoDraftStore} from './TodoDraftStore';

let todoStore = new TodoStore(AppDispatcher);
let todoDraftStore = new TodoDraftStore(AppDispatcher);

function getStores() {
  return [
    todoStore,
    todoDraftStore,
  ];
}

function getState() {
  return {
    todos: todoStore.getState(),
    todoDraft: todoDraftStore.getState(),

    ...AppActions,
  };
}

export const AppContainer = Container.createFunctional(App, getStores, getState);
