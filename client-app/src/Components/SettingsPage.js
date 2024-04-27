import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Col,Button} from 'react-bootstrap';

function SettingsPage() {
    const personData = {firstName: "Abhilash",
lastName:"Kotha",
email:"akotha1@slu.edu",
emailNotif: true,
Banks: [{name:"US Bank",lastFour:"3232"},{name:"Chase",lastFour:"6632"}]}
    return (
      <>
      <Col xs={6} md={4} style={{marginLeft:"5em"}}> 
       <h3 style={{marginTop:"30px"}}>Basic Information</h3>
       <InputGroup className="mb-3" >
        <InputGroup.Text id="basic-addon1" style={{width:"7em"}}>First Name</InputGroup.Text>
        <Form.Control
          placeholder="Enter Your First Name"
          aria-label="firstname"
          aria-describedby="basic-addon1"
          defaultValue = {personData.firstName}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" style={{width:"7em"}}>Last Name</InputGroup.Text>
        <Form.Control
          placeholder="Enter Your Last Name"
          aria-label="firstname"
          aria-describedby="basic-addon1"
          defaultValue = {personData.lastName}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" style={{width:"7em"}}>Email</InputGroup.Text>
        <Form.Control
          placeholder="Enter Your Eamil Address"
          aria-label="email"
          aria-describedby="basic-addon1"
          defaultValue = {personData.email}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Eamil Notifications</InputGroup.Text>
        <InputGroup.Checkbox checked={personData.emailNotif} aria-label="Checkbox for above" />
      </InputGroup>
      <h3>Bank Accounts Linked</h3>
      {personData.Banks.length > 0 ? (
        <>
        {personData.Banks.map((bank) => (
             <InputGroup className="mb-3">
             <Form.Control
               disabled
               aria-label="Recipient bank details"
               aria-describedby="basic-addon2"
               value={`${bank.name} (****${bank.lastFour})`}
             />
             <Button variant="danger" id="button-addon2">
               Unlink
             </Button>
           </InputGroup>
        )
    )
}
        </>):<><p>No bank accounts are linked</p></>}
      
     
      </Col>
      </>
    )
}
export default SettingsPage;