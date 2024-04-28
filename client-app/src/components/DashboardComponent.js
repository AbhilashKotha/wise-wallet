import React from 'react';
import '../styles/DashboardComponent.css'; // Import your CSS file
import PersonalDataChart from './PersonalDataChartComponent';
import LeaderboardContainer from './Leaderboardcontainer';
import Suggestions from './Suggestions';
const DashboardComponent = () => {
    return (
        <div className="dashboard-container">
            <div className="col-md-8">
                <div className="row">
                    <PersonalDataChart />
                </div>
                <div className="row">
                    <h3>
                        How can you get ahead?
                    </h3>
                    <SuggestionsComponent/>
                </div>
            </div>

            <div className="col-md-4">
                <LeaderboardContainer />
            </div>
        </div>
    );
};

export default DashboardComponent;
