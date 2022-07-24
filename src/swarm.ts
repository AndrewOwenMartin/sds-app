import { Agent} from "./sds";

export function filterActive<Hyp>(swarm: Agent<Hyp>[]): Agent<Hyp>[]{
    return swarm.filter(agent => agent.active)
}


type HypCounter<Hyp> = Map<Hyp, number>;

export function countClusters<Hyp>(swarm: Agent<Hyp>[]): HypCounter<Hyp>{

    const initCountCluster: HypCounter<Hyp> = new Map()
    //const initCountCluster: HypCounter<Hyp> = {}

    return swarm.reduce(
        (acc, agent, swarm) => {
            const hyp = agent.hyp
            if(hyp !== null){
                acc.set(hyp, (acc.get(hyp) ?? 0) + 1)
            }
            return acc
        },
        {} as Map<Hyp, number>
    )
}
