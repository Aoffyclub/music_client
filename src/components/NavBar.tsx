import { House, ListTree, Rss, Heart, Menu } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleLinkClick = () => {
    setOpen(false); //
  };
  return (
    <div>
      {/* mobile */}
      {/* mobile */}
      <div className="md:hidden flex items-center justify-end h-[60px] w-full shadow-sm bg-[#070707] text-white px-3">
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
          <h1 className="font-bold text-2xl">Music</h1>
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
