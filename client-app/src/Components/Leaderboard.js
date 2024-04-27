import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, CardTitle, Image, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

const Leaderboard = ({ groupName, data }) => {
    // Sort data in descending order based on rank, then streak as tiebreaker

    const sortedData = [...data].sort((a, b) => {
        if (a.rank !== b.rank) return a.rank - b.rank;
        return a.streak - b.streak;
    });

    return (
        <div style={{ width: '30rem'}}>
            <h3>{groupName} Group</h3>
            {sortedData.map((item, index) => (
                <Card key={index} style={{ margin: '10px', borderRadius:'20px' }}>
                    <CardBody>
                        <Row>
                            {/* Icon */}
                            <Col xs={6} md={4} className="text-center">
                                <div className='initials'>
                                {item.initials}
                            </div>
                            </Col>
                            
                            {/* Name and Tagline */}
                            <Col xs={6} md={4}>
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
                            {(item.streak>0)&&(<Col xs={6} md={4} className="text-right">
                                
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
                            </Col>)}
                        </Row>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default Leaderboard;
