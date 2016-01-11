class SecretaryBehavior extends Sup.Behavior {
  isGrowling: boolean = false;
  private originOrientation: Sup.Math.Vector3;
  position: Sup.Math.Vector2;

  start() {
    this.originOrientation = this.actor.getEulerAngles();
    this.position = this.actor.getPosition().toVector2();
  }
  
  growl() {
    this.isGrowling = true;
    this.actor.setLocalEulerY(this.position.angleTo(Game.kevinBehavior.position) - Math.PI / 2);
    Game.dialogBehavior.speak("Secretary", "goAway", () => {
      this.actor.setEulerAngles(this.originOrientation);
      Game.dialogBehavior.close();
      Utils.delay(this.actor, 1, () => {this.isGrowling = false;});
    });
  }
}
Sup.registerBehavior(SecretaryBehavior);
