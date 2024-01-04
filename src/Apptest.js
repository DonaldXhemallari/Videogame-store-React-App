// Import necessary dependencies from React and other libraries
import React, { useState, useEffect } from "react";
import axios from "axios"; //A library for making HTTP requests
import "./index.css"; // Import the CSS file for styling
import StarRating from "./starRating"; // Import the StarRating component

// Link tag for importing the Roboto font from Google Fonts
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
/>;

// Constants for the RAWG API key and URL
const RAWG_API_KEY = "8e600714ed414015973740e21e465e5b";
const RAWG_API_URL = "https://api.rawg.io/api/games";

// Define the main App component
const App = () => {
  // State variables using the useState hook
  const [games, setGames] = useState([]); // Holds the list of games
  const [searchQuery, setSearchQuery] = useState(""); // Holds the search query
  const [expandedGameId, setExpandedGameId] = useState(null); // Holds the ID of the expanded game
  const [wishlist, setWishlist] = useState([]); // Holds the list of wishlist games
  const [showWishlist, setShowWishlist] = useState(false); // Controls the visibility of the wishlist

  // useEffect hook to fetch games from the RAWG API based on the search query
  useEffect(() => {
    const fetchGames = async () => {
      //funskioni asinkron fetch games perdoret per te marr te dhenat e lojrave nga APIpermes Axios
      try {
        const response = await axios.get(RAWG_API_URL, {
          params: {
            key: RAWG_API_KEY,
            page_size: 8,
            search: searchQuery,
          }, //kerkes merret nepermjet API key ne sa faqe duam ta vendosim ne ne kte rast 8 nepermjet kerkeses search querry dhe ruhen ne arrai games
        });

        setGames(response.data.results);
      } catch (error) {
        console.error("Error fetching games:", error);
      } // nese ndodh nje gabim kur bejm fetch ai gabim regjistrohet ne cosole dhe shfaq error
    };

    fetchGames();
  }, [searchQuery]); //nese ndryshon gjendja e searchQuerry atehere useEffect hyn ne pune per te pare se cfar ndyshimi kemi kryer

  // Ky funksion ndërrohet një lojë brenda dhe jashtë listës së dëshirave.
  const handleWishlistToggle = (game) => {
    //kemi deklaruar funskionin handleWishListToggle i cili merr si parameter vet game
    setWishlist((prevWishlist) => {
      const isGameInWishlist = prevWishlist.some(
        (wishlistGame) => wishlistGame.id === game.id
      ); // ktu kemi berdorur nje arrow function kam perdorur metoden some per te pare nese loja e perzgjedhur eshte prezente ne listen prevWishlist dhe kontrollon nese lojtrat ne array wishList kan id e njejt me lojen e perzgjedhur

      if (isGameInWishlist) {
        return prevWishlist.filter(
          (wishlistGame) => wishlistGame.id !== game.id
        );
      } else {
        return [...prevWishlist, game];
      } //perdorim metoden if else per te kontrolluar ne se variabla isGameInWishList eshte true apo jo nese eshte true atehere perdorim metoden filter ne array prevWishList per te krijuar nje array te ri e cila permban te gjitha lojerat pervec asaj q ka te njeten id me ate qe kemi perzgjedhur pra e heq ate loj nga wish list    });

    setShowWishlist(true); // Display the wishlist when a game is added
  };

  // Function to hide the wishlist
  const hideWishlist = () => {
    setShowWishlist(false);
  }; //kam deklaruar nje arrow function te quajtur hideWishList pa parametra i cili ben ndryshimin e gjendjes se setShowWishList nga true ne false dhe wishlista nuk shfaqet ne ekran

  // Function to remove a game from the wishlist
  const handleRemoveFromWishlist = (game) => {
    //Kjo është deklarata e një funksioni të quajtur handleRemoveFromWishlist. Funksioni pranon një parameter, i cili është game, për të treguar lojën që do të largohet nga lista e dëshirave.
    setWishlist(
      (
        prevWishlist //kam perdorur funsionin setWishList per per te bere update state e wishList duke perdorur nje funsion si argument state i wishList do te percaktohet nga state i meperparshem prevWishList
      ) => prevWishlist.filter((wishlistGame) => wishlistGame.id !== game.id)
    ); //kam perdorur metoden filter ne array prevWishList duke mbajtur ne array vtm id te cilat nuk jan te njejta me id e lojes qe po heq
  };

  // JSX structure for the main App component
  return (
    <div>
      {/* Header section with logo and store name */}
      <header>
        <div className="header-content">
          <div className="logo-container">
            <img src="/donalds.jpg" alt="Logo" className="logo" />
          </div>
          <h1>Donald's Video Game Store</h1>
        </div>
      </header>

      {/* Video container with a promotional video */}
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

      {/* Search bar for searching games */}
      <div className="search-bar">
        <input //nje element input e tipit text qe place holder ka search games
          type="text"
          placeholder="Search games..."
          value={searchQuery} //atributi value eshte vendosu si vlere e variables se gjendjes search querry e cila siguron se kutia search reflekton gjendjen aktuale te kerkimit
          onChange={(e) => setSearchQuery(e.target.value)} //kam perdorur nje event handler si funksion i cili i ben update gjendjes se searchQuery me vleren aktuale qe kemi ne search field sa here qe perdoruesi ndryshon tekstin thirret ky funksion per ti bere bere update state te search querry
        />
      </div>

      {/* Container for displaying the list of games */}
      <div className="games-container">
        {games.map(
          (
            game //kam perdorur metoden map per te krijuar nje list elementesh per secilen loje ne listen e lojrave
          ) => (
            <div
              key={game.id} //ky eshte nje element div qe e perdor per cdo loje me nje atribut key i cili eshte id e lojes i cili na ndihmon per te identifikuar ndryshimet qe ndodhin ne listen e elementeve
              className={`game-card ${
                expandedGameId === game.id ? "expanded" : ""
              }`} //nese mausi eshte mbi kart atehere karta do marri atributet e klases expanded nese jo atributet e klases game card
            >
              {/* Game card with image, details, and wishlist button */}
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
                {/* Star rating component */}
                <div className="rating">
                  <StarRating maxRating={5} size={20} />
                </div>
                {/* Wishlist button with dynamic text */}
                <button
                  className="add-wish-list"
                  onClick={() => handleWishlistToggle(game)}
                >
                  {" "}
                  {/* atributi onClick perdor nje arrow function i cili therret
                  funsionin handleWishlistToggle e cila pastaj ben shtimin
                  argumentin e cila ne kte rast eshte game vet dhe ben shtimin e
                  ksaj game ne wish list */}
                  {wishlist.some((wishlistGame) => wishlistGame.id === game.id)
                    ? "Added"
                    : "🎁"}{" "}
                  {/*kam perdorur nje funksion ternary ne butonin add wish list i cili ben te mundur kontrollin nese const game eshte brenda wish list nese po atehere buttoni do ndryshoj dhe do shkruaj Added nese jo do qendroj po njesoj*/}
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Wishlist panel that appears when there are items in the wishlist */}
      {showWishlist && ( //kam perdorur nje conditional rendering e cila shef nese gjendja e showWishList eshte true atehere shfaq wish list ne ekran nese eshte false atehere krijon nje array te ri duke shtuar brenda saj loje e re
        <div className="wishlist-panel">
          <div className="wishlist-panel-buttons">
            {/* Buttons to hide and clear the wishlist */}
            <button className="hide-wishlist" onClick={hideWishlist}>
              {" "}
              {/*kur klikohet ky buton futet ne pune funskioni hideWishList i cili ben te mundur qe lista te fshihet*/}
              Hide Wishlist
            </button>
            <button className="clear-wishlist" onClick={() => setWishlist([])}>
              {" "}
              {/*kur klikohet ky funksion e kthen array wishList ne nje array bosh*/}
              Clear Wishlist
            </button>
          </div>
          <h2>Wishlist</h2>
          <div className="wishlist-items">
            {/* Display each item in the wishlist */}
            {wishlist.map(
              (
                wishlistGame //ksm perdorur metoden map per te iteruar mbi cdo cdo loje ne array wish list
              ) => (
                <div key={wishlistGame.id} className="wishlist-item">
                  {" "}
                  {/*ky div perfaqeson cdo element ne listen wishList bazuar ne game ID*/}
                  <img
                    src={wishlistGame.background_image}
                    alt={wishlistGame.name}
                    className="wishlist-image"
                  />
                  <div className="wishlist-details">
                    <p>
                      <strong>Name:</strong> {wishlistGame.name}
                    </p>
                    <p>
                      <strong>Release date:</strong> {wishlistGame.released}
                    </p>
                    <p>
                      <strong>Genres:</strong>{" "}
                      {wishlistGame.genres
                        .map((genre) => genre.name)
                        .join(", ")}
                    </p>{" "}
                    {/*ktu kemi perdor metoden map per te nxjerr te gjith zhanrat e lojrave qe ndodhen ne wishList dhe i ndan ato me , duke perdorur join*/}
                    <p>
                      <strong>Rating:</strong> {wishlistGame.rating}/5
                    </p>
                    {/* Button to remove item from the wishlist */}
                    <button
                      className="remove-from-wishlist"
                      onClick={() => handleRemoveFromWishlist(wishlistGame)}
                    >
                      {" "}
                      {/*kur shtyper ky buton therrasim funsionin handleRemoveFromWishList i cili ben te mundur heqjen e lojes nga wish list*/}
                      -
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Exporting the App component as the default export
export default App;
