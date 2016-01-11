class GrannyTeacherEventBehavior extends Sup.Behavior {
  awake() {
    if (Game.missionName !== "Monster") {
      Sup.appendScene("In-Game/Rooms/Classroom/Granny/Teacher Prefab", this.actor);
    }
  }
}
Sup.registerBehavior(GrannyTeacherEventBehavior);
