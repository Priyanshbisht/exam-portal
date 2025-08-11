// src/pages/Dashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserCircle, FaBell, FaFire, FaTasks, FaHome, FaChartBar,
  FaCog, FaSignOutAlt
} from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import { BsClock } from 'react-icons/bs';
import './Dashboard.css';
import { Images } from '../../Constants';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [profileModal, setProfileModal] = useState(false);
  const [activeTab, setActiveTab] = useState('domain');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const domainTests = [
    { title: 'Domain 1', level: 'Easy', duration: '15 min', description: 'This is an easy test.' },
    { title: 'Domain 2', level: 'Easy', duration: '15 min', description: 'This is an easy test.' },
    { title: 'Domain 3', level: 'Easy', duration: '15 min', description: 'This is an easy test.' },
    { title: 'Domain 4', level: 'Medium', duration: '20 min', description: 'This is a medium test.' },
    { title: 'Domain 5', level: 'Medium', duration: '20 min', description: 'This is a medium test.' },
    { title: 'Domain 6', level: 'Medium', duration: '20 min', description: 'This is a medium test.' },
    { title: 'Domain 7', level: 'Hard', duration: '30 min', description: 'This is a hard test.' },
    { title: 'Domain 8', level: 'Hard', duration: '30 min', description: 'This is a hard test.' }
  ];

  const carouselImages = [
    Images.CourseOne,
    Images.CourseTwo,
    Images.CourseThree,
    Images.CourseFour,
    Images.CourseFive
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

const renderDomainTests = () => {
  return domainTests.map((test, index) => {
    const levelClass = test.level.toLowerCase(); // "easy", "medium", "hard"
    return (
      <div className={`test-card ${levelClass}`} key={index}>
        <div className="test-header" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
          <div><strong>{test.title}</strong> ({test.level})</div>
          <MdArrowDropDown className={`dropdown-icon ${expandedIndex === index ? 'rotated' : ''}`} />
        </div>
        {expandedIndex === index && (
          <div className="test-body">
            <div className="test-info">
              <BsClock /> <span>{test.duration}</span>
              <p>{test.description}</p>
            </div>
            <button className="start-button" onClick={() => navigate('/domain-test')}>Start</button>
          </div>
        )}
      </div>
    );
  });
};


  const renderMockTests = () => (
    <div className="mock-locked">
      <p>Please complete the domain tests to unlock.</p>
      {[1, 2, 3].map((num) => (
        <div className="test-card locked" key={num}>
          <div className="test-header">
            <div><strong>Mock Test {num}</strong></div>
            <MdArrowDropDown className="dropdown-icon" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => (
    <div className="tab-section">
      {activeTab === 'domain' ? renderDomainTests() : renderMockTests()}
    </div>
  );

  return (
    <div className="dashboard-root">
      <div className="sidebar">
        <div className="nav-item" onClick={() => navigate('/dashboard')}><FaHome /> Dashboard</div>
        <div className="nav-item"><FaTasks /> Tasks</div>
        <div className="nav-item"><FaChartBar /> Status</div>
        <div className="nav-item"><FaUserCircle /> Profile</div>
      </div>

      <div className="main-content">
        <div className="dashboard-header">
          <div className="logo">Exam Portal</div>
          <div className="nav-icons">
            <FaBell className="nav-icon" title="Notifications" onClick={() => navigate('/notifications')} />
            <FaFire style={{ color: 'limegreen' }} />
            <FaUserCircle
              className="nav-icon"
              size={30}
              title="Profile"
              onClick={() => setProfileModal(!profileModal)}
            />
            {profileModal && (
              <div className="profile-modal">
                <div onClick={() => alert('Settings Clicked')}><FaCog /> Settings</div>
                <div onClick={() => alert('Logout Clicked')}><FaSignOutAlt /> Logout</div>
              </div>
            )}
          </div>
        </div>

        <div className="carousel-wrapper">
          <img
            src={carouselImages[currentSlide]}
            alt={`Slide ${currentSlide}`}
            className="carousel-img"
            onError={(e) => {
              e.target.style.opacity = 0.2;
              e.target.src = 'https://via.placeholder.com/800x250?text=Image+not+found';
            }}
          />
          <div className="carousel-dots">
            {carouselImages.map((_, idx) => (
              <span key={idx} className={`dot ${idx === currentSlide ? 'active' : ''}`} />
            ))}
          </div>
        </div>

        <div className="statistics">
          <div className="stat-card"><p>Created By</p><h3>Priyansh</h3></div>
          <div className="stat-card"><p>Visited People</p><h3>351</h3></div>
          <div className="stat-card"><p>Certifications</p><h3>4</h3></div>
        </div>

        <div className="segmented-tabs">
          <div className={`tab ${activeTab === 'domain' ? 'active' : ''}`} onClick={() => setActiveTab('domain')}>Domain</div>
          <div className={`tab ${activeTab === 'mock' ? 'active' : ''}`} onClick={() => setActiveTab('mock')}>Mock Test</div>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
