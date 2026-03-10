
const About = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 max-w-4xl mx-auto px-4 md:px-8 mt-6">
      <h1 className="font-bold text-3xl">Why The Indiz Gamez Exists?</h1>
      <p className="font-semibold text-lg">The Indiz Gamez is dedicated to found <span className="font-bold text-red-500">hidden games</span> in the gaming world. Our main Objective is Gamers <span className="font-bold text-green-500">Satisfaction</span>.</p>
      <div className="flex gap-10 my-10 md:flex-row">
        <div className="border border-gray-900 w-100 h-50 p-2 rounded-2xl ">
          <h3 className="text-center mb-2 font-semibold text-lg">🎮 How we choose Games.</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Fewer than 500 Review Counts</li>
            <li>Free and affordable games</li>
            <li>Short, unique and experimental games</li>
          </ul>
        </div>

        <div className="border border-gray-900 w-100 rounded-2xl p-2">
          <h3 className="text-center mb-2 font-semibold text-lg">🎯 What will you find here.</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Games that is overlooked.</li>
            <li>Small and individual creator games.</li>
            <li>Recommendation based on your gaming prefrence</li>
          </ul>
        </div>

        <div className="border border-gray-900 w-100 rounded-2xl p-2">
          <h3 className="text-center mb-2 font-semibold text-lg">🧑‍💻 Who we are.</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Passionate developer and indies enthusiasts</li>
            <li>Our goal is to make sure every one can enjoy playing games.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
