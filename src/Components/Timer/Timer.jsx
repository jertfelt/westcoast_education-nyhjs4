import { useState } from "react";
import styled from "styled-components";

const TimerDiv = styled.div`
padding:1rem;
font-family: Sofia Sans;
color: ${({ theme }) => theme.toggleBorder};
.timer{
  background: ${({ theme }) => theme.background};
  cursor: pointer;
  padding: 2rem;
  text-align: center;
}
.mode-button{
  font-size: 16px;
  height: 28px;
  cursor: pointer;
  box-shadow: none;
  font-weight: 300;
  color: ${({ theme }) => theme.toggleBorder};
  border: 1px solid transparent;
  margin: 0px;
  border-radius: 4px;
  padding: 2px 12px;
  background: none;
  &:hover{
    background-color: ${({ theme }) => theme.toggleBorder};
    color:  ${({ theme }) => theme.text};
  }
  &:active {
    border-color: ${({ theme }) => theme.text};
  }
}

.button-group{

button{
  &:active, &:focus{
    outline: none;
  }
}

}
.clock{
  text-align:center;
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 11rem;
  line-height: 1;
  display: flex;
  align-items: center;

}
.main-button{
  font-size: 22px;
  height: 55px;
  text-transform: uppercase;
  color: $color-white;
  font-weight: bold;
  width: 200px;
  background-color:  ${({ theme }) => theme.buttonText};
  border-width: initial;
  border-style: none;
  margin: 20px 0px 0px;
  padding: 0px 12px;
  border-radius: 4px;
  transition: color 0.5s ease-in-out 0s;
  &:hover{
    background: ${({ theme }) => theme.text};
  }
  &:active{
    transform: translateY(6px);
    box-shadow: none;
    outline: none;
  }
}


.hidden{
  visibility: hidden;
  display:none;
}
`


const Timer = () => {
  const [started, setStarted] = useState(false)
  const [Command, setCommand] = useState("Start")

  const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    sessions: 0,
    remainingTime: 0,
    mode: "",
  };
 
  let interval;

  const switchMode = (mode) => {
    timer.mode = mode;
    timer.remainingTime = {
      total: timer[mode] * 60,
      minutes: timer[mode],
      seconds: 0,
    };
    document
      .querySelectorAll('button[data-mode]')
      .forEach(e => e.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    updateClock();
  }

  const handleMode = (e) => {
   
    const mode = e.target.getAttribute("data-mode")
   
    if (!mode) return;
    switchMode(mode);
    stopTimer();
  }
 


const startClock = (e) => {
  e.preventDefault()

  console.log(e.target.getAttribute("data-action"))
  const action = e.target.getAttribute("data-action")
  if (action === 'start') {
    startTimer(e);
    setStarted(true)
  } else {
    stopTimer(e);
  }
}

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;
  const total = Number.parseInt(difference / 1000, 10);
  const minutes = Number.parseInt((total / 60) % 60, 10);
  const seconds = Number.parseInt(total % 60, 10);
  return {
    total,
    minutes,
    seconds,
  };
}
function startTimer() {
  
  let { total } = timer.remainingTime;
  const endTime = Date.parse(new Date()) + total * 1000;
  if (timer.mode === 'pomodoro') timer.sessions++;
  setCommand("Stopp")

  interval = setInterval(function() {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();
    total = timer.remainingTime.total;
    console.log(total)
    if (total <= 0) {
      clearInterval(interval);
      switch (timer.mode) {
        case 'pomodoro':
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode('longBreak');
          } else {
            switchMode('shortBreak');
          }
          break;
        default:
          switchMode('pomodoro');
      }
      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  setCommand("Start")
  setStarted(false)
}
function updateClock() {
  
  const { remainingTime } = timer;
  console.log(remainingTime)
  const minutes = `${remainingTime.minutes}`.padStart(2, '0');
  const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  const min = document.getElementById('js-minutes');
  const sec = document.getElementById('js-seconds');
  min.textContent = minutes;
  sec.textContent = seconds;
  const text =
    timer.mode === 'pomodoro' ? 'Tillbaka till arbetet' : 'Ta en paus!';
  document.title = `${minutes}:${seconds} — ${text}`;
  
}
//*-----default
document.addEventListener('DOMContentLoaded', () => {
  switchMode('pomodoro');
});

  return ( 
  <TimerDiv>
    <div className="timer">
    <div 
    className="button-group 
    mode-buttons" 
    id="buttonsModes">
      <button
        data-mode="pomodoro"
        onClick={(e) =>handleMode(e)}
        className="mode-button"
        id="js-pomodoro"
      >
        Pomodoro
      </button>
      <button
        data-mode="shortBreak"
        className="mode-button"
        onClick={(e) =>handleMode(e)}
        id="js-short-break"
      >
        Kort paus
      </button>
      <button
        data-mode="longBreak"
        onClick={(e) =>handleMode(e)}
        className="mode-button"
        id="longBreakButt"
      >
        Lång paus
      </button>
    </div>
  <div 
  className="clock" 
  id="js-clock">
    <span id="js-minutes">25</span>
    <span className="separator">:</span>
    <span id="js-seconds">00</span>
  </div>
  <button 
    onClick={(e) => startClock(e)}
    className="main-button" 
    data-action={started ? "stop" :"start"} 
    id="timerButt">
    {Command}
  </button>
    </div>



  </TimerDiv> );
}
 
export default Timer;