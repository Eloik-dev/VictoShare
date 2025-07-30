import { Navigate } from "react-router"
import { useUser } from "../hooks/useUser"
import { Paths } from "../constants/Paths"

const RequireNoAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()
  if (user) {
    return <Navigate to={Paths.dashboard} replace />
  }

  return children
}

export default RequireNoAuth;