import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup'
import Login from './components/Login'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import Logpage from './page/Logpage'
import Homepage from './page/Homepage'
import Uploadpage from './page/FileUpload'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Logpage/>}></Route>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/homepage' element={<Homepage/>}></Route>
      <Route path='/upload' element={<Uploadpage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
