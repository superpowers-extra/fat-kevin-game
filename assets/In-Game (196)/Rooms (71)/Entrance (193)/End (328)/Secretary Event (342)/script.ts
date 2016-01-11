class SecretaryEventBehavior extends Sup.Behavior {
  start() {
    if (Game.missionName !== "End") Sup.appendScene("In-Game/Rooms/Entrance/End/Secretary Prefab", this.actor)[0];
  }
}
Sup.registerBehavior(SecretaryEventBehavior);
