class PlaygroundGaetanBirthdayEventBehavior extends Sup.Behavior
{
  awake()
  {
    if (Game.missionName === "Birthday") {
      let actor = Sup.appendScene("In-Game/Rooms/Playground/Birthday/Gaetan Prefab", this.actor)[0];
    }
  }
}
Sup.registerBehavior(PlaygroundGaetanBirthdayEventBehavior);
