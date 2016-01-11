class KevinHealthBehavior extends Sup.Behavior {
  
  heartActors: Sup.Actor[] = [];
  
  awake() {
    Game.healthBehavior = this;
    this.createHearts();
  }
  
  createHearts () {
    for(let oldHeart of this.heartActors){
      oldHeart.destroy();
    }
    this.heartActors.length = 0;

    for(let i = 0; i < Game.hearts; i++){
      let heartActor = new Sup.Actor("Heart " + i, this.actor);
      
      new Sup.SpriteRenderer(heartActor, Sup.get("In-Game/HUD/Heart", Sup.Sprite));
      
      heartActor.spriteRenderer.setAnimation("Empty");
      heartActor.setLocalPosition(new Sup.Math.Vector3(i / 3, 0,0));
      this.heartActors.push(heartActor);
    }
    this.refresh();
  }
  
  refresh() {
    for (let i = 0; i < Game.hearts; i++) {
      let heart = this.heartActors[i];
      if (Game.health >= 4 * (i + 1)) heart.spriteRenderer.setAnimation("Full");
      else if (Game.health < (4 * i) + 1) heart.spriteRenderer.setAnimation("Empty");
      else {
        switch (Game.health % 4) {
          case 1: heart.spriteRenderer.setAnimation("1/4"); break;
          case 2: heart.spriteRenderer.setAnimation("1/2"); break;
          case 3: heart.spriteRenderer.setAnimation("3/4"); break;
        }
      }
    }  
  }
}
Sup.registerBehavior(KevinHealthBehavior);
