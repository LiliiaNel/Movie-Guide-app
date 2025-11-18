// import css from './CastItem.module.css'; 

// export default function CastItem({ name, character, profile_path, defaultImg }) {
//     const imageURL = profile_path
//       ? `https://image.tmdb.org/t/p/w200${profile_path}`
//       : defaultImg;
  
//     return (
//       <div>
//         <img src={imageURL} alt={name} className={css.castImg} />
//         <p className={css.castName}>{name}</p>
//         <p className={css.castCharacter}>as {character}</p>
//       </div>
//     );
//   }

import Hover3D from "../primitives/Hover3D";

export default function CastItem({ name, character, profile_path, defaultImg }) {
  const imageURL = profile_path
    ? `https://image.tmdb.org/t/p/w200${profile_path}`
    : defaultImg;

  return (
    <Hover3D className="inline-block">
      <figure className="w-[200px]"> 
        <div className="w-full h-[200px] overflow-hidden rounded-lg">
          <img src={imageURL} alt={name} className="w-full h-full object-cover" />
        </div>
      </figure>

      <div className="mt-3 px-1">
        <p className="text-white font-bold mb-1 truncate" title={name}>
          {name}
        </p>
        <p className="italic text-[#ffb347] text-sm truncate" title={character}>
          as {character}
        </p>
      </div>
    </Hover3D>
  );
}
