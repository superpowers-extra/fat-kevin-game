class MonsterGaetanNPCBehavior extends InteractiveBehavior {
  interact()
  {
    this.actor.setEulerY(0);
    Game.dialogBehavior.speak("Gaetan", "lostMonsterCard");
  }
} 
Sup.registerBehavior(MonsterGaetanNPCBehavior);
