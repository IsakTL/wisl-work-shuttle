import App from './App.jsx'
import {StrictMode} from 'react-dom/client'

createRoot(document.getElementById('root')).
render(
    <StrictMode>
    <App />
  </StrictMode>,
)

