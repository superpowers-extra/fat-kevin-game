class DoorLockBehavior extends InteractiveBehavior {
  door: RoomChangerBehavior;
  
  awake() {
    super.awake();
    this.door = Sup.getActor("Private Room Door").getBehavior(RoomChangerBehavior);
  }

  interact() {
    if (MissionEnd.hasKey && this.door.disabled || Sup.Input.isKeyDown("L")) {
      Game.dialogBehavior.speak("Kevin", "doorUnlocked", () => {
        this.door.disabled = false;
        this.actor.arcadeBody2D.destroy(); 
        Game.dialogBehavior.close();
      });
    } else Game.dialogBehavior.speak("Kevin", "doorLocked");
  }
}
Sup.registerBehavior(DoorLockBehavior);
