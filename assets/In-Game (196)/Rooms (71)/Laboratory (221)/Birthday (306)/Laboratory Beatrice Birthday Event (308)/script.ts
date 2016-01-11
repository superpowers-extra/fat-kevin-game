class LaboratoryBeatriceBirthdayEventBehavior extends Sup.Behavior {
  awake() {
    if (Game.missionName === "Birthday") {
      Sup.appendScene("In-Game/Rooms/Laboratory/Birthday/Beatrice Prefab", this.actor);
    }
  }
}
Sup.registerBehavior(LaboratoryBeatriceBirthdayEventBehavior);
