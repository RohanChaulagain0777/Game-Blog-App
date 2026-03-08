import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "./Body/Home";
import { useState, useEffect } from "react";
import { MoveUpIcon } from "lucide-react";
import Footer from "./Footer/Footer";
import { Skeleton } from "./components/ui/skeleton";

const About = lazy(() => import("./Body/About"));
const Review = lazy(() => import("./Body/Review"));
const Horror = lazy(() => import("./page/Horror"));
const Action = lazy(() => import("./page/Action"));
const Sci_fi = lazy(() => import("./page/Sci-Fi"));
const BestIndies = lazy(() => import("./page/BestIndies"));
const SavedGame = lazy(() => import("./page/SavedGame"));
const GameDetails = lazy(() => import("./page/GameDetails"));

function AppContent() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isGameDetail =
    location.pathname.startsWith("/GameDetails") ||
    location.pathname.startsWith("/SavedGame");

  return (
    <>
      <Navbar />

      <Suspense
        fallback={
          <div className="p-10">
            <Skeleton className="h-[300px] w-full mb-6" />
            <Skeleton className="h-8 w-[250px] mb-4" />
            <Skeleton className="h-6 w-[400px]" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/Horror" element={<Horror />} />
          <Route path="/Action" element={<Action />} />
          <Route path="/Sci-Fi" element={<Sci_fi />} />
          <Route path="/BestIndies" element={<BestIndies />} />
          <Route path="/SavedGame" element={<SavedGame />} />
          <Route path="/GameDetails/:id" element={<GameDetails />} />
        </Routes>
      </Suspense>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-red-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <MoveUpIcon size={20} />
        </button>
      )}

      {!isGameDetail && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;