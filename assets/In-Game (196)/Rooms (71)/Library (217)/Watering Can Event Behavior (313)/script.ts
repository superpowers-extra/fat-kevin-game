class WateringCanEventBehavior extends Sup.Behavior {
  awake() {
    if (Game.missionName == "Granny" || Game.missionName == "Birthday" || Game.missionName == "Flowers" || (Game.missionName == "Monster" && !MissionMonster.cryingBoy)) {
      Sup.appendScene(Sup.get("In-Game/Rooms/Library/Watering Can Prefab", Sup.Scene), this.actor);
    }
  }
}
Sup.registerBehavior(WateringCanEventBehavior);
