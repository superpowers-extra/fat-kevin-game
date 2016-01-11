missionSpawns["Granny"] = {
  startScene: "Entrance",
  startSpawnpoint: "Entrance Spawn"
};

module MissionGranny {
  export let appleState = "toFind"; // toPickUp, pickedUp
  export let appleGiven = false;
  export let gumGiven = false;
  
  export function reset() {
    appleState = "toFind";
    appleGiven = false;
    gumGiven = false;
  }
}
