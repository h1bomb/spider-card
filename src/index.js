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

const store = createStore(reducer);

ReactDOM.render(
  <DragDropContextProvider backend={HTML5Backend}>
    <Provider store={store}>
      <App />
    </Provider>
  </DragDropContextProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
