class MarbleBehavior extends Sup.Behavior {
  
  velocity: Sup.Math.Vector2;
  pickedUpTimer: number;
  static pickedUpDuration = 25;
  static pickUpDistance = 2;
  
  awake() {
    let diffX = (Math.random() * (0.25 - (-0.25)) + (-0.25))
    let diffZ = (Math.random() * (0.25 - (-0.25)) + (-0.25))
    
    this.velocity = new Sup.Math.Vector2(diffX, diffZ);
    this.actor.arcadeBody2D.setVelocity(this.velocity);
 
  }

  update() {
    this.actor.lookAt(Game.cameraBehavior.actor.getPosition());
    
    if (this.pickedUpTimer != null) {
      this.pickedUpTimer++;
      
      this.actor.setLocalPosition(this.actor.getPosition().lerp(Game.kevinBehavior.position.toVector3(), this.pickedUpTimer / MarbleBehavior.pickedUpDuration));
      
      if (this.pickedUpTimer === MarbleBehavior.pickedUpDuration) {
        Game.inventoryBehavior.updateMarbles(1);
        Sup.Audio.playSound("Sounds/Sounds effects/Pick Item");
        this.actor.destroy();
      }
      
      return;
    }
    
    this.velocity.x = Sup.Math.lerp(this.velocity.x, 0, 0.1);
    this.velocity.y = Sup.Math.lerp(this.velocity.y, 0, 0.1);
    this.actor.arcadeBody2D.setVelocity(this.velocity);
    
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Game.Room.bodies);
    this.velocity = this.actor.arcadeBody2D.getVelocity();
    
    let kevinPosition = Game.kevinBehavior.position;
    let globalPosition = this.actor.getPosition().toVector2();

    if (kevinPosition.distanceTo(globalPosition) < MarbleBehavior.pickUpDistance && this.velocity.x < 0.1 && this.velocity.y < 0.1) {
      this.pickedUpTimer = 0;
      this.actor.arcadeBody2D.destroy();
    }
  }
}
Sup.registerBehavior(MarbleBehavior);
