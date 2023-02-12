import React from "react";

export default function () {

    function getWidth(amountOfTeams) {
        if (amountOfTeams < 5) return 12;
        return 8;
    }

    function PointPillarContent({
        teamScores,
        highestScore
    }) {
        return (
            <div className="color-box-container">
                {_.keys(teamScores).map(function (team) {
                    const amountOfTeams = _.keys(teamScores).length;
                    const teamsScore = teamScores[team].score;
                    const teamName = teamScores[team].name;
                    const extraInfo = teamScores[team].extraInfo || '';
                    const height = 20 + (teamsScore / highestScore) * 20;
                    const width = getWidth(amountOfTeams);

                    return (
                        <div key={team}>
                            <div className="extra-info">{extraInfo}</div>
                            <div className="color-box" style={{ maxWidth: width + 'vw', height: height + 'vh' }}>
                                <div className="color-box-header">{teamName}</div>
                                <div className="color-box-body">{teamsScore}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }

    return function PointPillar(props) {
        return <PointPillarContent {...props} />
    }
}
