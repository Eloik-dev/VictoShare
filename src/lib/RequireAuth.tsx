import { Navigate } from "react-router"
import { useUser } from "../hooks/useUser"
import { Paths } from "../types/Paths"

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const user = useUser()
  if (!user) {
    return <Navigate to={Paths.login} replace />
  }

  return children
}

export default RequireAuth;