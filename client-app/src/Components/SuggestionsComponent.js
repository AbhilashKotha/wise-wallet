import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';

const SuggestionsComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const response = await fetch('http://localhost:5000/get_suggestions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "budget": 3000,
                        "day": 20,
                        "spent": 1500
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching response:', error);
            }
        };

        fetchResponse();
    }, []);

    return (
        <>
            {data && (
                <Accordion>
                    {data.map((category, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>{category.name}</Accordion.Header>
                            <Accordion.Body>
                                <Accordion>
                                    {category.data.map((item, itemIndex) => (
                                        <Accordion.Item eventKey={`${index}-${itemIndex}`} key={`${index}-${itemIndex}`}>
                                            <Accordion.Header>{item.heading}</Accordion.Header>
                                            <Accordion.Body>
                                                {item.suggestion ? item.suggestion : (
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                        {item.url}
                                                    </a>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </>
    );
};

export default SuggestionsComponent;
