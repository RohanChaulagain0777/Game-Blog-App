import { Api_key } from "@/Api"
import { useState, useEffect } from "react"
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

type Game = {
  id: number;
  name: string;
  rating: number;
  background_image: string;
  reviews_count: number;
  description_raw: string;
};

const fetchIndieGames = async (page: number)=>{
  const response = await fetch(`https://api.rawg.io/api/games?key=${Api_key}&genres=indie&page=${page}&page_size=20`);

  if(!response.ok){
    throw new Error("Failed to fetch indie Games");
  }

  return response.json();
}


const BestIndies = () => {

  
  const [page, setPage] = useState(1);

  const {data, isLoading, error}= useQuery({
    queryKey: ["indieGames", page],
    queryFn: () => fetchIndieGames(page),
    keepPreviousData: true,
  })
  
  const games = data?.results ?? [];

  return (
     <div className="flex justify-center items-center gap-2 flex-col">
      <h1 className="font-extrabold text-5xl text-center my-10">INDIES GAMES</h1>

      {
        isLoading ? (
          <div className="w-full px-4 md:px-8 mt-6 bg-gray-500">
            <Skeleton className="w-full h-[70vh] md:h-[80vh] rounded-3xl"/>
          </div>
        ):
         <div className="w-full px-4 md:px-8 mt-6 ">
                    <Swiper
                      modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
                      spaceBetween={20}
                      slidesPerView={1}
                      navigation
                      autoplay={{ delay: 3000 }}
                      className="rounded-3xl overflow-hidden shadow-2xl mb-10"
                    >
                      {games.slice(0, 9).map((game: Game) => (
                        <SwiperSlide key={game.id}>
                          <div className="relative group h-[70vh] md:h-[80vh] w-full">
                            <img
                              src={game.background_image}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
            
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
            
                            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-white">
                              <h1 className="text-2xl md:text-4xl font-extrabold leading-tight mb-6">
                                {game.name}
                              </h1>
                              <p className="uppercase tracking-widest text-sm md:text-base text-gray-300">
                                {game.description_raw
                                  ? game.description_raw.slice(0, 150) + "..."
                                  : "No description available."}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
      }
     

                  <p className="font-bold text-3xl">Popular Titles</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mx-5">
        
         {games.slice(9, 18).map((game: Game) => (
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

      <div className="flex gap-4 my-12">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-6 py-2 bg-gray-800 text-white rounded-xl disabled:opacity-50"
          >
          Previous
        </button>
        <span className="px-6 py-2 text-lg font-bold">page: {page}</span>

        <button onClick={() => setPage((prev) => Math.max(prev + 1 , 1))}
          className="px-6 py-2 bg-gray-800 text-white rounded-xl"
          >
          Next
        </button>
      </div>
     
    </div>
  )
}

export default BestIndies 
