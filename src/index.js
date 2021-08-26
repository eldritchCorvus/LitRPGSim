import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import generic_menu_music from './Music/generic_menu_music.mp3';
import helen_kin_song from './Music/helen_kin_song.mp3';
import subtle_heart from './Music/subtle_heart.mp3';
import heart from './Music/heart.mp3';
import heartbeat from './Music/heartbeat.mp3';
import voice from './Voice/truthtake3.mp3';
import funky_voice from './Voice/truth_but_funky.mp3';

import clickSound from "./Music/web_SoundFX_254286__jagadamba__mechanical-switch.mp3";
import ghost from "./Voice/507451__horroraudio__ghost-kid-sigh-less-verb.mp3";

import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';

const audio = new Audio(generic_menu_music);
const voiceAudio = new Audio(voice);
const clickAudio = new Audio(clickSound);

export let BG_VOLUME = 0.5;
audio.volume = BG_VOLUME;

export function setVolumeMusic(percent){
  audio.volume = percent;
  BG_VOLUME = percent;
}

export function playSecret(location){
  audio.src = require(`./SecretMusic/${location}`).default
  audio.play();
}

 export function rageModeSong(){
  audio.src = heart;
  audio.play();
}

export function speak(){
  voiceAudio.src = voice;
  voiceAudio.play();
}

export function ghost_sound(){
  voiceAudio.src = ghost;
  voiceAudio.play();
}

export function speakButFunky(){
  voiceAudio.src =funky_voice;
  audio.pause();
  voiceAudio.play();
}

export function justTruthSong(){
  audio.src = heartbeat;
  audio.play();
}

 function playLightlyFuckedUpBGMusic(){
  audio.play();
  audio.onended = function() {
    if(!window.rageMode && !window.justTruthMode && !window.cctv && !window.pwMode){
      if (Math.random() > 0.5) {
        audio.src = helen_kin_song;
      } else {
        audio.src = subtle_heart;
      }
    }else if (window.justTruthMode || window.cctv || window.pwMode){
      audio.src = heartbeat;
    }else{
      audio.src = heart;
    }
    audio.play();
};
}

export const click = () =>{
  console.log("first click!");
  playLightlyFuckedUpBGMusic();
  window.removeEventListener('click', click);
}
export const beepEffect = () =>{
  clickAudio.play();
}

export const clickEffect = () =>{
  clickAudio.play();
}


document.getElementById('ThisIsNotAGame')

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('ThisIsNotAGame')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
