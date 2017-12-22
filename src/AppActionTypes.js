export const AppActionTypes = {
  RESTORE_TODOS: null,
  EDIT_TODO_DRAFT: null,
  ADD_TODO: null,
  TOGGLE_TODO: null,
  REMOVE_TODO: null,
};

for (let key in AppActionTypes) {
  AppActionTypes[key] = key;
}
Object.freeze(AppActionTypes);
