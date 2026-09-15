import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import Form1 from './forms/Form1.jsx'
import Form2 from './forms/Form2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Form2></Form2>
    </BrowserRouter>



  </StrictMode>,
)
