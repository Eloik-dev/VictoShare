import { BrowserRouter } from "react-router"
import Navigation from "./components/Navigation/Navigation"
import './global.scss';
import { ResourceProvider } from "./contexts/resourceContext"
import { Bounce, ToastContainer } from "react-toastify"
import RoutesMapping from "./routes"

function App() {
  return (
    <ResourceProvider>
      <BrowserRouter>
        <Navigation />
        <RoutesMapping />
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </ResourceProvider>
  )
}

export default App

