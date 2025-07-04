import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Register from './components/Register.jsx';
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
  },
  {
    path: "register",
    element: <Register/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>,
)
