import React, { useState } from 'react';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className="accordion" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && <div className="panel">{content}</div>}
    </div>
  );
};

const NestedAccordion = ({ data }) => {
  const renderContent = (content) => {
    if (typeof content === 'object') {
      return Object.keys(content).map((key) => (
        <div key={key}>
          <strong>{key}:</strong> {content[key]}
        </div>
      ));
    }
    return content;
  };

  return (
    <div>
      {Object.keys(data).map((key) => (
        <Accordion
          key={key}
          title={key}
          content={Object.keys(data[key]).map((childKey) => (
            <Accordion
              key={childKey}
              title={childKey}
              content={renderContent(data[key][childKey])}
            />
          ))}
        />
      ))}
    </div>
  );
};

const App = () => {
  // Mock API response
  const apiResponse = {
    LearningResources: {
      Resource1: 'https://www.investopedia.com/articles/pf/08/save-money.asp',
      Resource2: 'https://www.youtube.com/watch?v=_10iZfOO6FY',
    },
    Suggestions: {
      Suggestion1: {
        Category: 'Food & Dining',
        CurrentSpending: '$267.04',
        Strategy:
          'Minimize the amount spent on eating out or ordering in from restaurants. Consider meal preparation at home, or finding less expensive dining options.',
        SuggestedSpending: '$200',
      },
      Suggestion2: {
        Category: 'Electronics',
        CurrentSpending: '$2398.97',
        Strategy:
          'Avoid impulsive electronic purchases. Try to only buy essential items or wait for sales before upgrading.',
        SuggestedSpending: '$1500',
      },
      Suggestion3: {
        Category: 'Travel',
        CurrentSpending: '$1245.00',
        Strategy:
          'Reduce the frequency or extravagance of vacations or trips. Consider alternatives like public transportation, shared rides or biking for local traveling.',
        SuggestedSpending: '$800',
      },
    },
  };

  return (
    <div>
      <h1>Nested Accordions</h1>
      <NestedAccordion data={apiResponse} />
    </div>
  );
};

export default App;
