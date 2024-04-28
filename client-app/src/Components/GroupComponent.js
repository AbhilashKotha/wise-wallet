// GroupComponent.js
import {React, useState} from 'react';
import { Card, CardBody, CardTitle, Row, Col,Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

const GroupComponent = ({ groupName, data }) => {
  const sortedData = [...data].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const handleSendInvite = () => {
    console.log(`Sending invite to ${inviteEmail} for group ${groupName}`);
    setShowAlert(true);
    setInviteEmail('');

    // Auto-close the alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
 
  const [showAlert, setShowAlert] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  return (
    <div>
      <h3>{groupName} Group</h3>
      {sortedData.map((item, index) => (
        <Card key={index} style={{ margin: '5px', borderRadius: '20px' }}>
          <CardBody style={{padding: '0.3rem'}}>
            <Row>
              {/* Icon */}
              <Col xs={6} md={5} className="text-center">
                <div className="initials">{item.initials}</div>
              </Col>
              {/* Name and Tagline */}
              <Col style={{alignContent:'center'}}>
                    <CardTitle style={{fontSize:'1em'}}>{item.name}</CardTitle>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ))}
      {showAlert ? (
        <Alert variant="success" style={{ padding: '10px', borderRadius: '20px' }}>
          Invite sent successfully!
        </Alert>
      ) : (
        <Card style={{ margin: '10px', borderRadius: '20px' }}>
          <CardBody style={{ padding: '0px', borderRadius: '20px' }}>
              <InputGroup>
              <Form.Control style={{ borderTopLeftRadius:'20px',borderBottomLeftRadius:'20px' }} as="textarea" aria-label="With textarea" placeholder='Email addresses separated by ;'/>
              <Button style={{ borderTopRightRadius:'20px',borderBottomRightRadius:'20px' }} variant="primary" id="button-addon2" onClick={handleSendInvite}>
                  Invite
                  </Button>
               </InputGroup>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default GroupComponent;