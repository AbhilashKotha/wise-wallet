import React from 'react';
import '../styles/DashboardComponent.css'; // Import your CSS file
import PersonalDataChart from './PersonalDataChartComponent';
import LeaderboardContainer from './Leaderboardcontainer'
const DashboardComponent = () => {
    return (
        <div className="dashboard-container">
            <div className="col-md-8">
                <div className="row">
                    <PersonalDataChart />
                </div>
                <div className="row">

                </div>
            </div>

            <div className="col-md-4">
                <LeaderboardContainer />
            </div>
        </div>
    );
};

export default DashboardComponent;
