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
  const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    sessions: 0,
  };
  const buttSound = new Audio('sound/button-sound.mp3');
  
  const mainButt = document.getElementById("timerButt");
  const modeButtons = document.querySelector("#buttonsModes");

  
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

  const handleMode = (event) => {
    const { mode } = event.target.dataset;
    if (!mode) return;
    switchMode(mode);
    stopTimer();
  }
  modeButtons.addEventListener('click', handleMode);
mainButt.addEventListener('click', () => {
  buttSound.play();
  const { action } = mainButt.dataset;
  if (action === 'start') {
    startTimer();
  } else {
    stopTimer();
  }
});
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
  mainButt.dataset.action = 'stop';
  mainButt.textContent = 'stopp';
  mainButt.classList.add('active');
  interval = setInterval(function() {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();
    total = timer.remainingTime.total;
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
      document.querySelector(`[data-sound="${timer.mode}"]`).play();
      startTimer();
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(interval);
  mainButt.dataset.action = 'start';
  mainButt.textContent = 'start';
  mainButt.classList.remove('active');
}
function updateClock() {
  const { remainingTime } = timer;
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
        className="mode-button"
        id="js-pomodoro"
      >
        Pomodoro
      </button>
      <button
        data-mode="shortBreak"
        className="mode-button"
        id="js-short-break"
      >
        Kort paus
      </button>
      <button
        data-mode="longBreak"
        className="mode-button"
        id="longBreakButt"
      >
        Lång paus
      </button>
    </div>
  <div className="clock" 
  id="js-clock">
    <span id="js-minutes">25</span>
    <span className="separator">:</span>
    <span id="js-seconds">00</span>
  </div>
  <button className="main-button" 
  data-action="start" 
  id="timerButt">
    Start
  </button>
    </div>


    <div className="hidden">
      <audio src="sound/backtowork.mp3" data-sound="pomodoro"></audio>
      <audio src="sound/Radiation Meter.mp3" data-sound="shortBreak"></audio>
      <audio src="sound/Radiation Meter.mp3" data-sound="longBreak"></audio>
    </div>

  </TimerDiv> );
}
 
export default Timer;