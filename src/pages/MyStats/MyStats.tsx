import "./MyStats.css";
import { User } from "../../interfaces/User"; // No es necesario el .ts

import { VideoGame } from "../../interfaces/Videogame";

import transition from "../../hooks/transition";
import BoxSection from "../../components/BoxSection/BoxSection";

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
    <div className="mystats-container">
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
    <BoxSection className="section">
      <h1>Games Played</h1>
      <div className="games-grid">
        {games.map((game: VideoGame, index: number) => {
          return (
            <BoxSection key={index} className="game-card">
              <div className="game-card-title">
                <h1>{game.gameName}</h1>
              </div>
              <div className="game-card-content">
                <h2>Max Score: {game.maxScore}</h2>
                <h2>Time Played: {game.timePlayed} mins</h2>
              </div>
            </BoxSection>
          );
        })}
      </div>
    </BoxSection>
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
    <BoxSection className="section">
      <div className="stat-header">
        <h1>Statistics</h1>
      </div>
      <div className="stat-content">
        <BoxSection className="stat-item">
          <h2>Total Play Time:</h2>
          <h2>{totalPlayTime} mins</h2>
        </BoxSection>
        <BoxSection className="stat-item">
          <h2>Total Score:</h2>
          <h2>{totalScore}</h2>
        </BoxSection>
        <BoxSection className="stat-item">
          <h2>Highest Scoring Game:</h2>
          <h2>
            {highestScoringGame.gameName} ({highestScoringGame.maxScore} points)
          </h2>
        </BoxSection>
      </div>
    </BoxSection>
  );
}

function ProfileSection({ user }: { user: User }) {
  const src = `https://cataas.com/cat/says/${encodeURIComponent(
    user.username
  )}?fontSize=100&fontColor=white&unique=${Date.now() + Math.random()}`;
  return (
    <BoxSection className="section">
      <h1>{user.username}</h1>
      <img
        src={src}
        alt={`Profile of ${user.username}`}
        className="profile-picture"
      />

      <div className="info-container">
        <BoxSection>
          <h2>First Name:</h2>
          <h2>{`${user.firstName}`}</h2>
        </BoxSection>
        <BoxSection>
          <h2>Last Name:</h2>
          <h2>{` ${user.lastName}`}</h2>
        </BoxSection>
        <BoxSection>
          <h2>Email:</h2>
          <h2>{`${user.email}`}</h2>
        </BoxSection>
      </div>
    </BoxSection>
  );
}

export default transition(MyStats);
