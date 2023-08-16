import App from './App'
import Erreur from './pages/Erreur'
import Accueil, { loadData as homeloader } from './pages/Accueil'
import Article, { loadData as articleloader } from './pages/Article'
import Panier, { loadData as panierloader } from './pages/Panier'
import ArticleCategorie, { loadData as articleCategorieloader } from './pages/ArticleCategorie'
import Admin, { loadData as adminloader }from './pages/Admin'
import { createBrowserRouter } from 'react-router-dom'
import SuiviCommande from './pages/SuiviCommande'
import MonCompte, { loadData as compteloader } from './pages/MonCompte'
import Retour from './pages/Retour'
import CGV from './pages/CGV'
import Credit from './pages/Crédit'
import MentionsLegales from './pages/MentionsLegales'
import Contact from './pages/Contact'
import Commande, { loadData as commandeloader } from './pages/Commande'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Accueil />,
                loader: homeloader
            }, {
                path: 'article/:categorie',
                element: <ArticleCategorie />,
                loader: articleCategorieloader
            },
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
                path: 'commande',
                element: <Commande />,
                loader: commandeloader
            },
            {
                path: 'admin',
                element: <Admin />,
                loader: adminloader
            },
            {
                path: 'moncompte',
                element: <MonCompte />,
                loader: compteloader
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