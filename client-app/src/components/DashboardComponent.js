import React from 'react';
import '../styles/DashboardComponent.css'; // Import your CSS file
import PersonalDataChart from './PersonalDataChartComponent';
const DashboardComponent = () => {
    return (
        <div className="dashboard-container">
            <div className="col-md-6">
                <div className="row">
                        <PersonalDataChart />
                </div>
                <div className="row">

                </div>
                <div className="col-md-6">
                </div>
            </div>
        </div>
            );
            };

export default DashboardComponent;
