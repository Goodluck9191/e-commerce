
import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'

export default function App() {
  return (
    <div>
      <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
      </nav>
      <Routes>
      <Route path='/' element={< HomePage/>} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<h1>404 not Found</h1>}/>
      </Routes>

      <div>
        Footer
      </div>
      
    </div>

  )
}
