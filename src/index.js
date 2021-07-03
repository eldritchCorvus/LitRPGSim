import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import generic_menu_music from './Music/generic_menu_music.mp3';
import { playSong } from "./Utils/MusicPlayer";
import App from './App';
import reportWebVitals from './reportWebVitals';

const click = () =>{
  console.log("first click!");
  playSong(generic_menu_music);
  window.removeEventListener('click', click);
}
window.addEventListener('click', click);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('ThisIsNotAGame')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
