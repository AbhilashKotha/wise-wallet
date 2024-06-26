import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import ChatComponent from './ChatComponent';
function StatementsComponent() {
    return (
        <>
            <Container>
                <Tabs
                    defaultActiveKey="file"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="file" title="Upload Statements">
                    <h3>Upload a bank statement</h3>
                        <Form.Group controlId="formFile" className="mb-3">
                            
                            <Form.Control type="file" />
                        </Form.Group>
                        <ChatComponent 
                        live={false}
                        />
                    </Tab>
                    <Tab eventKey="live" title="Live Data">
                        <h3>Ask about your finances</h3>
                        <ChatComponent 
                        live={true}
                        />
                    </Tab>
                </Tabs>
            </Container>
        </>)
}
export default StatementsComponent;