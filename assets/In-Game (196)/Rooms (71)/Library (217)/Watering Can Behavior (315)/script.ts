class WateringCanBehavior extends InteractiveBehavior {

  private wateringCan: Sup.Actor;
  
  awake() {
    super.awake();
    this.wateringCan = this.actor.getChild("Watering Can");        
  }
  
  interact() {
    if (Game.missionName !== "Monster") {
       Game.dialogBehavior.speak("Kevin", "itsAWateringCan");
    } else {
      Game.Room.bodies.splice(Game.Room.bodies.indexOf(this.actor.arcadeBody2D),1);
      this.actor.arcadeBody2D.destroy();
      this.wateringCan.setParent(Game.kevinBehavior.actor);
      MissionMonster.hasWateringCan = true;
      this.headIcon.setVisible(false);
    }
  }
  
  update (){
    super.update();
    
    if(MissionMonster.hasWateringCan) {
       let bone = Game.kevinBehavior.actor.getChild("Model").modelRenderer.getBoneTransform("Arm_2_L_001");

       this.wateringCan.setPosition(bone.position);
       this.wateringCan.setOrientation(bone.orientation);
       this.wateringCan.moveOrientedX(-0.175)
    }

    if(MissionMonster.cryingBoy) this.actor.destroy();
  }
  
}
Sup.registerBehavior(WateringCanBehavior);
