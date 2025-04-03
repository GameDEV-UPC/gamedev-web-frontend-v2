
import "./StatisticsSection.css"
import EffectText from "@components/EffectText/EffectText.tsx";

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

                >
                    Statistics
                </EffectText>
            </div>
            <div className="stat-item">
                <span>Total Play Time:</span>
                <span>{totalPlayTime} mins</span>
            </div>
            <div className="stat-item">
                <span>Total Score:</span>
                <span>{totalScore}</span>
            </div>
            <div className="stat-item">
                <span>Highest Scoring Game:</span>
                <span>
                    {highestScoringGame.gameName} ({highestScoringGame.maxScore} points)
                </span>
            </div>
        </div>
    );
}

export default StatisticsSection;