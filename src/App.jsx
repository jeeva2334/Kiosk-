import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StartPage from './pages/StartPage'
import MenuPage from './pages/MenuPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/menu/view' element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
