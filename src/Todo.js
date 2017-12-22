import {Record} from 'immutable';

export const Todo = Record({
  id: '',
  done: false,
  text: '',
  timestamp: 0,
});
