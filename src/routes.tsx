import { Route, Routes } from "react-router"
import Share from "./containers/Share"
import DashboardPage from "./containers/Dashboard"
import Login from "./containers/Login"
import Register from "./containers/Register"
import RequireAuth from "./lib/RequireAuth"
import { Paths } from "./constants/Paths"
import GeneratedUrl from "./containers/GeneratedUrl"
import Access from "./containers/Access"

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
          <>
            <title>VictoShare - Connexion</title>
            <Login />
          </>
        }
      />
      <Route
        path={Paths.register}
        element={
          <>
            <title>VictoShare - Inscription</title>
            <Register />
          </>
        }
      />
      <Route
        path={Paths.dashboard}
        element={
          <>
            <title>VictoShare - Analytiques</title>
            <RequireAuth>
              <DashboardPage />
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

