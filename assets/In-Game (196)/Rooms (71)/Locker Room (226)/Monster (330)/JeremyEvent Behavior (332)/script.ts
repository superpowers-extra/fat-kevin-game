class JeremyEventBehavior extends Sup.Behavior {
  awake() {
    if (Game.missionName === "Monster") {
      Sup.appendScene("In-Game/Rooms/Locker Room/Monster/Jeremy Prefab", this.actor);
    }
  }

  update() {}
}
Sup.registerBehavior(JeremyEventBehavior);
