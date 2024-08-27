import NavBar from "../components/NavBar"
import Player from "@/components/Player"
import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"

const Layout = () => {
  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex h-[calc(100vh-80px)]">
        <NavBar />
        <Outlet />
        <Toaster position="bottom-right" />
      </div>

      <Player />
    </div>
  );
}

export default Layout