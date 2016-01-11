class MonsterGaetanEventBehavior extends Sup.Behavior {
  awake() {
    if (Game.missionName === "Monster") {
      Sup.appendScene("In-Game/Rooms/Library/Monster/Gaetan Prefab", this.actor);
    }
  }

  update() {}
}
Sup.registerBehavior(MonsterGaetanEventBehavior);

