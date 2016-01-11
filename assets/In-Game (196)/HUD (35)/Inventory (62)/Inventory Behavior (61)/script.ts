class InventoryBehavior extends Sup.Behavior {
  
  marblesRndr: Sup.TextRenderer;
  items: string[];
  
  awake() {
    Game.inventoryBehavior = this;
    this.marblesRndr = Sup.getActor("Marbles").getChild("Count").textRenderer;
    this.items = [];
  }

  updateMarbles(quantity: number) {
    Game.marblesCount += quantity;
    this.marblesRndr.setText(Game.marblesCount.toString());
  }

  containsItem(name: string) {
    return this.items.indexOf(name) != -1;
  }
  
  addItem(name: string) {
    if(this.items.indexOf(name) != -1) return; // Deja dans l'inventaire
    this.items.push(name);
    this.updateInventoryBar();
    TextDisplayer.display(TextData.get("newItem"), TextData.get(`item_${name}`), 1, Sup.get(`In-Game/HUD/Inventory/Items/${name}`, Sup.Sprite));
  }

  removeItem(name: string){
    let itemIndex = this.items.indexOf(name);
    if(itemIndex == -1) return; // N'est pas dans l'inventaire
    this.items.splice(itemIndex,1);
    this.updateInventoryBar();
  }

  buyItem(name: string, price: number) {
    Sup.Audio.playSound("Sounds/Sounds effects/GivingMoney");
    this.addItem(name);
    this.updateMarbles(-price);
  }

  updateInventoryBar(){
    for(let itemActor of this.actor.getChildren()){
      itemActor.destroy();
    }
    
    let xPos = 0;  
   
    for(let itemName of this.items){
      let sprite = Sup.get(`In-Game/HUD/Inventory/Items/${itemName}`, Sup.Sprite);
      let itemActor = new Sup.Actor(`Item_${itemName}`, this.actor);
      new Sup.SpriteRenderer(itemActor, sprite);
      
      itemActor.setLocalPosition(new Sup.Math.Vector3(xPos, 0, 0));
     
      xPos+= 0.5;
       
    }
    
  }

}
Sup.registerBehavior(InventoryBehavior);
