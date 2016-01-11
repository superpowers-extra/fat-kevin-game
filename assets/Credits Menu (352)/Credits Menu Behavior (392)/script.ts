class CreditsMenuBehavior extends Sup.Behavior {
  update() {
    if (Input.exit()) Sup.loadScene("Main Menu/Main Menu");
  }
}
Sup.registerBehavior(CreditsMenuBehavior);
