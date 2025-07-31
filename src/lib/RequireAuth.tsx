import { Navigate } from "react-router"
import { useUser } from "../hooks/useUser"
import { Paths } from "../constants/Paths"

/**
 * Composante wrapper pour rediriger vers la page de connexion si l'utilisateur n'est pas connecté 
 */
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()
  if (!user) {
    return <Navigate to={Paths.login} replace />
  }

  return children
}

export default RequireAuth;