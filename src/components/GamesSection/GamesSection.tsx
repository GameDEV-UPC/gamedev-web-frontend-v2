import "./GameSection.css"
import EffectText from "../../components/EffectText/EffectText";
import { VideoGame } from "../../interfaces/Videogame";

function GamesSection({ games }: { games: VideoGame[] }) {

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
                {games.map((game: VideoGame, index: number) => {

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