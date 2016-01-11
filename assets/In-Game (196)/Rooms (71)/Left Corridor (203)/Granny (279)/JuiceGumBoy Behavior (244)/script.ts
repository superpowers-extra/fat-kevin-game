class JuiceGumBoyBehavior extends InteractiveBehavior {
  interact() {
    this.actor.setLocalEulerY(this.position.angleTo(Game.kevinBehavior.position) + Math.PI / 2);
    if (Game.inventoryBehavior.containsItem("Apple") && Game.inventoryBehavior.containsItem("Gum")) {
      Game.dialogBehavior.speak("Raphael", "juiceGumBoy.yes", () => {
        Game.dialogBehavior.close();
        MissionGranny.appleGiven = true;

        Transition.fadeOut(300, () => {
          Game.inventoryBehavior.removeItem("Apple");
          Game.inventoryBehavior.removeItem("Gum");
          Sup.getActor("Classroom Door").getBehavior(RoomChangerBehavior).disabled = false;
          this.actor.destroy();
          Utils.delay(Game.kevinBehavior.actor, 0.2, () => { Transition.fadeIn(300); });
        });
      });
    } else if (Game.inventoryBehavior.containsItem("Apple") || Game.inventoryBehavior.containsItem("Gum")) {
      Game.dialogBehavior.speak("Raphael", "juiceGumBoy.missing");
    } else Game.dialogBehavior.speak("Raphael", "juiceGumBoy.no");
  }
}
Sup.registerBehavior(JuiceGumBoyBehavior);
