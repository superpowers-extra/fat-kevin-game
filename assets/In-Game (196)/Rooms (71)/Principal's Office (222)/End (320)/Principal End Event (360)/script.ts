class PrincipalEndEventBehavior extends Sup.Behavior {
  start() {
    if (Game.missionName == "End" && MissionEnd.hasKey && MissionEnd.hasCard) {
      Sup.appendScene("In-Game/Rooms/Principal's Office/End/Principal Prefab", this.actor);
    }
  }
}
Sup.registerBehavior(PrincipalEndEventBehavior);
