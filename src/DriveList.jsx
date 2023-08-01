// DriveList.js
import React from 'react';
import './DriveList.css';

const DriveList = ({ drives }) => { // Change 'data' to 'drives' here
  return (
    <div className="drive-list">
      {drives.map((drive, index) => (
        <div className="drive-card" key={index}>
          <h2>{drive.Company}</h2>
          <p>Drive Code: {drive.driveCode}</p>
          <p>Drive Date: {drive.driveDate}</p>
          <p>Register By: {drive.RegisterBy}</p>
          <p>Stream Eligible: {drive.StreamEligible}</p>
          <p>Venue: {drive.Venue}</p>
          <p>Job Profile: <a href={drive.JobProfile} target="_" >Open Profile</a></p>
          <p>Status: {drive.Status}</p>
        </div>
      ))}
    </div>
  );
};

export default DriveList;
