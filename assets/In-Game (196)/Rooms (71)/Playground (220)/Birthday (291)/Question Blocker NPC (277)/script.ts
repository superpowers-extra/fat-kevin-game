class QuestionBlockerNPCBehavior extends InteractiveBehavior
{
  completePosition: Sup.Math.Vector3;
  private angle: number;

  start()
  {
    this.completePosition = this.actor.getLocalPosition();
    this.completePosition.x += 2;
    this.completePosition.z += 2;
    this.angle = 0;
  }
  
  update()
  {
    super.update();
    let velocity = new Sup.Math.Vector2();
    if (MissionBirthday.completedQuestion && this.actor.getLocalPosition().distanceTo(this.completePosition) > 0.2)
    {
      this.actor.arcadeBody2D.setSize(0.2, 0.2);
      this.actor.modelRenderer.setAnimation("Run");
      let toTarget = this.completePosition.clone().subtract(this.actor.getLocalPosition());
      let targetAngle = Sup.Math.wrapAngle(Math.atan2(-toTarget.z, toTarget.x) + Math.PI / 2);
      this.angle = Sup.Math.lerpAngle(this.angle, targetAngle, 0.5);
      this.actor.setLocalEulerY(this.angle);
      toTarget.normalize().multiplyScalar(0.05);
      velocity.copy(toTarget);
    }
    else
      this.actor.modelRenderer.setAnimation("Idle");
    this.actor.arcadeBody2D.setVelocity(velocity);    
  }

  interact()
  {
    this.actor.setLocalEulerY(this.position.angleTo(Game.kevinBehavior.position) + Math.PI / 2);
    Game.dialogBehavior.ask(this.name, "birthdayMathQuestion", "birthdayMathOptions", (choice: string) => {
      Game.dialogBehavior.speak(this.name, `birthdayMathAnswers.${choice}`);
      if (choice == "correct")
        MissionBirthday.completedQuestion = true;
    });
  }
}
Sup.registerBehavior(QuestionBlockerNPCBehavior);
