import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

import {
  faYoutube,
  faGithub,
  faTelegram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import avatar from "../assets/avatar.png";

import "./BusinessCard.css";
import { useBusinessCardContract } from "../hooks/useBusinessCardContract";
import { useEffect, useState } from "react";

export const BusinessCard = () => {
  const { likes, userInfo, sendLike, sendDisike, setInformation } =
    useBusinessCardContract();
  const [userName, setUserName] = useState("");
  const [userProfession, setUserProfession] = useState("");
  const [userBio, setUserBio] = useState("");

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.name);
      setUserProfession(userInfo.profession);
      setUserBio(userInfo.bio);
    }
  }, [userInfo]);

  return (
    <div className="container">
      <div className="img-container">
        <img className="main-img" src={avatar} alt="me" />
      </div>

      <div className="sub-container">
        <div className="like-container">
          <FontAwesomeIcon
            icon={faHeart}
            className="heart-icon"
            onClick={sendLike}
          />
          &nbsp;<span>{likes}</span>&nbsp;
          <FontAwesomeIcon
            icon={faHeartBroken}
            className="heart-icon"
            onClick={sendDisike}
          />
        </div>

        <div className="about">
          <h3>Name</h3>
          <input
            value={userInfo ? userName : "loading..."}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="interest">
          <h3>Profession</h3>
          <input
            value={userInfo ? userProfession : "loading..."}
            onChange={(e) => setUserProfession(e.target.value)}
          />
        </div>

        <div className="interest">
          <h3>Bio</h3>
          <input
            value={userInfo ? userBio : "loading..."}
            onChange={(e) => setUserBio(e.target.value)}
          />
        </div>

        <button
          onClick={() => setInformation(userName, userProfession, userBio)}
        >
          Update
        </button>
      </div>

      <div className="footer">
        <a
          href="https://www.youtube.com/"
          aria-label="YouTube"
          className="youtube"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>

        <a
          href="https://github.com/dmitrap"
          aria-label="GitHub"
          className="github"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>

        <a
          href="https://t.me/s0m3guy1nj3ans"
          aria-label="Telegram"
          className="telegram"
        >
          <FontAwesomeIcon icon={faTelegram} />
        </a>

        <a
          href="https://twitter.com/dmitrap"
          aria-label="Twitter"
          className="twitter"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </div>
  );
};
