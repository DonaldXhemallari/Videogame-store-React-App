// Importing necessary modules and components from React and external libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import StarRating from "./starRating";

// Importing Google Fonts stylesheet for Roboto
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
/>;

// API key and URL for the RAWG API
const RAWG_API_KEY = "8e600714ed414015973740e21e465e5b";
const RAWG_API_URL = "https://api.rawg.io/api/games";

// Functional component App
const App = () => {
  // State variables using the useState hook
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGameId, setExpandedGameId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  // Fetch games from the RAWG API when the searchQuery changes
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(RAWG_API_URL, {
          params: {
            key: RAWG_API_KEY,
            page_size: 8,
            search: searchQuery,
          },
        });

        setGames(response.data.results);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [searchQuery]);

  // Function to toggle wishlist status for a game
  const handleWishlistToggle = (game) => {
    setWishlist((prevWishlist) => {
      const isGameInWishlist = prevWishlist.some(
        (wishlistGame) => wishlistGame.id === game.id
      );

      if (isGameInWishlist) {
        return prevWishlist.filter(
          (wishlistGame) => wishlistGame.id !== game.id
        );
      } else {
        return [...prevWishlist, game];
      }
    });

    setShowWishlist(true);
  };

  // Function to hide the wishlist panel
  const hideWishlist = () => {
    setShowWishlist(false);
  };

  // Function to remove a game from the wishlist
  const handleRemoveFromWishlist = (game) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((wishlistGame) => wishlistGame.id !== game.id)
    );
  };

  // JSX structure for the application
  return (
    <div>
      {/* Header section */}
      <header>
        <div className="header-content">
          <div className="logo-container">
            <img src="/donalds.jpg" alt="Logo" className="logo" />
          </div>
          <h1>Donald's Video Game Store</h1>
        </div>
      </header>

      {/* Video container */}
      <div className="video-container">
        <video
          controls
          width="100%"
          height="10%"
          style={{ objectFit: "cover" }}
        >
          <source src="winter_sale.mp4" type="video/mp4" />
          No Video.
        </video>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Games container */}
      <div className="games-container">
        {games.map((game) => (
          <div
            key={game.id}
            className={`game-card ${
              expandedGameId === game.id ? "expanded" : ""
            }`}
          >
            {/* Game details */}
            <img
              src={game.background_image}
              alt={game.name}
              className="game-image"
            />
            <div className="game-details">
              <h2>{game.name}</h2>
              <p className="release-date">
                <strong>Release date:</strong> {game.released}
              </p>
              <p className="genres">
                <strong>Genres:</strong>{" "}
                {game.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="rating">
                <span>Rating:</span> {game.rating}/5
              </p>
              <div className="rating">
                <StarRating maxRating={5} size={20} />
              </div>
              {/* Button to add to wishlist */}
              <button
                className="add-wish-list"
                onClick={() => handleWishlistToggle(game)}
              >
                {wishlist.some((wishlistGame) => wishlistGame.id === game.id)
                  ? "Added"
                  : "🎁"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Wishlist panel */}
      {showWishlist && (
        <div className="wishlist-panel">
          <div className="wishlist-panel-buttons">
            {/* Button to hide the wishlist */}
            <button className="hide-wishlist" onClick={hideWishlist}>
              Hide Wishlist
            </button>
            {/* Button to clear the wishlist */}
            <button className="clear-wishlist" onClick={() => setWishlist([])}>
              Clear Wishlist
            </button>
          </div>
          <h2>Wishlist</h2>
          <div className="wishlist-items">
            {wishlist.map((wishlistGame) => (
              <div key={wishlistGame.id} className="wishlist-item">
                {/* Wishlist item details */}
                <div className="wishlist-details">
                  <p>
                    <strong>Name:</strong> {wishlistGame.name}
                  </p>
                  <p>
                    <strong>Release date:</strong> {wishlistGame.released}
                  </p>
                  <p>
                    <strong>Genres:</strong>{" "}
                    {wishlistGame.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p>
                    <strong>Rating:</strong> {wishlistGame.rating}/5
                  </p>
                  {/* Button to remove from wishlist */}
                  <button
                    className="remove-from-wishlist"
                    onClick={() => handleRemoveFromWishlist(wishlistGame)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Exporting the App component as the default export
export default App;
