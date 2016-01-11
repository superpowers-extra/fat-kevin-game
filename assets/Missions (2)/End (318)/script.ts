missionSpawns["End"] = {
  startScene: "Playground",
  startSpawnpoint: "Locker Room Spawn"
};

module MissionEnd
{
  export let hasKey: boolean = false;
  export let hasCard: boolean = false;
  
  export function reset() {
    hasKey = false;
    hasCard = false;
  }
}