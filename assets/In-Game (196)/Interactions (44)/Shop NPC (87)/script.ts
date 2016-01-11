class ShopNPCBehavior extends InteractiveBehavior {
  item: string;
  price: number;
  
  interact() {
    this.actor.setLocalEulerY(this.position.angleTo(Game.kevinBehavior.position) + Math.PI / 2);
    Game.dialogBehavior.ask(this.name, `shop${this.item}`, `shop${this.item}Options`, (choice: string) => {
      if (choice === "buy" && Game.marblesCount >= this.price) { 
        if (!Game.inventoryBehavior.containsItem(this.item)) {
          Game.inventoryBehavior.buyItem(this.item, this.price);
          Game.dialogBehavior.speak(this.name, `shop${this.item}Answers.${choice}`);
        } else Game.dialogBehavior.speak(this.name, `shop${this.item}Answers.alreadyHave`);
      }
      else if (choice === "buy" && Game.marblesCount < this.price) Game.dialogBehavior.speak(this.name, `shop${this.item}Answers.noMoney`);
      else Game.dialogBehavior.speak(this.name, `shop${this.item}Answers.${choice}`);
    });
  }
}
Sup.registerBehavior(ShopNPCBehavior);
