import { useState, useEffect, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"

type Game = {
  id: number
  name: string
  background_image: string
}

const Search = () => {
  const [results, setResults] = useState<Game[]>([])
  const [searchValue, setSearchValue] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!searchValue.trim()) {
      setResults([])
      setOpen(false)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&search=${searchValue}`
        )
        if (!response.ok) throw new Error("Response not okay!")
        const data = await response.json()
        setResults(data.results)
        setOpen(true)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(fetchData, 400)
    return () => clearTimeout(debounce)
  }, [searchValue])

  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleGameClick = (id: number) => {
    setOpen(false)
    setSearchValue("")
   navigate(`/GameDetails/${id}`)
  }

  return (
   
    <div className="flex justify-center mt-10 gap-2 relative" ref={containerRef}>
      <input
        type="text"
        className="border-2 border-black w-100 py-2 rounded-3xl outline-blue-500 text-center dark:border-amber-100 text-2xl"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="bg-green-400 rounded-full font-semibold px-5 hover:bg-green-600 cursor-pointer">
        Search
      </button>

      
      {open && results.length > 0 && (
        <div className="absolute top-14 w-full bg-white dark:bg-black shadow-lg rounded-md p-3 z-50">
          {results.slice(0, 5).map((game: Game) => (
            <NavLink to={`/GameDetails/${game.id}`} key={game.id}>
            <div
              onClick={() => handleGameClick(game.id)} 
              className="flex items-center gap-3 py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md"
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-12 h-10 object-cover rounded"
              />
              <p className="text-sm font-medium">{game.name}</p>
            </div>
            </NavLink>
          )
          )}
        </div>
        
      )}

      {loading && (
        <div className="absolute top-14 text-lg text-gray-500  font-semibold ">Loading...</div>
      )}
    </div>
  )
}

export default Search