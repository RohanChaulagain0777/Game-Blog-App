import { NavLink } from "react-router-dom"

const Footer = () => {
  return (
     <div className="flex justify-center items-center flex-col gap-10 mt-5 p-2 text-white bg-gray-900">
            <div className="flex gap-12 font-semibold"> 
              <NavLink to="/" >Home</NavLink>
              <p>.</p>
              <NavLink to="/about">About</NavLink>
              <p>.</p>
              <NavLink to="/review">Review</NavLink>
            </div>
            <p className="text-sm font-semibold">&copy; {new Date().getFullYear()} indizGamez</p>
        </div>     
  )
}

export default Footer
