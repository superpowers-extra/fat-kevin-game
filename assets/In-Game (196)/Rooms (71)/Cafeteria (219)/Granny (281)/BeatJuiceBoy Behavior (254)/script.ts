class JuiceBoyBehavior extends InteractiveBehavior {
  interact() {
    this.actor.setLocalEulerY(this.position.angleTo(Game.kevinBehavior.position) + Math.PI / 2);
    if (MissionGranny.appleState === "toFind") {
      Game.dialogBehavior.ask("Fabien", "beatJuiceBoy.greetings", "beatJuiceBoy.choices", (choice: string) => {
        if (choice === "nothing") {
          Game.dialogBehavior.close();
          return;
        }
        MissionGranny.appleState = "toPickUp";
        Game.dialogBehavior.speak("Fabien", "beatJuiceBoy.refuse", () => {
          Game.dialogBehavior.speak("Kevin", "beatJuiceBoy.force", () => {
            Game.dialogBehavior.close();
            this.actor.addBehavior(BeatJuiceBoyBehavior);
            this.headIcon.setVisible(false);
          });
        });
      });
    } else Game.dialogBehavior.speak("Fabien", "beatJuiceBoy.leaveMe");
  }
}
Sup.registerBehavior(JuiceBoyBehavior);

class BeatJuiceBoyBehavior extends BasicEnemyBehavior {
  die() {
    //this.actor.modelRenderer.setAnimation("Cry", false);
    this.actor.arcadeBody2D.setVelocity(new Sup.Math.Vector2());
    this.state = EnemyStates.DEAD;
    this.healthOpacity = 0;

    Game.dialogBehavior.speak("Fabien", "beatJuiceBoy.giveUp", () => {
      Game.dialogBehavior.close();
      Game.inventoryBehavior.addItem("Apple");
      MissionGranny.appleState = "pickedUp";
      this.actor.getChild("HeadIcon").setVisible(true);      
    });
  }
}
Sup.registerBehavior(BeatJuiceBoyBehavior);
