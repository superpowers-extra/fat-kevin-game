class MagalieBehavior extends InteractiveBehavior {
  interact() {
    this.actor.setLocalEulerY(this.position.angleTo(Game.kevinBehavior.position) + Math.PI / 2);
    
    if (Game.inventoryBehavior.containsItem("Flower")) {
      Game.dialogBehavior.speak("Magalie", "giveFlower", () => {
        Transition.fadeOut(300, () => {
          Utils.delay(this.actor, 0.3, () => { Game.showMissionInfo("Monster"); })
        });
      });

    } else {
      Game.dialogBehavior.speak("Magalie", "magalieSad", () => {
        Game.dialogBehavior.speak("Kevin", "kevinNoExcuse");
      });
    }
    
  }
}
Sup.registerBehavior(MagalieBehavior);
