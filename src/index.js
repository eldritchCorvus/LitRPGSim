import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import generic_menu_music from './Music/generic_menu_music.mp3';
import helen_kin_song from './Music/helen_kin_song.mp3';
import subtle_heart from './Music/subtle_heart.mp3';
import heart from './Music/heart.mp3';
import heartbeat from './Music/heartbeat.mp3';
import clickSound from "./Music/web_SoundFX_254286__jagadamba__mechanical-switch.mp3";

import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';

const audio = new Audio(generic_menu_music);
export let BG_VOLUME = 0.5;
audio.volume = BG_VOLUME;

export function setVolumeMusic(percent){
  audio.volume = percent;
  BG_VOLUME = percent;
}

 export function rageModeSong(){
  console.log("trying to play: ",heart)
  audio.src = heart;
  audio.play();
}

export function justTruthSong(){
  console.log("trying to play just truth: ",heartbeat)
  audio.src = heartbeat;
  audio.play();
}

 function playLightlyFuckedUpBGMusic(){
  console.log("trying to play lightly fucked up music")
  audio.play();
  audio.onended = function() {
    if(!window.rageMode && !window.justTruthMode){
      if (Math.random() > 0.5) {
        audio.src = helen_kin_song;
      } else {
        audio.src = subtle_heart;
      }
    }else if (window.justTruthMode){
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

export const clickEffect = () =>{
  const audio = new Audio(clickSound);
  audio.play();

}




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
