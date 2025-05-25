import "./GameSection.css"
import { VideoGame } from "../../interfaces/Videogame";

function GamesSection({ games }: { games: VideoGame[] }) {

    return (
        <div className="section">
            <h3>
                Games Played
            </h3>
            <div className="games-grid">
                {games.map((game: VideoGame, index: number) => {

                    return (

                    <div key={index} className="game-card">
                        <div className="game-card-title">
                            <h3>
                                {game.gameName}
                            </h3>
                        </div>
                        <div className="game-card-content">
                           
                            <h3>Max Score: {game.maxScore}</h3>
                            <h3>Time Played: {game.timePlayed} mins</h3>
                        </div>
                    </div>
                )}
                )}
            </div>
        </div>
    );
}

export default GamesSection;