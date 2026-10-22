import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import ProductPage from './pages/ProductPage/ProductPage'

function App() {

  return (
    <>
        <Header/>
        <Routes>
            <Route index path='/' element={<Home />}/>
            <Route path='/product/:id' element= {<ProductPage />}/>
        </Routes>
        <Footer/>
    </>
  )
}

export default App
