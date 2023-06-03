/* eslint-disable import/no-unresolved */
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './style/GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <App />
  </QueryClientProvider>
);
