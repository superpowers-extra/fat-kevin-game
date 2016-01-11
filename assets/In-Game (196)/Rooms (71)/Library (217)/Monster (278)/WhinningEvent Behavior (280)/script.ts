class MonsterWhinningEventBehavior extends Sup.Behavior {
  awake() {
    if (Game.missionName === "Monster") {
      Sup.appendScene("In-Game/Rooms/Library/Monster/Whining Prefab", this.actor);
    }
  }

  update() {}
}
Sup.registerBehavior(MonsterWhinningEventBehavior);

