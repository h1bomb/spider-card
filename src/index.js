import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import reducer from './reducers';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
let reduxDevtools;

if(process.env.NODE_ENV !== 'production') {
  reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ 
  && window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(reducer,reduxDevtools);

ReactDOM.render(
  <DragDropContextProvider backend={HTML5Backend}>
    <Provider store={store}>
      <App />
    </Provider>
  </DragDropContextProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
