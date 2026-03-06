import Navbar from "./Navbar/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Body/Home";
import About from "./Body/About";
import Review from "./Body/Review";
import "aos/dist/aos.css";
import { useState,useEffect } from "react";
import { MoveUpIcon } from "lucide-react";
import Contact from "./Body/Contact";
import Footer from "./Footer/Footer";
import Horror from "./page/Horror";
import Action from "./page/Action";
import Sci_fi from "./page/Sci-Fi";
import BestIndies  from "./page/BestIndies";

function App() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
  const toggleVisibility = () =>{

    if(window.pageYOffset > 300){
      setIsVisible(true)
    }else{
      setIsVisible(false)
    }
  }

  window.addEventListener("scroll",toggleVisibility)
  },[])

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <BrowserRouter >
      <Navbar />
      <Routes>
        <Route path="/" element={<><Home/> <Contact /></>} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/Horror" element={<Horror />} />
        <Route path="/Action" element={<Action />} />
        <Route path="/Sci-Fi" element={<Sci_fi />} />
        <Route path="/BestIndies" element={<BestIndies />} />
      </Routes>
      {isVisible && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-red-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"><MoveUpIcon size={20}/></button>
      )}
      <Footer />
    </BrowserRouter>
      )
}

export default App