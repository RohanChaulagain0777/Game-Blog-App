
import { useParams, useNavigate } from "react-router-dom";
import { useQuery} from "@tanstack/react-query";

type GameDetailsType = {
  id: number;
  name: string;
  background_image: string;
  description_raw: string;
  rating: number;
  released: string;
};

const fetchGameDetails = async (id: string): Promise<GameDetailsType> => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game details");
  }

  return response.json();
};

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["gameDetails", id],
    queryFn: () => fetchGameDetails(id!),
    enabled: !!id,
  });

  const addToSavedGames = () => {
    if (!data) return;

    const savedGames: GameDetailsType[] = JSON.parse(
      localStorage.getItem("savedGames") || "[]"
    );

    const gameToSave: GameDetailsType = {
      id: data.id,
      name: data.name,
      background_image: data.background_image,
      description_raw: data.description_raw,
      rating: data.rating,
      released: data.released,
    };

    const existGame = savedGames.some((game) => game.id === gameToSave.id);

    if (existGame) {
      navigate("/SavedGame");
      return;
    }

    const updatedGames = [...savedGames, gameToSave];

    localStorage.setItem("savedGames", JSON.stringify(updatedGames));

    navigate("/SavedGame");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading game</p>;

  return (
    <div className="flex flex-col gap-6 p-10">
      <h1 className="text-4xl font-bold text-center p-2">{data?.name}</h1>

      <div className="flex gap-12">
        <img
          src={data?.background_image}
          alt={data?.name}
          className="w-100 h-100 rounded-2xl"
        />

        <div className="flex flex-col gap-4 py-5">
          <p className="text-gray-600">{data?.released}</p>
          <span className="font-semibold text-lg">⭐ Rating: {data?.rating}</span>
          <p className="text-gray-600">{data?.description_raw}</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-12">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer"
          onClick={addToSavedGames}
        >
          save game
        </button>
      </div>
    </div>
  );
};

export default GameDetails;