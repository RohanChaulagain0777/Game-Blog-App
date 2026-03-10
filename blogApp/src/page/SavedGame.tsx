import { X } from "lucide-react";
import { useState, useEffect } from "react";

type Game = {
  id: number;
  name: string;
  background_image: string;
};

const SavedGame = () => {
  const [savedGame, setSavedGame] = useState<Game[]>([]);

  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem("savedGames") || "[]");
    setSavedGame(storedGames);
  }, []);

  const deleteGame = (id: number) => {
    const updatedGame = savedGame.filter((game) => game.id !== id);

    setSavedGame(updatedGame);
    localStorage.setItem("savedGames", JSON.stringify(updatedGame));
  };

  if (savedGame.length === 0) {
    return (
      <p className="text-center mt-20 font-bold text-2xl text-gray-500">
        No Saved Games Available...
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Saved Games</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedGame.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 text-black"
          >
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-40 object-cover"
            />

            <div className="flex items-center justify-between p-4">
              <h2 className="font-semibold text-lg">{game.name}</h2>

              <button
                onClick={() => deleteGame(game.id)}
                className="text-red-500 hover:text-red-700 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedGame;