import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx'
import Signup from './components/Signup.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <div>
  <main>
   
   <Footer/>
    
    <Outlet/>
  </main>
  
  </div>    </>
  )
}

export default App