import "./MyStats.css";
import { User } from "../../interfaces/User";
import { VideoGame } from "../../interfaces/Videogame";
import BoxSection from "../../components/BoxSection/BoxSection";
import { useAuth } from "../../hooks/AuthProvider";
import { JSX } from "react";

function MyStats() {
    const { user } = useAuth();
    if (!user) return null;
    const currentUser = user as User;

    return (
        <div className="mystats-container">
            <ProfileSection user={currentUser} />
            <StatisticsSection
                totalPlayTime={currentUser.totalPlayTime()}
                totalScore={currentUser.total_score}
                highestScoringGame={currentUser.highestScoringGame()}
            />
            <GamesSection games={currentUser.gamesPlayed} />
        </div>
    );
}

function ProfileSection({ user }: { user: User }) {
    const src = `https://cataas.com/cat/says/${encodeURIComponent(
        user.username
    )}?fontSize=100&fontColor=white&unique=${Date.now()}`;

    return (
        <BoxSection className="section">
            <div className="profile-header">
                <img
                    src={src}
                    alt={`Profile of ${user.username}`}
                    className="profile-picture"
                />
                <h1 className="username">{user.username}</h1>
            </div>
            <div className="info-grid">
                <InfoBox label="First Name" value={user.firstName} />
                <InfoBox label="Last Name" value={user.lastName} />
                <InfoBox label="Email" value={user.email} />
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
            <h1>Statistics</h1>
            <div className="statistics-grid">
                <StatCard label="Total Play Time" value={`${totalPlayTime} mins`} />
                <StatCard label="Total Score" value={totalScore} />
                <StatCard
                    label="Top Game"
                    value={`${highestScoringGame.gameName} (${highestScoringGame.maxScore} pts)`}
                />
            </div>
        </BoxSection>
    );
}

function GamesSection({ games }: { games: VideoGame[] }) {
    return (
        <BoxSection className="section">
            <h1>Games Played</h1>
            <div className="games-grid">
                {games.map((game, i) => (
                    <InfoBox
                        key={i}
                        label={game.gameName}
                        value={
                            <>
                                Max Score: {game.maxScore}
                                <br />
                                Time: {game.timePlayed} mins
                            </>
                        }
                    />
                ))}
            </div>
        </BoxSection>
    );
}

function InfoBox({
                     label,
                     value,
                 }: {
    label: string;
    value: string | JSX.Element;
}) {
    return (
        <div className="info-box">
            <h3>{label}</h3>
            <p>{value}</p>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="stat-card">
            <h4>{label}</h4>
            <p>{value}</p>
        </div>
    );
}

export default MyStats;
