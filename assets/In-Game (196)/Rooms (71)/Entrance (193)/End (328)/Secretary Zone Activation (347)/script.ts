class SecretaryZoneActivationBehavior extends Sup.Behavior {
  kevinActor: Sup.Actor;
  secretary: SecretaryBehavior;
  
  start() {
    if (Game.missionName !== "End") {
      this.kevinActor = Sup.getActor("Kevin");
      this.secretary = Sup.getActor("Secretary").getBehavior(SecretaryBehavior);
      if (Game.missionName !== "End") Game.Room.bodies.push(this.actor.arcadeBody2D);
    }
  }
  
  update() {
    if (Game.missionName !== "End") {
      if (this.kevinActor.getPosition().distanceTo(this.actor.getPosition()) < 0.6 && !this.secretary.isGrowling) this.secretary.growl();
    }
  }
}
Sup.registerBehavior(SecretaryZoneActivationBehavior);
