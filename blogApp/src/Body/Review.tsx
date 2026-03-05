import { Api_key } from "@/Api";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Game = {
  id: number;
  name: string;
  reviews_count: number;
  reviews_text_count: number;
  rating: number;
  background_image: string;
};

const Review = () => {
  const [review, setReview] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${Api_key}&page=${page}&page_size=20`
        );

        if (!response.ok) throw new Error("Response not OK");

        const data = await response.json();
        setReview(data.results);
        console.log(data.results[0]);
      } catch (error) {
        console.error("Error fetching review data", error);
      }finally{
        setLoading(false);
      }
    };

    fetchReview();
  }, [page]);

  return (
    <div className="min-h-screen px-6 py-12">
      
      
      <div className="text-center mb-12">
        <h1 className="font-extrabold text-4xl md:text-5xl tracking-wide">
          Game Reviews
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Discover games ranked by community engagement
        </p>
      </div>

      {
        loading ?  (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {Array.from({length: 10}).map((_, index) =>(
              <Skeleton  key={index} className="w-full rounded-2xl h-32 bg-gray-500" />
            ))}
          </div>
        ):
        (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {review.slice(0, 10).map((item) => (
          <div
            key={item.id}
            className="bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-5 flex items-start gap-6 hover:scale-[1.02]"
          >
           
            <img
              src={item.background_image}
              alt={item.name}
              className="w-28 h-20 object-cover rounded-xl shadow-md"
            />

            
            <div className="flex flex-col justify-between">
              <h2 className="font-bold text-xl md:text-2xl mb-2">
                {item.name}
              </h2>

              <div className="text-sm md:text-base text-gray-300 space-y-1">
                <p>
                  <span className="font-semibold text-white">
                    Reviews Count:
                  </span>{" "}
                  {item.reviews_count}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Reviews Text Count:
                  </span>{" "}
                  {item.reviews_text_count}
                </p>

                <p className="text-yellow-400 font-semibold">
                  ⭐ {item.rating}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
        )
      }
      
    

      
      <div className="flex justify-center items-center gap-6 mt-16">
         <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-6 py-2 bg-gray-800 text-white rounded-xl disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-6 py-2 text-lg font-bold">
          Page {page}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-6 py-2 bg-gray-800 text-white rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Review;