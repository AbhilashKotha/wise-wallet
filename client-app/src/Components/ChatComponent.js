import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faRobot } from '@fortawesome/free-solid-svg-icons';
import '../styles/ChatComponent.css'

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [typing, settyping] = useState(false);
    const handleInputChange = (event) => {
      setInputText(event.target.value);
    };
    const fetchResponse = async (question) => {
        try {
          const response = await fetch('http://localhost:5000/process_pdf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          return data.response.message;
        } catch (error) {
          console.error('Error fetching response:', error);
          return 'An error occurred while fetching the response.';
        }
      };
  
    const handleSendMessage = () => {
      if (inputText.trim() === '') return;
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, sender: 'user' },
      ]);
      settyping(true);
      fetchResponse(inputText)
      .then((response) => {
        settyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response, sender: 'bot' },
        ]);
        setInputText('');
      })
      .catch((error) => {
        console.error('Error fetching response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'An error occurred while fetching the response.', sender: 'bot' },
        ]);
      });
    //   setTimeout(() => {
    //     setMessages((prevMessages) => [
    //       ...prevMessages,
    //       { text: 'This is a sample response.', sender: 'bot' },
    //     ]);
    //     setInputText('');
    //   }, 1000);
      
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSendMessage();
        }
      };
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="chat-window">
              <div className="chat-messages">
                {messages.map((message, index) => (
                
                  <div key={index} className={`message ${message.sender}`}>
                    
                    {message.sender === 'user' ? (
                        <>
                      <div className="message-bubble">{message.text}</div>
                      <FontAwesomeIcon icon={faUser} />
                      </>
                    ) : (
                        <>
                        <FontAwesomeIcon icon={faRobot} />
                      <div className="message-bubble">{message.text}</div>
                        </>
                      
                    )}
                    
                  </div>

                
                ))}
                {typing&&(
                <div className={`message bot`}>
                    
                        <FontAwesomeIcon icon={faRobot} />
                      <div className="message-bubble">Typing...</div>
                  </div>
                )}
              </div>
            </div>
            <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown} 
                />
                <button className="btn btn-primary" onClick={handleSendMessage}>
                  Send
                </button>
              </div>
          </div>
        </div>
      </div>
    );
  };

export default ChatComponent;
