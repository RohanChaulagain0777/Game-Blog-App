import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Categories } from "@/collection/Categories";
import { useState,useEffect} from "react";
import AOS from "aos";
import { useQuery } from "@tanstack/react-query";
import Contact from "./Contact";
const Api_key = import.meta.env.VITE_API_KEY;



type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  reviews_count: number;
}


const fetchGames = async () =>{
  const response = await fetch(`https://api.rawg.io/api/games?key=${Api_key}`);

  if(!response.ok){
    throw new Error("failedto fetch games");
  }

  return response.json();
}

const Home = () => {

  const {data, isLoading, error} = useQuery({
    queryKey:['games'],
    queryFn: fetchGames,
  })
  
  useEffect(() => {
    AOS.init({
      duration: 1500, // default duration
      once: true,     // animation happens only once
      easing: "ease-in-out",
    });
  }, []);

  if(error){
    return(
     <p className="text-center text-3xl font-bold text-red-700">Error Fetching Data...</p>
    )
  }

  if(isLoading){
    return(
       <p className="text-center text-3xl font-bold">Loading...</p>
    )
  }


  const filtered = data.results.filter((game: Game) => game.reviews_count > 500);

  return (
    <div className="w-full px-4 md:px-8 mt-6 ">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000 }}
        className="rounded-3xl overflow-hidden shadow-2xl mb-10"
      >
        {Categories.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative group h-[70vh] md:h-[80vh] w-full">
              <img
                src={item.img}
                alt={`${item.name} category`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-white">
                <p className="uppercase tracking-widest text-sm md:text-base text-gray-300">
                  Top 10 Best
                </p>

                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                  {item.name.toUpperCase()} GAMES
                </h1>

                <NavLink
                  to={`/${item.name}`}
                  aria-label={`Explore ${item.name}`}
                  className="w-fit bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Explore {item.name}
                </NavLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center my-10 h-[100vh]" data-aos="fade-up"
  data-aos-duration="1500" >
        <h1 className="text-4xl font-bold mb-5">Featured Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {filtered.slice(0, 6).map((game: Game) => (
          <div
            key={game.id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={game.background_image}
              alt={game.name}
              className="h-48 w-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="p-4 text-white">
              <span className="text-yellow-400 font-semibold">
                ⭐ {game.rating}
              </span>
              <h2 className="text-lg font-bold mt-2">{game.name}</h2>
            </div>
          </div>
        ))}
      </div>
       </div>
       <Contact />
    </div>
  );
};

export default Home;