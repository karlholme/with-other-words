import React from "react";
import buttonMaker from '../../common/button';
import pointPillarsMaker from '../../common/pointPillars';
import { getHighestScore } from '../../util/util';
import _ from 'lodash';

const Button = buttonMaker();
const PointPillars = pointPillarsMaker();

export default function gameSummaryComponentMaker() {
    function GameSummaryComponent({ triggerEvent, teamScores }) {

        return (
            <>
                <div className="page-header">
                    <h1 title="SLUT PÅ MATCHEN">SLUT PÅ MATCHEN</h1>
                </div>

                <div className="main-content" style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <PointPillars teamScores={teamScores} highestScore={getHighestScore(teamScores)} />
                </div>

                <footer>
                    <Button label="NY OMGÅNG" onClick={function () {
                        triggerEvent({ name: 'NEW-ROUND-SELECTED' })
                    }} />
                </footer>
            </>
        )
    }

    return function (props) {
        return <GameSummaryComponent {...props} />;
    }
}
