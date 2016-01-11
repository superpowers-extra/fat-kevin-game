missionSpawns["Monster"] = {
  startScene: "Library",
  startSpawnpoint: "Left Corridor Spawn"
};

module MissionMonster {
  export let talkToGaetan = false;
  export let cryingBoy = false;
  export let hasWateringCan = false;
  
  export function reset() {
    talkToGaetan = false;
    cryingBoy = false;
    hasWateringCan = false;
  }
}
