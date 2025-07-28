import { BrowserRouter, Route, Routes } from "react-router"
import Share from "./containers/Share"
import AnalyticsPage from "./containers/Analytics"
import Login from "./containers/Login"
import Register from "./containers/Register"
import RequireAuth from "./lib/RequireAuth"
import { Paths } from "./types/Paths"
import Navigation from "./components/Navigation/Navigation"
import './global.scss';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path={Paths.share}
          element={
            <Share />
          }
        />
        <Route
          path={Paths.login}
          element={
            <Login />
          }
        />
        <Route
          path={Paths.register}
          element={
            <Register />
          }
        />
        <Route
          path={Paths.analytics}
          element={
            <RequireAuth>
              <AnalyticsPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
