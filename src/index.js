import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store'
import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
let renderAll = (state) => {   

    root.render(
        // <React.StrictMode>
        <Provider store={store}>
            <App store={store} />
        </Provider>
        // </React.StrictMode>
    );
}


renderAll(store.getState());

reportWebVitals();


