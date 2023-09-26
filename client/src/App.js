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
import Login from './pages/Login/Login';
import DashBoard from './pages/DashBoard/Dashboard';
import Signup from './pages/SignUp/SignUp';
import Forms from './pages/ActiveForm/Forms';
import CreateForm from './pages/CreatingForm/CreateForm';
import SubmissionForm from './pages/SubmissionForm/SubmissionForm';
import { AuthProvider } from './utils/AuthContext/AuthContext';
import SpecificForm from './components/SpecificForm';
import Rules from './pages/Rules/Rules';

//httpLink: Creating an HTTP link to the GraphQL server endpoint (/graphql).
const httpLink = createHttpLink({
  uri: '/graphql',
});
// /authLink: Creating an authentication link using the token stored
// in localStorage to include the token in the request headers.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//client: Creating an Apollo client instance
// with the configured authentication link and an in-memory cache.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    //ApolloProvider provides the Apollo client instance to the whole app
    //Second is the Router from React-dom that lets me route my pages accordingly
    //Thirdly, wrapping the application with the AuthProvider to provide authentication context to the app and its children.
    // Each Route is associated with a path and a corresponding component to be rendered when the path matches.
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <div>
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/rules" element={<Rules />} />
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
