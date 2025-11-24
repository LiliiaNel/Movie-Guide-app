import css from './CastItem.module.css'; 

export default function CastItem({ name, character, profile_path, defaultImg }) {
    const imageURL = profile_path
      ? `https://image.tmdb.org/t/p/w200${profile_path}`
      : defaultImg;
  
    return (
      <div>
        <img src={imageURL} alt={name} className={css.castImg} />
        <p className={css.castName}>{name}</p>
        <p className={css.castCharacter}>as {character}</p>
      </div>
    );
  }

