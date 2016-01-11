class RightCorridorCleaBirthdayEventBehavior extends Sup.Behavior {
  awake() {
    if (Game.missionName === "Birthday" && !MissionBirthday.completedQuestion) {
      Sup.appendScene("In-Game/Rooms/Right Corridor/Birthday/Clea Prefab", this.actor);
    }
  }
}
Sup.registerBehavior(RightCorridorCleaBirthdayEventBehavior);
