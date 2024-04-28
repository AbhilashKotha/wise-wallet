import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, CardTitle, Image, Row, Col } from 'react-bootstrap';

const Leaderboard = ({ groupName, data }) => {
    // Sort data in descending order based on rank, then streak as tiebreaker
    const sortedData = [...data].sort((a, b) => {
        if (a.rank !== b.rank) return a.rank - b.rank;
        return a.streak - b.streak;
    });

    // Function to calculate background color based on index and number of cards
    const calculateBackgroundColor = (index, length) => {
        const darkGreen = 'rgba(0, 100, 0, 0.5)'; // Dark green with transparency
        const lightGreen = 'rgba(152, 251, 152, 0.5)'; // Light green with transparency
        const amber = 'rgba(255, 191, 0, 0.5)'; // Amber with transparency
        const paleAmber = 'rgba(255, 248, 220, 0.5)'; // Pale amber with transparency
        const darkRed = 'rgba(139, 0, 0, 0.5)'; // Dark red with transparency
        const lightRed = 'rgba(255, 204, 204, 0.5)'; // Light red with transparency
        
        const middleIndex = Math.floor(length / 2);

        if (index === 0) {
            return darkGreen;
        } else if (index === 1) {
            return lightGreen;
        } else if (index === length - 1) {
            return darkRed;
        } else if (length <= 5) {
            if (index >= middleIndex - 2 && index <= middleIndex + 1) {
                return amber;
            } else if (index === length - 2) {
                return lightRed;
            }
        } else {
            if (index >= middleIndex - 2 && index <= middleIndex + 2) {
                if (index >= middleIndex - 2 && index <= middleIndex + 1) {
                    return amber;
                } else if (index === length - 1) {
                    return darkRed;
                } else {
                    return paleAmber;
                }
            } else if (index > middleIndex + 2) {
                return lightRed;
            }
        }

        return darkGreen;
    };

    return (
        <div>
            <h3>{groupName} Group</h3>
            {sortedData.map((item, index) => (
                <Card key={index} style={{ margin: '10px', borderRadius: '20px', backgroundColor: calculateBackgroundColor(index, sortedData.length) }}>
                    <CardBody>
                        <Row>
                            {/* Icon */}
                            <Col xs={6} md={4} className="text-center">
                                <div className='initials'>
                                    {item.initials}
                                </div>
                            </Col>
                            
                            {/* Name and Tagline */}
                            <Col xs={6} md={6}>
                                <Row>
                                    <Col xs={12}>
                                        <CardTitle>{item.name}</CardTitle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        {item.status}
                                    </Col>
                                </Row>
                            </Col>
                            {/* Fire Icon and Streak */}
                            {(item.streak > 0) && (
                                <Col xs={6} md={2} className="text-right">
                                    <Row>
                                        <Col xs={12}>
                                            <FontAwesomeIcon icon={faFire} style={{ color: "#ff4000" }} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <p>{item.streak}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            )}
                        </Row>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default Leaderboard;
