class IconBehavior extends Sup.Behavior {
  
  up = true;

  heightHeadIcon = 2;

  update() {
    if (this.up) {
      this.actor.setLocalY(Math.min(this.actor.getLocalY() + 0.005, this.heightHeadIcon+0.15));
      if (this.actor.getLocalY() == this.heightHeadIcon + 0.15) {
        this.up = false;
      }
    } else {
      this.actor.setLocalY(Math.max(this.actor.getLocalY() - 0.005, this.heightHeadIcon - 0.05));
      if (this.actor.getLocalY() == this.heightHeadIcon - 0.05) {
        this.up = true;
      }
    }
  }
}
Sup.registerBehavior(IconBehavior);
