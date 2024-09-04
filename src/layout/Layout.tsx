import NavBar from "../components/NavBar"
import Player from "@/components/Player"
import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"

const Layout = () => {
  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex md:flex-row flex-col h-[calc(100vh-80px)]">
        <NavBar />
        <Outlet />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              backgroundColor: "#2A2929",
              color: "#fff",
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      <Player />
    </div>
  );
}

export default Layout