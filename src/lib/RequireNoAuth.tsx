import { Navigate } from "react-router"
import { useUser } from "../hooks/useUser"
import { Paths } from "../constants/Paths"

/**
 * Composante wrapper pour rediriger vers le tableau de bord si l'utilisateur est connecté
 * Utile pour les pages de connexion et d'inscription
 */
const RequireNoAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()
  if (user) {
    return <Navigate to={Paths.dashboard} replace />
  }

  return children
}

export default RequireNoAuth;