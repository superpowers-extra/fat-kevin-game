class DealerEventBehavior extends Sup.Behavior {
  start() {
    if (Game.missionName === "Granny" && !MissionGranny.gumGiven) {
      Sup.appendScene("In-Game/Rooms/Playground/Granny/DealerBoy Prefab", this.actor);
    }
  }
}
Sup.registerBehavior(DealerEventBehavior);
