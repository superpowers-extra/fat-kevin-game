missionSpawns["Birthday"] = {
  startScene: "Left Corridor",
  startSpawnpoint: "Classroom Spawn"
};

module MissionBirthday {
  export let hasInvitation = { Gaetan: false, Beatrice: false };
  export let completedQuestion: boolean = false;
  
  export function reset() {
    hasInvitation = { Gaetan: false, Beatrice: false };
    completedQuestion = false;
  }
}
