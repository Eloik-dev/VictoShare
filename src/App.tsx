import { BrowserRouter } from "react-router"
import Navigation from "@/components/Navigation"
import { ToastContainer } from "react-toastify"
import RoutesMapping from "@/routes"
import { UserProvider } from "@/contexts/UserContext";
import { Box } from "@mui/material";
import '@/global.scss';
import { ResourceProvider } from "./contexts/ResourceContext";

/**
 * Point d'entrée de l'application 
 */
function App() {
  return (
    <UserProvider>
      <ResourceProvider>
        <BrowserRouter>
          <Box display="flex" flexDirection="column" height="100vh">
            <Navigation />
            <RoutesMapping />
          </Box>
        </BrowserRouter>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ResourceProvider>
    </UserProvider >
  )
}

export default App