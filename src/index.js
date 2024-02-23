import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider} from './Hook/Auth';
import { FormProvider } from './Hook/FormData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FormProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </FormProvider>
    </BrowserRouter>
  </React.StrictMode>
);
