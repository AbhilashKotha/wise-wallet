import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Col,Button} from 'react-bootstrap';
import { useState } from 'react'; 
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function SettingsPage() {

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState('');

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    const selectedBudget = personData.MonthlyBudgets.find(budget => budget.Month === month);
    setSelectedAmount(selectedBudget ? selectedBudget.amount : '');
  };
    const personData = {firstName: "John",
lastName:"Deo",
email:"jdka1@slu.edu",
emailNotif: true,
Banks: [{name:"US Bank",lastFour:"3232"},{name:"Chase",lastFour:"6632"}],
MonthlyBudgets: [{Month:"April",amount:"$1200"},{Month:"May",amount:"$2000"},{Month:"June",amount:"800"}],
YearBudget: "$20000"}

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
      
        <h3 style={{marginTop:"30px"}}>Budget Information</h3>

      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title={selectedMonth || "Dropdown"}
          id="input-group-dropdown-1"
        >
           {personData.MonthlyBudgets.map((month) => (
          <Dropdown.Item key={month.Month} onClick={() => handleMonthSelect(month.Month)}>{month.Month}</Dropdown.Item>
           ))}
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" 
        defaultValue={selectedAmount}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" style={{width:"7em"}}>2024</InputGroup.Text>
        <Form.Control
          placeholder="Enter Your Yearly Budget"
          aria-label="yeatbudget"
          aria-describedby="basic-addon1"
          defaultValue = {personData.YearBudget}
        />
      </InputGroup>
      </Col>
      </>
    )
}
export default SettingsPage;