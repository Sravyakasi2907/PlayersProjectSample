import React, { useState, useEffect } from "react";
import PlayerCard from "./components/PlayerCard";
import SearchIcon from "./search.svg";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Default search when the component mounts
    searchPlayers("Real Madrid");
  }, []);

  async function searchPlayers(searchTerm) {
    try {
      const response = await fetch(
        `https://api.npoint.io/20c1afef1661881ddc9c`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      console.log("data", data);

      // Sort the players by Value in ascending order
      const sortedPlayers = data.playerList.sort((a, b) => a.Value - b.Value);

      setPlayers(sortedPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  }

  console.log("players.length", players.length);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZoneName: "short",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="app">
      <h1>PlayerLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for players"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchPlayers(searchTerm)}
        />
      </div>
      {players.length > 0 ? (
        <div className="container">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              formatDate={formatDate}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No players found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
