class MonsterTeacherEventBehavior extends Sup.Behavior {
  awake() {
    if (Game.missionName === "Monster") {
      let teacherActor = Sup.appendScene("In-Game/Rooms/Library/Monster/Teacher Prefab", this.actor)[0];
      
      if (MissionMonster.cryingBoy)
        teacherActor.arcadeBody2D.warpPosition(MonsterTeacherNPCBehavior.finalPosition.toVector2());
      else 
        Sup.getActor("Left Corridor Door").getBehavior(RoomChangerBehavior).disabled = true;
      
    }
  }

  
}
Sup.registerBehavior(MonsterTeacherEventBehavior);

