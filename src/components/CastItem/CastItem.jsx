export default function CastItem({ name, character, profile_path, defaultImg }) {
    const imageURL = profile_path
      ? `https://image.tmdb.org/t/p/w200${profile_path}`
      : defaultImg;
  
  return (
    <div className="text-left">
      <img
        src={imageURL}
        alt={name}
        className="w-full max-w-full h-[200px] md:h-[180px] object-cover rounded-lg mb-2.5"
      />

      <p className="font-semibold text-white mb-1.5">
        {name}
      </p>

      <p className="italic text-[#ffb347] text-sm">
        as {character}
      </p>
    </div>
  );
}

