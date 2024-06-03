
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footerr from './components/Footerr'
function App() {
  return (
    <>
      <Navbar/>
      <div className='min-h-screen'>
      <Outlet/>
      </div>
      <Footerr/>
    </>
  )
}

export default App
