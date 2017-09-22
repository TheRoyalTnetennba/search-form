import React, { Component } from 'react';
import './profile.css';

const Profile = (props) => {
  console.log(props);
  if (props.dr) {
    const first_name = props.dr.profile.first_name;
    const last_name = props.dr.profile.last_name;
    const bio = props.dr.profile.bio;
    const title = props.dr.profile.title;
    const image_url = props.dr.profile.image_url;
    return (
      <div className="search-box">
        <h1>{`Dr. ${first_name} ${last_name}, ${title}`}</h1>
        <div className="profile-info">
          <div style={{ backgroundImage: `url(${image_url})` }} className="profile-pic" />
          <p className="bio">{bio}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="hidden" ></div>
    );
  }
}

export default Profile;