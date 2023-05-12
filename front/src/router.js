import App from './App'
import Erreur from './pages/Erreur'
import Accueil, { loadData as homeloader } from './pages/Accueil'
import Article, { loadData as articleloader }  from './pages/Article'
import Panier from './pages/Panier'
import Admin from './pages/Admin'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Accueil />,
                loader: homeloader
            },
            {
                path: 'article/:id',
                element: <Article />,
                loader: articleloader
            },
            {
                path: 'panier',
                element: <Panier />
            },
            {
                path: 'admin',
                element: <Admin />
            },
            {
                path: '*',
                element: <Erreur />
            },
        ]
    }
])

export default router