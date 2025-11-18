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

  return (
    <button
      onClick={goRandom}
      disabled={loading}
      aria-label="Random movie"
      className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-[#e5e7eb] hover:text-[#ffb347] transition"
    >
      < GiPerspectiveDiceSixFacesRandom  className="w-7 h-7" />
      <span className="sr-only">Random movie</span>
    </button>
  );
}
