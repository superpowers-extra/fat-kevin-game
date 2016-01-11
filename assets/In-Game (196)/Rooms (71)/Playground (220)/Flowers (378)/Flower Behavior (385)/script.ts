class FlowerBehavior extends InteractiveBehavior {
  awake() {
    super.awake();

    if (Game.missionName !== "Flowers" || Game.inventoryBehavior.containsItem("Flower")) this.actor.destroy();
  }
  
  interact() {
    
    Game.dialogBehavior.speak("Kevin", "pickUpFlower", () => {
      Game.dialogBehavior.close();
      Game.inventoryBehavior.addItem("Flower");
      this.actor.destroy();
    });
  }
}
Sup.registerBehavior(FlowerBehavior);
