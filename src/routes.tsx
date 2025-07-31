import { Route, Routes } from "react-router"
import Share from "./containers/Share"
import Dashboard from "./containers/Dashboard"
import RequireAuth from "./lib/RequireAuth"
import { Paths } from "./constants/Paths"
import GeneratedUrl from "./containers/GeneratedUrl"
import Access from "./containers/Access"
import Login from "./containers/Login"
import Register from "./containers/Register"
import RequireNoAuth from "./lib/RequireNoAuth"

/**
 * Mapping des routes 
 */
function RoutesMapping() {
  return (
    <Routes>
      <Route
        path={Paths.share}
        element={
          <>
            <title>VictoShare - Partage rapide</title>
            <Share />
          </>
        }
      />
      <Route
        path={Paths.link}
        element={
          <>
            <title>VictoShare - Lien de partage</title>
            <GeneratedUrl />
          </>
        }
      />

      <Route
        path={Paths.login}
        element={
          <RequireNoAuth>
            <title>VictoShare - Connexion</title>
            <Login />
          </RequireNoAuth>
        }
      />
      <Route
        path={Paths.register}
        element={
          <RequireNoAuth>
            <title>VictoShare - Inscription</title>
            <Register />
          </RequireNoAuth>
        }
      />
      <Route
        path={Paths.dashboard}
        element={
          <>
            <title>VictoShare - Tableau de bord</title>
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          </>
        }
      />
      <Route
        path={`${Paths.access}/:token`}
        element={
          <>
            <title>VictoShare - Récupération de la ressource</title>
            <Access />
          </>
        }
      />
    </Routes>
  )
}

export default RoutesMapping

