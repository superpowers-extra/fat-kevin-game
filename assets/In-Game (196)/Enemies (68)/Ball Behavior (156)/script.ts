class BallBehavior extends Sup.Behavior
{
  private speed = 0.15;
  private damage = 4;
  private lifetime = 2;
  
  awake() {
    let toTarget = Game.kevinBehavior.position.clone().subtract(this.actor.getPosition().toVector2());
    let targetAngle = Sup.Math.wrapAngle(Math.atan2(toTarget.y, toTarget.x) + Math.PI / 2);
    this.actor.setEulerY(targetAngle);
    toTarget.normalize().multiplyScalar(this.speed);
    this.actor.arcadeBody2D.setVelocity(toTarget);
    
    Utils.delay(this.actor, this.lifetime, () => {this.actor.destroy()});
  }
  
  update() {
    let position = this.actor.getPosition().toVector2();
    if (position.distanceTo(Game.kevinBehavior.position) < 1) {
      Game.kevinBehavior.hit(this.damage, position);
      this.actor.destroy();
      return;
    }
    
    if (Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Game.Room.bodies)) this.actor.destroy();
  }
}
Sup.registerBehavior(BallBehavior);
