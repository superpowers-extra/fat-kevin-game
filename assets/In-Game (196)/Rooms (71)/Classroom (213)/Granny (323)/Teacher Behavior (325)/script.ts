class GrannyTeacherBehavior extends InteractiveBehavior {
  interact() {
    this.actor.setLocalEulerY(this.position.angleTo(Game.kevinBehavior.position) + Math.PI / 2);
    if (Game.missionName !== "Granny") {
      Game.dialogBehavior.speak("Teacher", "teacher.random");
      return;
    }
    Game.dialogBehavior.ask("Teacher", "teacher.greetings", "teacher.choices", (choice) => {
      if (choice === "nothing") {
        Game.dialogBehavior.close();
        return;
      }
      Game.dialogBehavior.speak("Teacher", "teacher.takeNote", () => {
        Transition.fadeOut(300, () => {
          Utils.delay(this.actor, 0.3, () => { Game.showMissionInfo("Birthday"); })
        });
      });
    });
  }
}
Sup.registerBehavior(GrannyTeacherBehavior);
