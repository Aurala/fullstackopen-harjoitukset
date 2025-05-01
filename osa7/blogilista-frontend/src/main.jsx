import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import { UserProvider } from './UserContext'

import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>
)
