import React from 'react';
import './Notification.css';
import { FaBell } from 'react-icons/fa';

const notifications = [
  '📢 Domain 1 test has been updated.',
  '✅ You completed Domain 4 test.',
  '🎉 Mock Tests are now unlocked!',
  '🕒 Your next test is scheduled tomorrow.',
  '⚠️ Don’t forget to review Domain 3.'
];

const Notification = () => {
  return (
    <div className="notification-container">
      <h2 className="notification-header"><FaBell /> Notifications</h2>
      <ul className="notification-list">
        {notifications.map((note, idx) => (
          <li key={idx} className="notification-item">{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
