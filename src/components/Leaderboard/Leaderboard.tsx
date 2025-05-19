import "./Leaderboard.css";
import { UserLeaderboard } from "../../pages/Main/Main.tsx";

import EffectText from "../../components/EffectText/EffectText.tsx";
import BoxSection from "../BoxSection/BoxSection.tsx";

interface LeaderboardProps {
  users: UserLeaderboard[];
}

function Leaderboard({ users }: LeaderboardProps) {
  // Ordenar usuarios por puntuación de forma descendente
  const sortedUsers = [...users].sort(
    (a, b) => (Number(b.high_score) || 0) - (Number(a.high_score) || 0)
  );

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <EffectText fontSize="2.2rem" pixelMode borderOffset={3.0}>
          Leaderboard
        </EffectText>
      </div>
      <div className="leaderboard">
        {sortedUsers.map((user, index) => (
          <LeaderboardItem
            key={user.username}
            rank={index + 1}
            username={user.username}
            score={user.high_score}
            // Valor por defecto si `play_time` no existe
          />
        ))}
      </div>
    </div>
  );
}

interface LeaderboardItemProps {
  rank: number;
  username: string;

  score: number;
}
function LeaderboardItem({ rank, username, score }: LeaderboardItemProps) {
  let rankClass = "";
  if (rank === 1) rankClass = "gold";
  else if (rank === 2) rankClass = "silver";
  else if (rank === 3) rankClass = "bronze";
  const catImageUrl = `https://cataas.com/cat/says/${encodeURIComponent(
    username
  )}?fontSize=100&fontColor=purple&unique=${Date.now() + Math.random()}`;
  return (
    <BoxSection>
      <h2 className={`rank ${rankClass}`}>#{rank}</h2>

      <img src={catImageUrl} alt="Avatar" className="profile-pic" />

      <div className="stats-container">
        <div className="username-text">{username.toUpperCase()}</div>
        <div className="stats-text">{score}</div>
      </div>
    </BoxSection>
  );
}

export default Leaderboard;
