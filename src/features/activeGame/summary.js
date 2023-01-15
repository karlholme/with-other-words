import React from "react";
import buttonMaker from '../../common/button';
import pointPillarsMaker from '../../common/pointPillars';
import { getHighestScore } from '../../util/util';
import _ from 'lodash';

const Button = buttonMaker();
const PointPillars = pointPillarsMaker();

export default function activeGamePageMaker() {
    function SummaryComponent({ triggerEvent, round, activeTeam, teamScores, amountOfRounds }) {

        return (
            <>
                <div className="page-header" style={{ height: '18vh' }}>
                    <h1 title={'Omgång'} style={{ marginTop: '1rem', marginBottom: '0', paddingBottom: '0' }}>Omgång</h1>
                    <h1 title={round + '/' + amountOfRounds} style={{ marginTop: '0', paddingTop: '0' }}>{round + '/' + amountOfRounds}</h1>
                </div>

                <PointPillars teamScores={teamScores} highestScore={getHighestScore(teamScores)} />

                <footer>
                    <h2 style={{ marginBottom: '.3rem' }}>Nästa lag: {teamScores[activeTeam].name}</h2>
                    <Button style={{ marginBottom: '2vh' }} label="Starta omgången" onClick={function () {
                        triggerEvent({ name: 'ROUND-STARTED-PRESSED' })
                    }} />
                </footer>
            </>
        )
    }

    return function (props) {
        return <SummaryComponent {...props} />;
    }
}
