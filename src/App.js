import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Mid from './components/Mid';
import { createContext, useReducer } from 'react';
import { initialState, reducer, userTypeReducer } from './reducer/UseReducer';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import './utility/footer.css';
import './utility/cards.css';
import './utility/formInput.css';
import './utility/header.css';
import './utility/scrollbar.css';
import './utility/table.css';
import './utility/updateForm.css';

export const UserContext = createContext();
export const UserTypeContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState.isAuthenticated);
  const [state2, dispatch2] = useReducer(userTypeReducer, initialState.user_type);
  return (
    <div className="App">
      <UserContext.Provider value={{state, dispatch}}>
        <UserTypeContext.Provider value={{state2, dispatch2}}>
          <BrowserRouter>
            <Header/>
            <ToastContainer/>
            <Mid/>
            <Footer/>
          </BrowserRouter>
        </UserTypeContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
