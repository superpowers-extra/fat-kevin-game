class RoomChangerBehavior extends Sup.Behavior {
  roomName: string;
  spawnName: string;
  activationRange: number = 1.5;
  private activated = false;
  disabled = false;

  position: Sup.Math.Vector2;

  awake() {
    this.position = this.actor.getPosition().toVector2();
  }

  update() {
    if (this.disabled) return;

    if (!Game.kevinBehavior.isChangingRoom && Game.kevinBehavior.position.distanceTo(this.position) < this.activationRange && !this.activated)  {
      this.activated = true;
      Game.kevinBehavior.isInteracting = true;
      Game.kevinBehavior.isChangingRoom = true;
      Game.kevinBehavior.warpAngle(this.actor.getLocalEulerY());
      Transition.fadeOut(300, () => {Game.enterRoom(this.roomName, this.spawnName)});
    }
  }
}
Sup.registerBehavior(RoomChangerBehavior);
