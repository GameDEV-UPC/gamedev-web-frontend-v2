import "./MyStats.css";
import { User } from "../../interfaces/User"; // No es necesario el .ts

import { VideoGame } from "../../interfaces/Videogame";
import EffectText from "../../components/EffectText/EffectText";

// Falso Usuario para pruebas
const fakeUser = new User(
  "janedoe",
  "Jane",
  "Doe",
  "janedoe@example.com",
  "https://placehold.co/150x150",
  [
    new VideoGame("Chess", 1400, 200),
    new VideoGame("Sudoku", 1100, 80),
    new VideoGame("Tetris", 1300, 100),
  ]
);

function MyStats() {
  // Evitamos llamadas repetidas
  const highestScoringGame = fakeUser.highestScoringGame();

  return (
    <div className="container">
      {/* Sección de Perfil */}
      <ProfileSection user={fakeUser} />

      {/* Sección de Estadísticas */}
      <StatisticsSection
        totalPlayTime={fakeUser.totalPlayTime()}
        totalScore={fakeUser.total_score} // Cambié a total_score
        highestScoringGame={highestScoringGame}
      />

      {/* Sección de Juegos */}
      <GamesSection games={fakeUser.gamesPlayed} />
    </div>
  );
}

function GamesSection({ games }: { games: VideoGame[] }) {
  return (
    <div className="section">
      <EffectText
        className="title"
        fontSize="1rem"
        pixelMode
        borderOffset={5.0}
      >
        Games Played
      </EffectText>
      <div className="games-grid">
        {games.map((game: VideoGame, index: number) => {
          return (
            <div key={index} className="game-card">
              <div className="game-card-title">
                <EffectText fontSize="0.9rem" pixelMode borderOffset={7.0}>
                  {game.gameName}
                </EffectText>
              </div>
              <div className="game-card-content">
                <EffectText fontSize="0.5rem">
                  Max Score: {game.maxScore}
                </EffectText>
                <EffectText fontSize="0.5rem">
                  Time Played: {game.timePlayed} mins
                </EffectText>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatisticsSection({
  totalPlayTime,
  totalScore,
  highestScoringGame,
}: {
  totalPlayTime: number;
  totalScore: number;
  highestScoringGame: { gameName: string; maxScore: number };
}) {
  return (
    <div className="section">
      <div className="stat-header">
        <EffectText fontSize="1rem" pixelMode borderOffset={5.0}>
          Statistics
        </EffectText>
      </div>
      <div className="stat-item">
        <EffectText fontSize="0.8rem">Total Play Time:</EffectText>
        <EffectText fontSize="0.8rem">{totalPlayTime} mins</EffectText>
      </div>
      <div className="stat-item">
        <EffectText fontSize="0.8rem">Total Score:</EffectText>
        <EffectText fontSize="0.8rem">{totalScore}</EffectText>
      </div>
      <div className="stat-item">
        <EffectText fontSize="0.8rem">Highest Scoring Game:</EffectText>
        <EffectText fontSize="0.8rem">
          {highestScoringGame.gameName} ({highestScoringGame.maxScore} points)
        </EffectText>
      </div>
    </div>
  );
}

function ProfileSection({ user }: { user: User }) {
  return (
    <div className="section">
      <img
        src={user.profilePicture}
        alt={`Profile of ${user.username}`}
        className="profile-picture"
      />
      <div className="profile-text">
        <div className="profile-user">
          <EffectText fontSize="1rem" pixelMode borderOffset={5.0}>
            {user.username}
          </EffectText>
        </div>
        <div className="info-container">
          <div className="info">
            <EffectText fontSize="0.8rem">First Name:</EffectText>
            <EffectText fontSize="0.8rem">{`${user.firstName}`}</EffectText>
          </div>
          <div className="info">
            <EffectText fontSize="0.8rem">Last Name:</EffectText>
            <EffectText fontSize="0.8rem">{` ${user.lastName}`}</EffectText>
          </div>
          <div className="info">
            <EffectText fontSize="0.8rem">Email:</EffectText>
            <EffectText fontSize="0.8rem">{`${user.email}`}</EffectText>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStats;
