import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

export default function RandomMovieButtonFromList({ movies = [] }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function goRandom() {
    if (!movies.length) {
      alert("No movies available"); // to be substituted with toast notification later
      return;
    }
    setLoading(true);
    const idx = Math.floor(Math.random() * movies.length);
    const id = movies[idx].id ?? movies[idx].movieId ?? null;
    setLoading(false);
    if (!id) {
      alert("Movie has no id"); // to be substituted with toast notification later
      return;
    }
    navigate(`/movies/${id}`);
  }
    return (<button
    onClick={goRandom}
    disabled={loading}
    aria-label="Random movie"
    title="Random movie"
    className="
      group inline-flex items-center gap-2 px-2 py-1 rounded-md
      bg-transparent text-[#f3f4f6] 
      transition-all duration-200 ease-in-out
    "
  ><span className="sr-only md:not-sr-only md:inline text-[#e5e7eb] text-[16px] transition-colors duration-300 hover:text-[#ffb347]">Random movie</span>
    <GiPerspectiveDiceSixFacesRandom
      className="
        w-8 h-8
        transition-transform duration-300 ease-in-out
        group-hover:rotate-12
        group-hover:scale-125
        group-hover:text-[#ffb347]
      "
    />
    
  </button>)
}
