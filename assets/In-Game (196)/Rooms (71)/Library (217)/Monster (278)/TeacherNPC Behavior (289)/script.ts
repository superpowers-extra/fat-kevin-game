class MonsterTeacherNPCBehavior extends InteractiveBehavior {
  
  static finalPosition = new Sup.Math.Vector3(3.75,0,-9.773);
  
  interact()
  {
    if (!MissionMonster.cryingBoy) {
      Game.dialogBehavior.speak("Teacher", "canNotExit");
    }
  }
  
  update() {
    super.update();
    
    let velocity = new Sup.Math.Vector2();
    
    
    
    if (MissionMonster.cryingBoy && this.actor.getPosition().x >= MonsterTeacherNPCBehavior.finalPosition.x) {
      this.headIcon.setVisible(false);
      this.actor.modelRenderer.setAnimation("Walk");

      if (this.actor.getPosition().y < MonsterTeacherNPCBehavior.finalPosition.y) {
        velocity.y += 0.1;
      } else {
        velocity.x -= 0.1;
        this.actor.setEulerY(-90);
      }
      
    } else {
      this.actor.modelRenderer.setAnimation("Idle");
    }
    
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
  
}
Sup.registerBehavior(MonsterTeacherNPCBehavior);
