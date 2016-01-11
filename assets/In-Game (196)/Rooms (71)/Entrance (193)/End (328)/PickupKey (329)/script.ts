class PickupKeyBehavior extends InteractiveBehavior {
  awake() {
    super.awake();
    this.headIcon.setLocalZ(this.headIcon.getLocalZ() - 0.3);
  }
  
  interact() {
    if (Game.missionName === "End" && !MissionEnd.hasKey) {
      Game.dialogBehavior.speak("Kevin", "foundKey", () => {
        Game.dialogBehavior.close();
        Game.inventoryBehavior.addItem("Key");
        MissionEnd.hasKey = true;
        this.headIcon.destroy();
        this.headIcon = null;
      });
    }
  }
}
Sup.registerBehavior(PickupKeyBehavior);
