import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ProductsProvider } from './context/products_context';
import { store } from './reducers/configStore';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
// dev-awngkz3pcew3oryt.us.auth0.com
// 0OPprJ1qo48By3FW1bJEkl33ZOmw9M3B
ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
        domain="dev-awngkz3pcew3oryt.us.auth0.com"
        clientId="0OPprJ1qo48By3FW1bJEkl33ZOmw9M3B"
        cacheLocation='localstorage'
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>
);
