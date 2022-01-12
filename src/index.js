import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './modules/index';

// 리덕스 and 리덕스 미들웨어
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import ReduxThunk from "redux-thunk";  

const customHistory = createBrowserHistory();
const store = createStore(
	rootReducer,
  applyMiddleware(
    ReduxThunk.withExtraArgument({ history: customHistory }), // 떵크 미들웨어
  ), // 떵크 미들웨어
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

