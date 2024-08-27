import { House, ListTree, Rss ,Heart} from "lucide-react"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="flex flex-col items-center w-[250px] shadow-sm bg-gradient-to-b from-[#070707] via-[#2c2b2b]  to-[#070707] text-white">
      <div className="w-[90%] flex flex-col gap-3 mt-5">
        <h1 className="font-bold text-2xl">Music</h1>
        <ul className="flex flex-col gap-4 mt-5 font-semibold">
          <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
            <House />
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
            <ListTree />
            <Link to="/browse" className="hover:underline">Browse</Link>
          </li>
          <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
            <Rss />
            <Link to="/newsong" className="hover:underline">New song</Link>
          </li>
          <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
            <Heart />
            <Link to="/favorite" className="hover:underline">Favorite</Link>
          </li>

         

     
        </ul>

      </div>
     

        
    </div>
  )
}

export default NavBar