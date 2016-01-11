class BeatJuiceEventBehavior extends Sup.Behavior {
  awake() {
    if (Game.missionName === "Granny") {
      let actor = Sup.appendScene("In-Game/Rooms/Cafeteria/Granny/BeatJuiceBoy Prefab", this.actor)[0];
      actor.addBehavior(JuiceBoyBehavior);
      if (MissionGranny.appleState === "toPickUp") actor.addBehavior(BeatJuiceBoyBehavior);
    }
  }
}
Sup.registerBehavior(BeatJuiceEventBehavior);
