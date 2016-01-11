class JuiceGumEventBehavior extends Sup.Behavior {
  awake() {
    if (Game.missionName === "Granny" && !MissionGranny.appleGiven) {
      Sup.appendScene("In-Game/Rooms/Left Corridor/Granny/JuiceGumBoy Prefab", this.actor);
      Sup.getActor("Classroom Door").getBehavior(RoomChangerBehavior).disabled = true;
    }
  }
}
Sup.registerBehavior(JuiceGumEventBehavior);
