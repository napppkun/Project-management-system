import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/Home'
import AppRouter from './router/AppRouter'
import AdminProjectManagement from "./components/AdminProjectManagement";
//import './App.css'

function App() { 

  return (    
    <div>
      <AppRouter /> 
    </div>           
  )
}

export default App
