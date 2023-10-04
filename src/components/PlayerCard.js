// src/components/PlayerCard.js
import React from "react";
import "./PlayerCard.css";

const PlayerCard = ({ player }) => {
  const imageUrl = `./player-images/${player.Id}.jpg`;

  const matchTime = new Date(
    player.UpComingMatchesList[0]?.MDate
  ).toLocaleString();

  return (
    <div className="player-card">
      <img src={imageUrl} alt={player.PFName} />
      <h3>{player.PFName}</h3>
      <p>Skill: {player.SkillDesc}</p>
      <p>Value: ${player.Value}</p>
      <p>Upcoming Match: {player.UpComingMatchesList[0]?.VsCCode}</p>
      <p>Next Match Time: {matchTime}</p>
    </div>
  );
};

export default PlayerCard;
