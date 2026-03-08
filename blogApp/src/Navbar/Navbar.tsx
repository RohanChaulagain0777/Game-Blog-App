import { ModeToggle } from "@/components/mode-toggle";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { Api_key } from "@/Api";
import { Store } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.rawg.io/api/games?key=${Api_key}&search=${search}`
        );

        if (!response.ok) throw new Error("Response not okay!");

        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-50 flex justify-between items-center m-10">
      <img
        src="/src/assets/Gemini_Generated_Image_42xe4d42xe4d42xe-removebg-preview.png"
        className="w-30"
      />

      <div className="flex justify-around items-center gap-12 font-semibold">
        <NavLink
        to="/"
        className={({ isActive }) =>`relative font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-black dark:after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? "after:scale-x-100" : "" }`}>
       Home
      </NavLink>
        <NavLink
        to="/reviews"
        className={({ isActive }) =>`relative font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-black dark:after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? "after:scale-x-100" : "" }`}>
       Reviews
      </NavLink>
        <NavLink
        to="/about"
        className={({ isActive }) =>`relative font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-black dark:after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? "after:scale-x-100" : "" }`}>
       About
      </NavLink>

        <div className="relative">
          {!isOpen && (
            <Search
              size={20}
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}

          {isOpen && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                className="pl-3 pr-10 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                onBlur={() => setIsOpen(false)}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Search
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />


              {results.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-black shadow-lg rounded-md p-3 z-50">
                  {results.slice(0, 5).map((game) => (
                    <div
                      key={game.id}
                      className="py-1 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      {game.name}
                    </div>
                  ))}
                </div>
              )}

              {loading && (
                <div className="absolute top-full left-0 mt-2 text-sm">
                  Loading...
                </div>
              )}
            </div>
          )}
        </div>

        <ModeToggle />
         <NavLink to={"/SavedGame"} ><Store size={20}/></NavLink>
      </div>
    </nav>
  );
};

export default Navbar;