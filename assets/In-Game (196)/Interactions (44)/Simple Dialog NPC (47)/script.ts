class SimpleDialogNPCBehavior extends InteractiveBehavior {
  text: string;

  interact() {
    this.actor.setLocalEulerY(this.position.angleTo(Game.kevinBehavior.position) + Math.PI / 2);
    Game.dialogBehavior.speak(this.name, this.text);
  }
}
Sup.registerBehavior(SimpleDialogNPCBehavior);
