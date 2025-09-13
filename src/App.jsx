import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Chat from './pages/chat.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path='/chat' element={
          <ProtectedRoutes>
            <Chat />
          </ProtectedRoutes>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
