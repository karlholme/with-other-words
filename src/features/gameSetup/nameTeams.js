import _ from "lodash";
import React from "react";
import buttonMaker from '../../common/button';
import dropdownMaker from '../../common/dropdown';
import { teamNames as teamNamesToChooseFrom } from "../../util/teamNames";

const Button = buttonMaker();
const Dropdown = dropdownMaker();

export default function newGamePageMaker() {
    function NewGamePageComponent({ triggerEvent, amountOfTeams, teamNames }) {
        const [shouldShowDuplicateWarning, setShouldShowDuplicateWarning] = React.useState(false);
        return (
            <>
                <div className="page-header">
                    <h1 title="VÄLJ LAG-EMOJI">VÄLJ LAG-EMOJI</h1>
                </div>
                <div className="main-content" style={{
                    width: '90%',
                    display: 'flex',
                    flexFlow: 'row wrap',
                    placeContent: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignContent: 'center',
                    justifyContent: 'center',
                    maxWidth: '35rem'
                }}>
                    {[...Array(amountOfTeams).keys()].map(function (teamNumber) {
                        const team = teamNumber + 1;
                        return (
                            <Dropdown
                                key={team}
                                style={{ padding: '2vh' }}
                                title={'Lag ' + (team)}
                                placeholder="Välj.."
                                alternatives={teamNamesToChooseFrom}
                                onChange={function (event) {
                                    setShouldShowDuplicateWarning(false);
                                    triggerEvent({ name: 'TEAM-NAME-CHANGED', data: { name: event.target.value, team: team } })
                                }}
                                value={teamNames[team].name}
                            />
                        )
                    })}
                </div>
                <footer>
                    {shouldShowDuplicateWarning && (
                        <span className="invalid-text">Alla lag måste ha en unik lag-emoji!</span>
                    )}
                    <Button
                        type="primary"
                        label="Nu kör vi"
                        onClick={function () {
                            const teams = _.values(teamNames).map(team => team.name);
                            console.log(teams);
                            if (_.uniq(teams).length !== teams.length) {
                                setShouldShowDuplicateWarning(true);
                            } else {
                                triggerEvent({ name: 'CONTINUE-PRESSED' })
                            }
                        }}
                    />
                </footer>
            </>
        )
    }

    return function (props) {
        return <NewGamePageComponent {...props} />;
    }
}
