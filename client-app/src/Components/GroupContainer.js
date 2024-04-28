import React, { useState, useRef, useEffect } from 'react';
import Group from './GroupComponent';
import '../styles/GroupContainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {  Row, Button, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

const GroupContainer = () => {

    const [newGroupName, setNewGroupName] = useState('');
    const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    //const [groupsData, setGroupsData] = useState([]); // State to store fetched groups

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

  const mockFriends = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson' },
    { id: 4, firstName: 'Alice', lastName: 'Williams' },
    { id: 5, firstName: 'Abhilash', lastName: '' },
    // Add more friends as needed
  ];

  const mockContacts = [
    { id: 1, firstName: 'John', lastName: 'Doe', registered: true },
    { id: 2, firstName: 'Jane', lastName: 'Smith', registered: false },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', registered: true },
    { id: 4, firstName: 'Alice', lastName: 'Williams', registered: false },
    { id: 5, firstName: 'Abhilash', lastName: '', registered: true },
    // Add more contacts as needed
  ];

  const containerRef = useRef(null);
  const [groups, setGroups] = useState([]);

  const handleScrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      const currentScroll = container.scrollLeft;
      const scrollAmount = Math.min(currentScroll, container.clientWidth);
      container.scrollLeft -= scrollAmount;
    }
  };

  const handleScrollRight = () => {
    const container = containerRef.current;
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      const scrollAmount = Math.min(maxScroll - currentScroll, container.clientWidth);
      container.scrollLeft += scrollAmount;
    }
  };

  const handleCreateGroupClick = () => {
    setShowCreateGroupModal(true);
  };

  const handleCreateGroupModalClose = () => {
    setShowCreateGroupModal(false);
    setNewGroupName('');
  };

  const handleAddFriendsClick = () => {
    setShowAddFriendsModal(true);
  };

  const handleAddFriendsModalClose = () => {
    setShowAddFriendsModal(false);
  };

  const handleGroupNameChange = (e) => {
    setNewGroupName(e.target.value);
  };

  const handleInviteFriend = (friendId) => {
    console.log(`Inviting friend with ID ${friendId}`);
    // Add logic to invite the friend to the new group
  };

  const handleAddFriend = (friendId) => {
    console.log(`Adding friend with ID ${friendId}`);
    // Add logic to add the friend to the app
  };

  const getFilteredFriends = () => {
    const existingFriends = groups.flatMap((group) =>
      group.data.map((member) => `${member.name}`)
    );
    return mockFriends.filter(
      (friend) =>
        !existingFriends.includes(`${friend.firstName} ${friend.lastName}`)
    );
  };

  const filteredFriends = getFilteredFriends();


  // Check for scroll overflow and update button visibility
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const updateButtonVisibility = () => {
      const container = containerRef.current;
      if (container) {
        setShowLeftButton(container.scrollLeft > 0);
        setShowRightButton(container.scrollWidth > container.clientWidth + container.scrollLeft);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateButtonVisibility);
    }

    updateButtonVisibility();
    window.addEventListener('resize', updateButtonVisibility);

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateButtonVisibility);
      }
      window.removeEventListener('resize', updateButtonVisibility);
    };
  }, [containerRef]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col position-relative">
            <button
              className={`scroll-button left ${!showLeftButton && 'hidden'}`}
              onClick={handleScrollLeft}
              disabled={!showLeftButton}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div ref={containerRef} className="d-flex overflow-auto">
              {groups.map((group, index) => (
                <div key={group.id} className="col-md-3 col-each-group">
                  <Group key={group.id} groupName={group.name} data={group.data} />
                </div>
              ))}
            </div>
            <button
              className={`scroll-button right ${!showRightButton && 'hidden'}`}
              onClick={handleScrollRight}
              disabled={!showRightButton}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="col-md-3 text-center mt-3">
            <Row className="row-md-6"> 
            <Button variant="primary" onClick={handleCreateGroupClick}>Create Group</Button>
            </Row>
            <Row className="row-md-6">
            <Button variant="primary" onClick={handleAddFriendsClick}>Add Friends</Button>
            </Row>
          </div>
        </div>
        <Modal show={showCreateGroupModal} onHide={handleCreateGroupModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group name"
                value={newGroupName}
                onChange={handleGroupNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formFriendList">
            <Form.Label style={{paddingTop:'0.5rem', paddingBottom:'0.5rem'}}>Invite Friends</Form.Label>
            {filteredFriends.map((friend) => (
                <div key={friend.id} className="d-flex mb-2">
                <span className="col-6 filtered-friends-name"> {/* Set width for friend name column */}
                    {friend.firstName} {friend.lastName}
                </span>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleInviteFriend(friend.id)}
                >
                    Invite to Group
                </Button>
                </div>
            ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCreateGroupModalClose}>
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddFriendsModal} onHide={handleAddFriendsModalClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group controlId="formFriendList">
                <Form.Label style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                Contacts
                </Form.Label>
                <div className="d-flex flex-column overflow-auto contact-list">
                {/* Registered friends first */}
                {mockContacts.filter((friend) => friend.registered).length > 0 && (
                    <>
                    <div className="registered-friends-header">Registered Contacts</div>
                    {mockContacts.filter((friend) => friend.registered).map((friend) => (
                        <div key={friend.id} className="d-flex mb-2 align-items-center">
                        <span className="col-6 filtered-friends-name">
                            {friend.firstName} {friend.lastName}
                        </span>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleAddFriend(friend.id)}
                        >
                            Add
                        </Button>
                        </div>
                    ))}
                    <hr />
                    </>
                )}

                {/* Non-registered friends next */}
                {filteredFriends.filter((friend) => !friend.registered).length > 0 && (
                    <>
                    <div className="non-registered-friends-header">Non-Registered Contacts</div>
                    {mockContacts.filter((friend) => !friend.registered).map((friend) => (
                        <div key={friend.id} className="d-flex mb-2 align-items-center">
                        <span className="col-6 filtered-friends-name">
                            {friend.firstName} {friend.lastName}
                        </span>
                        <OverlayTrigger overlay={<Tooltip>Send invite to register</Tooltip>}>
                            <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleInviteFriend(friend.id)}
                            >
                            Invite
                            </Button>
                        </OverlayTrigger>
                        </div>
                    ))}
                    </>
                )}
                </div>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleAddFriendsModalClose}>
            Cancel
            </Button>
        </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default GroupContainer;