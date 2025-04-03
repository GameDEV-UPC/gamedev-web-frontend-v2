import "./Leaderboard.css";
import User from "@interfaces/User";

import EffectText from "@components/EffectText/EffectText.tsx";

interface LeaderboardProps {
    users: User[];
}

function Leaderboard({ users }: LeaderboardProps) {
    // Ordenar usuarios por puntuación de forma descendente
    const sortedUsers = [...users].sort((a, b) => b.score - a.score);

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">
                <EffectText
                    fontSize="2.2rem"
                    pixelMode
                    borderOffset={3.0}

                >
                    Leaderboard
                </EffectText>
            </div>
            <div className="leaderboard">
                {sortedUsers.map((user, index) => (
                    <LeaderboardItem
                        key={user.username}
                        rank={index + 1}
                        username={user.username}
                        profilePic={user.profile_pic}
                        score={user.score}
                        playTime={user.play_time || 0} // Valor por defecto si `play_time` no existe
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

function LeaderboardItem({ rank, username, profilePic, score, playTime }: LeaderboardItemProps) {
    return (
        <div className="leaderboard-item">
            <div className="rank">#{rank}</div>
            <img
                src={profilePic}
                alt={`Profile picture of ${username}`}
                className="profile-pic"
            />
            <div className="user-info">
                <EffectText
                    fontSize="1.2rem"
                    pixelMode
                    borderOffset={5.0}

                >
                    {username}
                </EffectText>
                <EffectText fontSize={"0.8rem"}>Total Score: {score}</EffectText>
                <EffectText fontSize={"0.8rem"}>Play Time: {playTime} min</EffectText>
            </div>
        </div>
    );
}

export default Leaderboard;
