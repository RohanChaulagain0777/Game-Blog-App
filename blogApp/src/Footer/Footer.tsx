import { NavLink } from "react-router-dom"

const Footer = () => {
  return (
     <div className="flex justify-center items-center flex-col gap-10 mt-5 p-2 text-white bg-gray-900">
            <div className="flex gap-12 font-semibold"> 
              <NavLink to="/" className="hover:text-green-500">Home</NavLink>
              <p>.</p>
              <NavLink to="/about" className="hover:text-green-500">About</NavLink>
              <p>.</p>
              <NavLink to="/reviews" className="hover:text-green-500">Review</NavLink>
            </div>
            <p className="text-sm font-semibold">&copy; {new Date().getFullYear()} indizGamez</p>
        </div>     
  )
}

export default Footer
