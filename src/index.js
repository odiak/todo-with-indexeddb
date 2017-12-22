import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppContainer} from './AppContainer';
import {AppActions} from './AppActions';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppContainer />, document.getElementById('root'));

AppActions.restoreTodosFromCache();

registerServiceWorker();
