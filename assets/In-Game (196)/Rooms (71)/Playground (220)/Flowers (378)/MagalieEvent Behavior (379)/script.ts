class MagalieEventBehavior extends Sup.Behavior {
  awake() {
    if (Game.missionName === "Flowers") {
      Sup.appendScene("In-Game/Rooms/Playground/Flowers/Magalie Prefab", this.actor);
    }
  }
}
Sup.registerBehavior(MagalieEventBehavior);
