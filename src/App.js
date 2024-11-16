import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "./components/Modal/modal";
import "./App.css";

// API URL from OMDB
const API = "https://www.omdbapi.com/?apikey=8b442999";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to fetch movies based on the title
  const movieSearch = async (title) => {
    try {
      const response = await fetch(`${API}&s=${title}`);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        alert("No movies found. Try a different title.");
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      alert("Failed to fetch movies. Please try again later.");
    }
  };

  // Function to fetch movie details for modal
  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(`${API}&i=${imdbID}`);
      const data = await response.json();
      setSelectedMovie(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      alert("Failed to fetch movie details. Please try again later.");
    }
  };

  // Function to fetch popular movies when the app loads
  const fetchDefaultMovies = async () => {
    try {
      const response = await fetch(`${API}&s=avengers`); // Default search keyword (Popular movie set)
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching default movies:", error);
      alert("Failed to fetch popular movies. Please try again later.");
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  // Fetch default movies on initial render
  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Movie Searcher</h1>
      </header>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search Here..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button>
          <SearchIcon
            style={{ color: "white", fontSize: "30px", cursor: "pointer" }}
            onClick={() => movieSearch(searchTitle)}
          />
        </button>
      </div>
      <div className="container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              className="movie-card"
              key={movie.imdbID}
              onClick={() => fetchMovieDetails(movie.imdbID)}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.png"}
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))
        ) : (
          <p>No movies to display</p>
        )}
      </div>
      <Modal movie={selectedMovie} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
