import {React,useEffect,useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Leaderboard from './Leaderboard';
import '../styles/LeaderBoard.css'

const LeaderboardContainer = () => {
  const [groups, setGroups] = useState([]); // State to store fetched groups

  // Fetch groups data on component mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:5000/groups');
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);
      return (
        <>
          <Carousel controls indicators variant="dark">
            {/* Loop through mockGroups to create Carousel Items */}
            {groups.map((group) => (
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
