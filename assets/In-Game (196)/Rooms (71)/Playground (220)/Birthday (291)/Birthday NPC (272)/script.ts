class BirthdayNPCBehavior extends InteractiveBehavior
{
  interact()
  {
    this.actor.setLocalEulerY(this.position.angleTo(Game.kevinBehavior.position) + Math.PI / 2);
    if (!MissionBirthday.hasInvitation[this.name])
    {
      Game.dialogBehavior.ask(this.name, `talkInvitation${this.name}`, "birthdayOptions", (choice: string) => {
        Game.dialogBehavior.speak(this.name, `birthdayAnswers${this.name}.${choice}`);
        if (choice == "give")
        {
          MissionBirthday.hasInvitation[this.name] = true;
          if (MissionBirthday.hasInvitation["Gaetan"] && MissionBirthday.hasInvitation["Beatrice"]) {
            Game.dialogBehavior.close();
            Transition.fadeOut(300, () => {
              Utils.delay(this.actor, 0.3, () => { Game.showMissionInfo("Flowers"); })
            });
          }
        }
      });
    }
    else Game.dialogBehavior.speak(this.name, `hasInvitation${this.name}`);
  }
}
Sup.registerBehavior(BirthdayNPCBehavior);
