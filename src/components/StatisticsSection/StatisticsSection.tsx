
import "./StatisticsSection.css"
import EffectText from "../../components/EffectText/EffectText.tsx";

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
                <EffectText
                    fontSize="1rem"
                    pixelMode
                    borderOffset={5.0}


                >
                    Statistics
                </EffectText>
            </div>
            <div className="stat-item">
                <EffectText
                    fontSize="0.8rem"

                >
                    Total Play Time:</EffectText>
                <EffectText
                    fontSize="0.8rem"

                >
                    {totalPlayTime} mins
                </EffectText>
            </div>
            <div className="stat-item">
                <EffectText
                    fontSize="0.8rem"
                >
                    Total Score:
                </EffectText>
                <EffectText
                    fontSize="0.8rem"

                >{totalScore}</EffectText>
            </div>
            <div className="stat-item">
                <EffectText
                    fontSize="0.8rem"
                >Highest Scoring Game:</EffectText>
                <EffectText
                    fontSize="0.8rem"
                >
                    {highestScoringGame.gameName} ({highestScoringGame.maxScore} points)
                </EffectText>
            </div>
        </div>
    );
}

export default StatisticsSection;