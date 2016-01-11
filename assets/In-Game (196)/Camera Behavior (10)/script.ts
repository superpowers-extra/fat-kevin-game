class CameraBehavior extends Sup.Behavior {

  cameraOffset = this.actor.getLocalPosition();
  position = this.actor.getLocalPosition();
  targetPosition = this.position.clone();

  awake() { Game.cameraBehavior = this; }

  init() {
    this.targetPosition.x = Game.kevinBehavior.position.x + this.cameraOffset.x;
    this.targetPosition.z = -Game.kevinBehavior.position.y + this.cameraOffset.z;
    this.position.copy(this.targetPosition);
    this.actor.setLocalPosition(this.position);
  }

  update() {
    this.targetPosition.x = Game.kevinBehavior.position.x + this.cameraOffset.x;
    this.targetPosition.z = -Game.kevinBehavior.position.y + this.cameraOffset.z;
    this.position.lerp(this.targetPosition, 0.1);
    this.position.y = this.cameraOffset.y;
    this.actor.setLocalPosition(this.position);
  }
}
Sup.registerBehavior(CameraBehavior);
