import "./Leaderboard.css";
import { User } from "../../interfaces/User";

import EffectText from "../../components/EffectText/EffectText.tsx";

interface LeaderboardProps {
  users: User[];
}

function Leaderboard({ users }: LeaderboardProps) {
  // Ordenar usuarios por puntuación de forma descendente
  const sortedUsers = [...users].sort(
    (a, b) => (Number(b.total_score) || 0) - (Number(a.total_score) || 0)
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
            profilePic={user.profilePicture}
            score={user.total_score}
            playTime={user.totalPlayTime()} // Valor por defecto si `play_time` no existe
          />
        ))}
      </div>
    </div>
  );
}

interface LeaderboardItemProps {
  rank: number;
  username: string;
  profilePic: string;
  score: number;
  playTime: number;
}

function LeaderboardItem({
  rank,
  username,
  profilePic,
  score,
  playTime,
}: LeaderboardItemProps) {
  return (
    <div className="leaderboard-item">
      <div className="column rank-column">
        <div className="rank">#{rank}</div>
      </div>

      <div className="column avatar-column">

      </div>

      <div className="column username-column">
        <div className="username-text">{username.toUpperCase()}</div>
      </div>

      <div className="column stats-column">
        <div className="stats-text">Total Score: {score}</div>
        <div className="stats-text">Play Time: {playTime} min</div>
      </div>
    </div>
  );
}

export default Leaderboard;
