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
    <BoxSection>
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
    </BoxSection>
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

  return (
    <BoxSection className="leaderboard-item">
      <div className="column rank-column">
        <div className={`rank ${rankClass}`}>#{rank}</div>
      </div>

      <div className="column avatar-column">
        <img
          src="/avatar-placeholder.png"
          alt="Avatar"
          className="profile-pic"
        />
      </div>

      <div className="column username-column">
        <div className="username-text">{username.toUpperCase()}</div>
      </div>

      <div className="column stats-column">
        <div className="stats-text">High Score: {score}</div>
      </div>
    </BoxSection>
  );
}

export default Leaderboard;
