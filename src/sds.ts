import React from "react";

// const randomAgent = (swarm: Agent[]) => swarm[Math.floor(Math.random() * swarm.length)]

export interface Agent<Hyp> {
  id: number;
  hyp: Hyp | null;
  active: boolean;
}

interface DiffuseAction<Hyp> {
  type: "diffuse";
  randomHyp: () => Hyp;
  randomAgent: (swarm: Agent<Hyp>[]) => Agent<Hyp>;
}

type Microtest<Hyp> = (hyp: Hyp) => boolean;

interface TestAction<Hyp> {
  type: "test";
  randomMicrotest: () => Microtest<Hyp>;
}

type SwarmAction<Hyp> = DiffuseAction<Hyp> | TestAction<Hyp>;

const swarmReducer = <Hyp>(
  swarm: Agent<Hyp>[],
  action: SwarmAction<Hyp>
): Agent<Hyp>[] => {
  switch (action.type) {
    case "diffuse":
      return swarm.map((agent) => {
        if (agent.active) {
          return agent;
        }
        const otherAgent = action.randomAgent(swarm);
        return {
          ...agent,
          hyp: otherAgent.active ? otherAgent.hyp : action.randomHyp(),
        };
      });
    case "test":
      return swarm.map((agent) => {
        return agent.hyp !== null
          ? {
              ...agent,
              active: action.randomMicrotest()(agent.hyp),
            }
          : agent;
      });
  }
};

export const useSDS = <Hyp>(
  initSwarm: Agent<Hyp>[],
  target: string,
  searchSpace: string,
  randomMicrotest: () => Microtest<Hyp>,
  randomHyp: () => Hyp,
  randomAgent: (swarm: Agent<Hyp>[]) => Agent<Hyp>,
) => {
  const [swarm, dispatch] = React.useReducer<
    React.Reducer<Agent<Hyp>[], SwarmAction<Hyp>>
  >(swarmReducer, initSwarm);

  const testPhase = () => dispatch({
    type: "test",
    randomMicrotest,
  });

  const diffusionPhase = () => dispatch({
    type: "diffuse",
    randomHyp,
    randomAgent,
  })

  return {
    swarm,
    testPhase,
    diffusionPhase,
  };
};
