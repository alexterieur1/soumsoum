import App from './App'
import Erreur from './pages/Erreur'
import Accueil from './pages/Accueil'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {
                path: '/',
                element: <Accueil/>
            },
            {
                path: '*',
                element: <Erreur/>
            },
        ]
    }
])

export default router