import { ModeToggle } from "@/components/mode-toggle";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Store } from "lucide-react";
import Logo from "@/assets/Gemini_Generated_Image_42xe4d42xe4d42xe-removebg-preview.png"

const Navbar = () => {


  const navigate = useNavigate();



  const searching = () => {
    navigate("/search");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-50 flex justify-between items-center m-10">
      <img
        src={Logo}
        className="w-30"
      />

      <div className="flex justify-around items-center gap-12 font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-black dark:after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? "after:scale-x-100" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            `relative font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-black dark:after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? "after:scale-x-100" : ""}`
          }
        >
          Reviews
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-black dark:after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? "after:scale-x-100" : ""}`
          }
        >
          About
        </NavLink>

        
        <div className="relative">

          <NavLink to="/search">
            <Search
            size={20}
            className="cursor-pointer"
            onClick={searching}
            />

          </NavLink>

          
        </div>

        <ModeToggle />
        <NavLink to={"/SavedGame"}>
          <Store size={20} />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;