import {Agent} from "./sds";
interface SwarmListProps<Hyp> {
  swarm: Agent<Hyp>[];
}

function SwarmList<Hyp>({swarm}: SwarmListProps<Hyp>) {
  return (
    <ul>
      {props.swarm
        .filter((agent) => agent.active)
        .map(({ hyp, active, id }, i) => (
          <li key={id}>
            Agent {id}. Hyp: {`${hyp}`}, Active: {active ? "true" : "false"}
          </li>
        ))}
    </ul>
  );
}

function SwarmHyps<Hyp>({swarm}: SwarmListProps<Hyp>) {
  return (
    <div></div>
  )
}
