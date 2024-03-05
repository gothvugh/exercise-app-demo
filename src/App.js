/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import './App.css';
import Stopwatch from './stopwatch.js';
import {useState, useCallback} from 'react';
import Volume from './volume.js';

const Menu_Screen = "menu";
const Exercise_Screen = "exercise";
const Duration_Exercise = "duration";
const Repetition_Exercise = "repetition";
const Volume_Exercise = "volume";

let exerciseArray = [
  {type: Repetition_Exercise, name: "Push Ups"},
  {type: Duration_Exercise, name: "Biking"},
  {type: Repetition_Exercise, name: "Jumping Jacks"},
  {type: Duration_Exercise, name: "Running"},
  {type: Repetition_Exercise, name: "Situps"},
  {type: Volume_Exercise, name: "Barbell Squat"}
];

function DurationFunction({exercise, setMenuScreen}) {
  return <div> 
    <p> {exercise.name} </p>  
    <Stopwatch />
    <button onClick={setMenuScreen}> Main Menu </button>
  </div>
}

function RepetitionFunction({exercise, setMenuScreen}) {
  let [count, setCount] = useState(0);
  return <div>
    <div>
      <p>{exercise.name}</p>
      <p>{count}</p>
      <button onClick={() => setCount(count => count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button><br/>
      <button onClick={setMenuScreen}> Main Menu </button>
    </div>
  </div>
}

function VolumeFunction({exercise, setMenuScreen}) {
  return <div>
    <p>{exercise.name}</p>
    <Volume />
    <button onClick={setMenuScreen}> Main Menu </button>
  </div>
} 
 
function App() {
  let [currentScreen, setcurrentScreen] = useState(Menu_Screen)
  let content = undefined
  let [currentExercise, setcurrentExercise] = useState("")
  let buttonClick = useCallback((exercise) => {
    setcurrentExercise(exercise)
    setcurrentScreen(Exercise_Screen)
  })

  if (currentScreen === Menu_Screen) {
    content = <div>
      <p> Exercise Menu </p>
      <ul>
        {exerciseArray.map((exercise) => {
          return <li> <button onClick = {() => buttonClick(exercise)}>{exercise.name}</button> </li>
        })}
      </ul>
      </div>
  } else if (currentScreen === Exercise_Screen) {
    switch(currentExercise.type) {
      case Duration_Exercise:
      content = <DurationFunction 
      setMenuScreen={()=> setcurrentScreen(Menu_Screen)} 
      exercise={currentExercise}/>
      break;

      case Repetition_Exercise: 
      content = <RepetitionFunction 
      setMenuScreen={()=> setcurrentScreen(Menu_Screen)} 
      exercise={currentExercise}/>
      break;

      case Volume_Exercise:
      content = <VolumeFunction
      setMenuScreen={()=> setcurrentScreen(Menu_Screen)} 
      exercise={currentExercise}/>
      break; 

      default: 
       content = undefined
       break;
    } 
}

return (
  <div className="App">
    <header className="App-header">
      {content}
    </header>
  </div>
)
} 


export default App;
