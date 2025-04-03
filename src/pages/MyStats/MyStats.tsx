import "./MyStats.css";
import { User } from "@interfaces/User.tsx";
import ProfileSection from "@components/ProfileSection/ProfileSection.tsx";
import StatisticsSection from "@components/StatisticsSection/StatisticsSeection.tsx";
import GamesSection from "@components/GamesSection/GamesSection.tsx";



// Falso Usuario para pruebas
const fakeUser = new User(
    "janedoe",
    "Jane",
    "Doe",
    "janedoe@example.com",
    "https://placehold.co/150x150",
    [
        { gameName: "Chess", gameImage: "https://placehold.co/50x50", maxScore: 1400, timePlayed: 200 },
        { gameName: "Sudoku", gameImage: "https://placehold.co/50x50",maxScore: 1100, timePlayed: 80 },
        { gameName: "Tetris", gameImage: "https://placehold.co/50x50",maxScore: 1300, timePlayed: 100 },
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
                totalScore={fakeUser.totalScore()}
                highestScoringGame={highestScoringGame}
            />

            {/* Sección de Juegos */}
            <GamesSection games={fakeUser.gamesPlayed} />
        </div>
    );
}




export default MyStats;
