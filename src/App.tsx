import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Agent, useSDS } from "./sds";

const initSwarm: Agent<number>[] = [
  { active: true, id: 0, hyp: 0 },
  { active: true, id: 1, hyp: 1 },
  { active: true, id: 2, hyp: 2 },
  { active: true, id: 3, hyp: 3 },
  { active: true, id: 4, hyp: 4 },
  { active: true, id: 5, hyp: 5 },
  { active: true, id: 6, hyp: 6 },
  { active: true, id: 7, hyp: 7 },
  { active: true, id: 8, hyp: 8 },
  { active: true, id: 9, hyp: 9 },
];

const randomMicrotest = () => {
  const microtestIndex = Math.floor(Math.random() * target.length);
  const microtest = (hyp: number) => {
    return (
      hyp + microtestIndex < searchSpace.length &&
      searchSpace.charAt(hyp + microtestIndex) === target.charAt(microtestIndex)
    );
  };
  return microtest;
};

function randomAgent<Hyp>(swarm: Agent<Hyp>[]){
  return swarm[Math.floor(Math.random() * swarm.length)];
}

function randomHyp(searchSpace: string){
  return Math.floor(Math.random() * searchSpace.length);
}

const target = "hello";

const searchSpace = "xhellolloxxxhxlxoxhlloxhellloxxxxxxolllllll";

function App() {
  const { swarm, testPhase, diffusionPhase } = useSDS(
    initSwarm,
    target,
    searchSpace,
    randomMicrotest,
    () => randomHyp(searchSpace),
    randomAgent,
  );
  return (
    <div>
      <button onClick={testPhase}>Test</button>
      <button onClick={diffusionPhase}>Diffuse</button>
      <SwarmList swarm={swarm} />
    </div>
  );
}

export default App;
