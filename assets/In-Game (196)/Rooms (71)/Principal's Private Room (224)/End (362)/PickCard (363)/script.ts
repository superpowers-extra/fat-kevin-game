class PickCardBehavior extends InteractiveBehavior {
  interact() {
    if (Game.missionName == "End" && !MissionEnd.hasCard) {
      Game.dialogBehavior.speak("Kevin", "foundCard", () => {
        Game.dialogBehavior.close();
        Game.inventoryBehavior.addItem("MonsterCard");
        MissionEnd.hasCard = true;
        this.actor.destroy();
      });
    }
  }
}
Sup.registerBehavior(PickCardBehavior);
