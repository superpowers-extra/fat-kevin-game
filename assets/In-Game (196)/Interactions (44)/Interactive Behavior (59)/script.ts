class InteractiveBehavior extends Sup.Behavior {
  name: string;
  headIcon : Sup.Actor;
  position: Sup.Math.Vector2;
  
  heightHeadIcon = 2;
  
  awake() {
    this.position = this.actor.getPosition().toVector2();
    
    Game.Room.interactables.push(this);
    if (this.actor.arcadeBody2D == null) Sup.log(`Interactable -${this.actor.getName()}- doesn't have a body`);
    else Game.Room.bodies.push(this.actor.arcadeBody2D);
    
    this.headIcon = new Sup.Actor("HeadIcon", this.actor);
    new Sup.SpriteRenderer(this.headIcon, "In-Game/Interactions/Icon/Exclamation");
    this.headIcon.setLocalPosition(new Sup.Math.Vector3(0,this.heightHeadIcon,0));
    this.headIcon.addBehavior(IconBehavior, {heightHeadIcon: this.heightHeadIcon});
  }
  
  onDestroy() {
    Game.Room.interactables.splice(Game.Room.interactables.indexOf(this), 1);
    
    let index = Game.Room.bodies.indexOf(this.actor.arcadeBody2D);
    if (index !== -1) Game.Room.bodies.splice(index, 1);
  }

  canTrigger(trigger: boolean) {
    if (this.headIcon == null) return;
    
    let spriteName = trigger ? "Arrow" : "Exclamation";
    this.headIcon.spriteRenderer.setSprite(`In-Game/Interactions/Icon/${spriteName}`);
  }

  interact() {}

  update() {
    if (this.headIcon != null) this.headIcon.lookAt(Game.cameraBehavior.position, new Sup.Math.Vector3(0, 0, 1)).setLocalEulerX(Math.PI / 2);
  }
}
Sup.registerBehavior(InteractiveBehavior);
