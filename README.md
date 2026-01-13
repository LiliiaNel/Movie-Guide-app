**Movie Guide** is a small personal project created for practice and for my frontend portfolio.

It's a simple web app for browsing and exploring movies, focused on clean layout, responsive design, and comfortable navigation.

The app allows you to browse titles, open movie details, and use a **Random Movie** button to discover something new.
All movie data is powered by the **TMDB (The Movie Database) API**.

---

## ✨ Features

- Browse and explore trending movies from TMDB 
- Search movies using the built-in search input  
- View detailed information for each movie including cast and reviews  
- A button to discover a random movie
- Fully responsive (mobile / tablet / desktop)  
- Accessible navigation (keyboard, screen readers, ARIA roles)
- Modern design with Tailwind CSS + DaisyUI  

---

## 🛠️ Tech Stack

**React**|**React Router**|**Tailwind CSS**|**DaisyUI**|**Context API**|**React Icons**|**TMDB API**

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/movie-guide.git
cd movie-guide

Install dependencies:

npm install

Create a .env file and add your TMDB API key:

VITE_TMDB_API_KEY=your_api_key_here

Run the app locally:

npm run dev

Open in your browser:

http://localhost:5173

🧭 Project Structure

src/
 ├─ components/
 │   ├─ Header/
 │   ├─ Navigation/
 │   ├─ RandomMovieButtonFromList/
 │   └─ ...
 ├─ context/
 │   └─ MoviesContext.jsx
 ├─ pages/
 ├─ styles/
 └─ main.jsx

