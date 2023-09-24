import logo from './logo.svg';
import './App.css';
import './maincss/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

//Need to import my Pages
import Login from './pages/Login';
import DashBoard from './pages/Dashboard';
import Signup from './pages/SignUp';
import Forms from './pages/Forms';
import CreateForm from './pages/CreateForm';
import SubmissionForm from './pages/SubmissionForm';
import { AuthProvider } from './utils/AuthContext';
import SpecificForm from './pages/SpecificForm';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <div>
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Forms" element={<Forms />} />
              <Route path="/CreateForm" element={<CreateForm />} />
              <Route path="/forms/:formId" element={<SubmissionForm />} />
              <Route
                path="/forms/SpecificForm/:formId"
                element={<SpecificForm />}
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
