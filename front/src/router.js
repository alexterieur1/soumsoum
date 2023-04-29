import App from './App'
import Erreur from './pages/Erreur'
import Accueil from './pages/Accueil'
import Article from './pages/Article'
import Panier from './pages/Panier'
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
                path: '/article',
                element: <Article/>
            },
            {
                path: '/panier',
                element: <Panier/>
            },
            {
                path: '*',
                element: <Erreur/>
            },
        ]
    }
])

export default router