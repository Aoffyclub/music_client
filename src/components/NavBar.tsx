import { House, ListTree, Rss, Heart, Menu, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../images/logo_app.png";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useContext } from "react";
import { toast } from "react-hot-toast";

import { PlayerContext } from "@/Provider/PlayConext";

const NavBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleLinkClick = () => {
    setOpen(false); //
  };

  const playerContext = useContext(PlayerContext);
  if (!playerContext) {
    throw new Error("Newsong must be used within a PlayerProvider");
  }
  const { token, logOutSys } = playerContext;

  const logOut = () => {
    logOutSys();
    handleLinkClick();
    toast.success("Log out successfully!");
  };
  return (
    <div>
      {/* mobile */}
      <div className="md:hidden flex items-center justify-between h-[60px] w-full shadow-sm bg-[#070707] text-white px-3">
        <img src={Logo} alt="" className="h-[40px] w-[55px]" />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Music</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col gap-2">
                  <ul className="flex flex-col gap-2 mt-5 font-semibold">
                    <li
                      onClick={handleLinkClick}
                      className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md"
                    >
                      <House />
                      <Link
                        to="/"
                        className="hover:underline"
                        onClick={handleLinkClick}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
                      <ListTree />
                      <Link
                        to="/browse"
                        className="hover:underline"
                        onClick={handleLinkClick}
                      >
                        Browse
                      </Link>
                    </li>
                    <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
                      <Rss />
                      <Link
                        to="/newsong"
                        className="hover:underline"
                        onClick={handleLinkClick}
                      >
                        New song
                      </Link>
                    </li>
                    <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
                      <Heart />
                      <Link
                        to="/favorite"
                        className="hover:underline"
                        onClick={handleLinkClick}
                      >
                        Favorite
                      </Link>
                    </li>
                    {token ? (
                      <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
                        <LogOut />
                        <div
                          className="hover:underline cursor-pointer"
                          onClick={logOut}
                        >
                          Log Out
                        </div>
                      </li>
                    ) : (
                      <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
                        <LogIn />
                        <Link to="/login" className="hover:underline">
                          Log in
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <div className="md:flex hidden flex-col items-center w-[250px] h-[100%] shadow-sm bg-gradient-to-b from-[#070707] via-[#2c2b2b]  to-[#070707] text-white">
        <div className="w-[90%] flex flex-col gap-3 mt-5">
          <img src={Logo} alt="" className="h-[75px] w-[110px] ml-4" />
          <ul className="flex flex-col gap-4 mt-5 font-semibold">
            <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
              <House />
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
              <ListTree />
              <Link to="/browse" className="hover:underline">
                Browse
              </Link>
            </li>
            <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
              <Rss />
              <Link to="/newsong" className="hover:underline">
                New song
              </Link>
            </li>
            <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
              <Heart />
              <Link to="/favorite" className="hover:underline">
                Favorite
              </Link>
            </li>

            {token ? (
              <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
                <LogOut />
                <div
                  className="hover:underline cursor-pointer"
                  onClick={logOut}
                >
                  Log Out
                </div>
              </li>
            ) : (
              <li className="flex gap-2 hover:bg-slate-700 py-2 px-4 rounded-md">
                <LogIn />
                <Link to="/login" className="hover:underline">
                  Log in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
