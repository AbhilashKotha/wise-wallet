import React from 'react';
import { Container } from 'react-bootstrap';
import "../styles/AboutComponent.css"

const AboutComponent = () => {
  return (
    <Container className="d-flex justify-content-center mb-4">
      <div className="text-left mb-3 min-vh-100">
        <h2 className="mb-4">About the application</h2>
        <p className="about-content">
          Our web application specializes in extracting specific details from user banks and allows the users to socialize and buget.
        </p>
      </div>
    </Container>
  );
};

export default AboutComponent;