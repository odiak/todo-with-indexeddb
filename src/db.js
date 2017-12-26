const dbPromise = new Promise((resolve, reject) => {
  const req = indexedDB.open('AppDatabase', 1);
  req.onerror = (event) => {
    reject(event.target.error);
  };

  req.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (event.oldVersion < 1) {
      const store = db.createObjectStore('todos', {keyPath: 'id'});
      store.createIndex('timestamp', 'timestamp', {unique: false});
    }
  };

  req.onsuccess = (event) => {
    console.log(event.target.result);
    resolve(event.target.result);
  };
});

function transaction(db, objectStoreNames, mode, callback) {
  const t = db.transaction(objectStoreNames, mode);
  const p = new Promise((resolve, reject) => {
    t.oncomplete = () => {
      resolve();
    };
  });
  const v = callback(t);
  return Promise.all([p, v]).then(([_, v]) => v);
}

export function loadTodos() {
  return dbPromise.then((db) => {
    return transaction(db, ['todos'], 'readonly', (t) => {
      return new Promise((resolve, reject) => {
        const todoObjStore = t.objectStore('todos');
        const index = todoObjStore.index('timestamp');
        index.getAll().onsuccess = (event) => {
          console.log(event);
          resolve(event.target.result);
        };
      });
    });
  });
}

export function addTodo(todo) {
  return dbPromise.then((db) => {
    return transaction(db, ['todos'], 'readwrite', (t) => {
      const todoObjStore = t.objectStore('todos');
      todoObjStore.add(todo);
    });
  });
}

export function toggleTodo(id) {
  return dbPromise.then((db) => {
    return transaction(db, ['todos'], 'readwrite', (t) => {
      const todoObjStore = t.objectStore('todos');
      todoObjStore.get(id).onsuccess = (event) => {
        const todo = event.target.result;
        todo.done = !todo.done;
        todoObjStore.put(todo);
      };
    });
  });
}

export function removeTodo(id) {
  return dbPromise.then((db) => {
    return transaction(db, ['todos'], 'readwrite', (t) => {
      t.objectStore('todos').delete(id);
    });
  });
}
