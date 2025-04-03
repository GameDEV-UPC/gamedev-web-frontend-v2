import "./GameSection.css"
import EffectText from "@components/EffectText/EffectText.tsx";

function GamesSection({ games }: { games: { gameName: string; maxScore: number; timePlayed: number }[] }) {
    return (
        <div className="section">
            <EffectText

            >
                Games Played
            </EffectText>
            <div className="games-grid">
                {games.map((game, index) => (
                    <div key={index} className="game-card">
                        <EffectText

                        >
                            {game.gameName}
                        </EffectText>
                        <p>Max Score: {game.maxScore}</p>
                        <p>Time Played: {game.timePlayed} mins</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GamesSection;