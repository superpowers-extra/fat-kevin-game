class PrincipalBehavior extends Sup.Behavior {
  start() {
    let position = this.actor.getPosition().toVector2();
    
    Utils.delay(this.actor, 0.310, () => {
      this.actor.setLocalEulerY(position.angleTo(Game.kevinBehavior.position) + Math.PI / 2);
      Game.dialogBehavior.speak("Principal", "endPunchline", () => {Sup.loadScene("Credits Menu/Credits Menu")});
    });
  }
}
Sup.registerBehavior(PrincipalBehavior);
