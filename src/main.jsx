import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import Loading from './components/Loading.jsx'

// Create a simple loading component


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
)