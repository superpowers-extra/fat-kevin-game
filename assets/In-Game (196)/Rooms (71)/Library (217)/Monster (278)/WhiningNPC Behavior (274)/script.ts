class MonsterWhiningNPCBehavior extends InteractiveBehavior {
  interact()
  {
    this.actor.setLocalEulerY(this.position.angleTo(Game.kevinBehavior.position) + Math.PI / 2);
    if (MissionMonster.hasWateringCan) {
      MissionMonster.cryingBoy = true;
      Game.kevinBehavior.actor.getChild("Watering Can").destroy();
      
      //set anim crying
      this.actor.modelRenderer.setAnimation("Idle Fight");
      
      this.headIcon.setVisible(false);
      Sup.getActor("Left Corridor Door").getBehavior(RoomChangerBehavior).disabled = false;


    } else Game.dialogBehavior.speak("Kevin", "whiningBoy");
  }
}
Sup.registerBehavior(MonsterWhiningNPCBehavior);
