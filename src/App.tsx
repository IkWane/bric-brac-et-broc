import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'

function App() {

  return (
    <>
        <Header/>
        <Routes>
            <Route index path='/' element={<Home />}/>
        </Routes>
        <Footer/>
    </>
  )
}

export default App
