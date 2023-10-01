import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { faYoutube, faGithub, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import avatar from "../assets/avatar.png"

import './BusinessCard.css';
import { useBusinessCardContract } from "../hooks/useBusinessCardContract";

export function BusinessCard() {
  const { likes, userInfo, sendLike } = useBusinessCardContract();

  return (
    <div className="container">
      <div className="img-container">
        <img className="main-img" src={avatar} alt="me" />
      </div>

      <div className="sub-container">
        <div className="like-container" onClick={sendLike}>
          <FontAwesomeIcon icon={faHeart} className="heart-icon" />
          &nbsp;<span>{likes}</span>
        </div>

        <div className="about">
          <h3>Name</h3>
          <input value={userInfo ? userInfo.name : "loading..."} />
        </div>
        <div className="interest">
          <h3>Profession</h3>
          <input value={userInfo ? userInfo.profession : "loading..."} />
        </div>
        <div className="interest">
          <h3>Bio</h3>
          <input value={userInfo ? userInfo.bio : "loading..."} />
        </div>
        <button>Update</button>
      </div>

      <div className="footer">
        <a
          href="https://www.linkedin.com/"
          aria-label="YouTube"
          className="youtube"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a
          href="https://github.com/eanisei"
          aria-label="GitHub"
          className="github"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="https://t.me/cyber_ea"
          aria-label="Telegram"
          className="telegram"
        >
          <FontAwesomeIcon icon={faTelegram} />
        </a>
        <a
          href="https://twitter.com/eanisei"
          aria-label="Twitter"
          className="twitter"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </div>
  );
}


