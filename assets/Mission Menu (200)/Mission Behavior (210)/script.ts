class MissionBehavior extends Sup.Behavior {
  activated = false;
  
  awake() {
    Sup.getActor("Title").textRenderer.setText(TextData.get(`${Game.missionName}.title`));
    
    let leftPageRndr = Sup.getActor("Left Page").textRenderer;
    let leftPage = Utils.wrapText(TextData.get(`${Game.missionName}.leftPage`), leftPageRndr.getFont(), 3.7);
    leftPageRndr.setText(leftPage);
    
    let rightPageRndr = Sup.getActor("Right Page").textRenderer;
    let rightPage = Utils.wrapText(TextData.get(`${Game.missionName}.rightPage`), rightPageRndr.getFont(), 3.7);
    rightPageRndr.setText(rightPage);
    
    let artworkSpriteRndr = Sup.getActor("Artwork").spriteRenderer;
    artworkSpriteRndr.setSprite(Sup.get(`Mission Menu/Artworks/${Game.missionName}`, Sup.Sprite));
    artworkSpriteRndr.setOpacity(1); // FIXME: The state is currently incorrectly applied in Superpowers without this workaround
    
    Transition.init(this.actor, Sup.getActor("Transition"));
    Transition.fadeIn(300);
  }

  update() {
    if (Input.validate() && !this.activated) {
      this.activated = true;
      Transition.fadeOut(300, () => {
        Utils.delay(this.actor, 0.3, () => {
          Game.init();
          Game.startMission();  
        });
      });
    }
  }
}
Sup.registerBehavior(MissionBehavior);
