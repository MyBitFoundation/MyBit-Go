import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'gridlex/dist/gridlex.min.css';
import './styles/index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import BlockchainProvider from './components/Blockchain';
import AirtableProvider from './components/Airtable';
import NotificationsProvider from './components/Notifications';
import MetamaskChecker from './components/MetamaskChecker/index';
import Layout from './components/Layout';

ReactDOM.render(
  <Layout>
    <BrowserRouter>
      <NotificationsProvider>
        <AirtableProvider>
          <MetamaskChecker>
            <BlockchainProvider>
              <App />
            </BlockchainProvider>
          </MetamaskChecker>
        </AirtableProvider>
      </NotificationsProvider>
    </BrowserRouter>
  </Layout>,
  document.getElementById('root'),
);
// registerServiceWorker();
