class DealerBoyBehavior extends InteractiveBehavior {
  price = 25;
  
  interact() {
    this.actor.setLocalEulerY(this.position.angleTo(Game.kevinBehavior.position) + Math.PI / 2);
    if (MissionGranny.gumGiven) {
      Game.dialogBehavior.speak("Dealer", "gumDealer.empty");
      return;
    }

    Game.dialogBehavior.ask("Dealer", "gumDealer.greetings", "gumDealer.choices", (choice: string) => {
      if (choice === "nothing") {
        Game.dialogBehavior.close();
        return;
      }
      
      if (Game.marblesCount < this.price) {
        Game.dialogBehavior.speak("Dealer", "gumDealer.no");
        return;
      }
      
      Game.dialogBehavior.speak("Dealer", "gumDealer.yes", () => {
        Game.dialogBehavior.close();
        MissionGranny.gumGiven = true;
        Game.inventoryBehavior.buyItem("Gum", this.price);
      });
    });
  }
}
Sup.registerBehavior(DealerBoyBehavior);
