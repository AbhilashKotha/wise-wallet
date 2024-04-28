import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Leaderboard from './Leaderboard';
import '../styles/LeaderBoard.css'
const LeaderboardContainer = () => {
    // Sort data in descending order based on rank, then streak as tiebreaker
    const mockGroups = [
        {
          id: 1,
          name: 'Family',
          data: [
            { name: "John", initials: "JM", rank: 1, streak: 0, status: "I am doing it" },
            { name: "Mike", initials: "MK", rank: 3, streak: 2, status: "I will beat you all" },
            { name: "Janardhan", initials: "JJ", rank: 2, streak: 6, status: "I will beat you" },
            { name: "Cyn", initials: "CT", rank: 4, streak: 3, status: "Savin it" },
            { name: "Abhilash", initials: "AK", rank: 6, streak: 4, status: "I will beat you" },
            { name: "Siri", initials: "SG", rank: 5, streak: 6, status: "I will beat you" },
          ],
        },
        {
          id: 2,
          name: 'Friends',
          data: [
            { name: "What", initials: "JM", rank: 1, streak: 0, status: "I am doing it" },
            { name: "ever", initials: "MK", rank: 3, streak: 2, status: "I will beat you all" },
            { name: "the", initials: "JJ", rank: 2, streak: 6, status: "I will beat you" },
            { name: "data", initials: "CT", rank: 4, streak: 3, status: "Savin it" },
            { name: "is", initials: "AK", rank: 6, streak: 4, status: "I will beat you" },
            { name: "this", initials: "AK", rank: 6, streak: 4, status: "I will beat you" },
          ],
        },
        {
            id: 3,
            name: 'College',
            data: [
              { name: "What", initials: "JM", rank: 1, streak: 0, status: "I am doing it" },
              { name: "ever", initials: "MK", rank: 3, streak: 2, status: "I will beat you all" },
              { name: "the", initials: "JJ", rank: 2, streak: 6, status: "I will beat you" },
              { name: "data", initials: "CT", rank: 4, streak: 3, status: "Savin it" },
              { name: "is", initials: "AK", rank: 6, streak: 4, status: "I will beat you" },
              { name: "this", initials: "AK", rank: 6, streak: 4, status: "I will beat you" },
            ],
          },
          {
            id: 4,
            name: 'Lifestyle',
            data: [
              { name: "What", initials: "JM", rank: 1, streak: 0, status: "I am doing it" },
              { name: "ever", initials: "MK", rank: 3, streak: 2, status: "I will beat you all" },
              { name: "the", initials: "JJ", rank: 2, streak: 6, status: "I will beat you" },
              
            ],
          },
          {
            id: 5,
            name: 'Clothing',
            data: [
              { name: "What", initials: "JM", rank: 1, streak: 0, status: "I am doing it" },
              { name: "ever", initials: "MK", rank: 3, streak: 2, status: "I will beat you all" },
              { name: "the", initials: "JJ", rank: 2, streak: 6, status: "I will beat you" },
              { name: "data", initials: "CT", rank: 4, streak: 3, status: "Savin it" },
              { name: "is", initials: "AK", rank: 6, streak: 4, status: "I will beat you" },
              { name: "this", initials: "AK", rank: 6, streak: 4, status: "I will beat you" },
            ],
          },
          
      ];
      return (
        <>
          <Carousel controls indicators variant="dark">
            {/* Loop through mockGroups to create Carousel Items */}
            {mockGroups.map((group) => (
              <Carousel.Item key={group.id}>
                <Leaderboard groupName={group.name} data={group.data} />
                <br />
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      );
    };

export default LeaderboardContainer;
