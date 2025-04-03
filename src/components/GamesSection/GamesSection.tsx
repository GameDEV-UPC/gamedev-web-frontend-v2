import "./GameSection.css"
import EffectText from "@components/EffectText/EffectText.tsx";

function GamesSection({ games }: { games: { gameName: string, gameImage: string,maxScore: number, timePlayed: number }[] }) {

    return (
        <div className="section">
            <EffectText
                fontSize="1rem"
                pixelMode
                borderOffset={5.0}

            >
                Games Played
            </EffectText>
            <div className="games-grid">
                {games.map((game, index) => {

                    return (

                    <div key={index} className="game-card">
                        <div className="game-card-title">
                            <EffectText
                                fontSize="0.9rem"
                                pixelMode
                                borderOffset={7.0}

                            >
                                {game.gameName}
                            </EffectText>
                        </div>
                        <div className="game-card-content">
                            <img
                                src={game.gameImage}
                                alt={`Game ${game.gameName}`}
                                className="game-image">
                            </img>
                            <EffectText
                                fontSize="0.5rem"

                            >Max Score: {game.maxScore}</EffectText>
                            <EffectText
                                fontSize="0.5rem"

                            >Time Played: {game.timePlayed} mins</EffectText>
                        </div>
                    </div>
                )}
                )}
            </div>
        </div>
    );
}

export default GamesSection;