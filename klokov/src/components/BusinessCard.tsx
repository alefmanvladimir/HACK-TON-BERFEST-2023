

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom } from '@fortawesome/free-solid-svg-icons';

import { faWodu, faTelegramPlane, faTelegram, faZhihu, faEthereum} from '@fortawesome/free-brands-svg-icons';
import avatar from "../assets/avatar.png"

import './BusinessCard.css';
import {useBusinessCardContract} from "../hooks/useBusinessCardContract";

export function BusinessCard() {

    const {likes, userInfo, sendLike} = useBusinessCardContract()

    return (
        <div className='container'>

            <div className='img-container'>
                <img className='main-img' src={avatar} alt="me" />
            </div>

            <div className='sub-container'>

                <div className="like-container">
                    <FontAwesomeIcon icon={faAtom} className="heart-icon" onClick={sendLike} />
                    &nbsp;<span>{likes}</span>
                </div>

                <div className='about'>
                    <h3>Name</h3>
                    <input value={userInfo ? userInfo.name : "loading..."}/>
                </div>
                <div className='interest'>
                    <h3>Profession</h3>
                    <input value={userInfo ? userInfo.profession: "loading..."}/>
                </div>
                <div className='interest'>
                    <h3>Bio</h3>
                    <input value={userInfo ? userInfo.bio : "loading..."}/>
                </div>
                <button>Upd@te</button>
            </div>

            <div className='footer'>
                <a href="https://t.me/shUd4izi" aria-label="YouTube" className="youtube">
                    <FontAwesomeIcon icon={faTelegram} />
                </a>
                <a href="https://t.me/shUd4izi" aria-label="GitHub" className="github">
                    <FontAwesomeIcon icon={faWodu} />
                </a>
                <a href="https://t.me/shUd4izi" aria-label="Telegram" className="telegram">
                    <FontAwesomeIcon icon={faZhihu} />
                </a>
                <a href="https://t.me/shUd4izi" aria-label="Twitter" className="twitter">
                    <FontAwesomeIcon icon={faEthereum} />
                </a>
            </div>
        </div>
    );
}