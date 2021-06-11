import React from 'react'
import Footer from './Footer';
import SetTimer from './SetTimer'


let loop = null;
let autoReset = null
export const Relod = () => {
 
let audio = document.getElementById('beep')
const [state, setState] = React.useState({
  breakCount: 5,
  sessionCount: 25,
  clockCount: 25*60,
  currentTimer: 'Session',
  isPlaying: false,
})
autoReset = state.clockCount

React.useEffect(() => {
 
  return () => {
    clearInterval(loop)
  }
}, [])


const runPlayPause = () => {
  const { isPlaying } = state

  if (isPlaying) {
    clearInterval(loop)
    setState({
      ...state, isPlaying: false
    })
  } else {
    setState({
      ...state, isPlaying: true
    })
    loop = setInterval(() => {
      if (autoReset === 0) {
        setState(state => (
          {
            ...state,
            currentTimer: state.currentTimer === 'Session' ? 'Break' : 'Session',
            clockCount: state.currentTimer === 'Session' ? state.breakCount * 60 : state.sessionCount * 60
          }

        ));
        audio.play();
      } else {
        setState(state => ({ ...state, clockCount: state.clockCount - 1 }));
      }
    }, 1000);
  }
}

const runReset = () => {
  setState({
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: 'Session',
    isPlaying: false,

  })
  clearInterval(loop)
  audio.pause()
  audio.currentTime = 0
}

const convertToTime = (count) => {
  let minutes = Math.floor(count / 60)
  let seconds = count % 60
  minutes = minutes < 10 ? ('0' + minutes) : minutes
  seconds = seconds < 10 ? ('0' + seconds) : seconds
  return `${minutes}:${seconds}`
}
const runLengthChange = (count, timerType) =>{
  const { sessionCount, breakCount, isPlaying, currentTimer ,clockCount} = state;
  let newCount;
  if(timerType === 'session'){
    newCount = sessionCount + count
  }else{
    newCount = breakCount+ count
  }
  if (newCount > 0 &&  newCount < 61 && !isPlaying) {
      setState({
        ...state,
        [timerType+'Count']: newCount,
        clockCount:(currentTimer.toLowerCase() === timerType) ? newCount * 60 : clockCount
      })
  }
}

const breakProps = {
  title:'Break',
  count: state.breakCount,
  runDisminuir: () => runLengthChange(-1,'break'),
  runAumentar: () => runLengthChange(1,'break'),
  
}
const sessionProps = {
  title: 'Session',
  count: state.sessionCount,
  runDisminuir: () => runLengthChange(-1,'session'),
  runAumentar: () => runLengthChange(1,'session')
}
return (
  <div className="container text-light" >
   
    <div className="header text-center pt-2">
      <h1>Pomodoro Clock</h1>
    </div>
    
    <div className="settings d-flex justify-content-around mt-5">
        <SetTimer {...breakProps} />
        <SetTimer {...sessionProps} />
    </div>

    <div className="times">
        <div className="time border border-2">
          <label id='timer-label' className='time-r'>{state.currentTimer}</label>
          <span id='time-left' className="time-l">{convertToTime(state.clockCount)}</span>
        </div>
    </div>
        
        <div className="controller mt-4 d-flex justify-content-center">
          <button id='start_stop' type="button" 
          className="btn btn-outline-primary m-2 fs-3" 
          onClick={runPlayPause}>
              <i className="fa fa-play text-light"></i>
              <i className="fa fa-pause text-light"></i> 
          </button> 

          <button id='reset' type="button" className="btn btn-outline-primary m-2 fs-3" onClick={runReset}>
            <i className="fa fa-sync "></i>
          </button>             
      </div> 
      
      <Footer/>
         

         

  </div>
)
}