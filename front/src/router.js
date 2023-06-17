import App from './App'
import Erreur from './pages/Erreur'
import Accueil, { loadData as homeloader } from './pages/Accueil'
import Article, { loadData as articleloader } from './pages/Article'
import Panier, { loadData as panierloader } from './pages/Panier'
import ArticleCategorie, {loadData as articleCategorieloader} from './pages/ArticleCategorie'
import Admin from './pages/Admin'
import { createBrowserRouter } from 'react-router-dom'
import SuiviCommande from './pages/SuiviCommande'
import MonCompte from './pages/MonCompte'
import Retour from './pages/Retour'
import CGV from './pages/CGV'
import Credit from './pages/Crédit'
import MentionsLegales from './pages/MentionsLegales'
import Contact from './pages/Contact'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Accueil />,
                loader: homeloader
            },/* 
            {
                path: 'article/',
                children: [
                    {
                        path: 'hauts/',
                        element: <ArticleCategorie />
                    },
                    {
                        path: 'bas/',
                        element: <ArticleCategorie />
                    },
                    {
                        path: 'ensembles',
                        element: <ArticleCategorie />,
                        loader: articleCategorieloader,
                        children: [
                            {
                                path: ':id',
                                element: <Article />,
                                loader: articleloader
                            }
                        ]
                    },
                    {
                        path: 'accesoires/',
                        element: <ArticleCategorie />
                    },
                    {
                        path: 'baskets/',
                        element: <ArticleCategorie />
                    },
                    {
                        path: 'sandales/',
                        element: <ArticleCategorie />
                    }
                ]
            }, */
            {
                path: 'article/:ensembles/:id',
                element: <Article />,
                loader: articleloader
            },
            {
                path: 'panier',
                element: <Panier />,
                loader: panierloader
            },
            {
                path: 'admin',
                element: <Admin />
            },
            {
                path: 'moncompte',
                element: <MonCompte />
            },
            {
                path: 'suividecommande',
                element: <SuiviCommande />
            },
            {
                path: 'retour',
                element: <Retour />
            },
            {
                path: 'CGV',
                element: <CGV />
            },
            {
                path: 'credit',
                element: <Credit />
            },
            {
                path: 'mentionslegales',
                element: <MentionsLegales />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: '*',
                element: <Erreur />
            },
        ]
    }
])

export default router