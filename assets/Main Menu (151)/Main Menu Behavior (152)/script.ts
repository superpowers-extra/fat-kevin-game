class MainMenuBehavior extends Sup.Behavior {
  
  entryIndex = 0;
  supportedLanguages = Object.keys(TextData.texts);
  languageIndex = this.supportedLanguages.indexOf(Settings.language);

  buttons = Sup.getActor("Buttons").getChildren();
  playTextRenderer = Sup.getActor("Buttons").getChild("Play").textRenderer;
  languageTextRenderer = Sup.getActor("Buttons").getChild("Language").textRenderer;
  volumeTextRenderer = Sup.getActor("Buttons").getChild("Volume").textRenderer;
  controlsTextRenderer = Sup.getActor("Controls").textRenderer;
  
  awake() {
    this.translate();
    
    this.highlightSelectedEntry();
    Transition.init(this.actor, Sup.getActor("Transition"));
  }

  translate() {
    Sup.getActor("Fat Kevin").textRenderer.setText(TextData.get("fatKevin"));
    
    this.playTextRenderer.setText(TextData.get("play"));
    this.languageTextRenderer.setText(TextData.get("language") + TextData.get("activeLanguage"));
    this.volumeTextRenderer.setText(TextData.get("volume") + `${Settings.volume} %`);
    this.controlsTextRenderer.setText(TextData.get("controls"));
  }

  highlightSelectedEntry() {
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].textRenderer.setOpacity(this.entryIndex === i ? 1 : 0.5);
    }
  }

  update() {
    let changedEntry = false;
    if (Input.down()) {
      changedEntry = true;
      this.entryIndex = Math.min(this.entryIndex + 1, 2);
      this.highlightSelectedEntry();
    } else if(Input.up()) {
      changedEntry = true;
      this.entryIndex = Math.max(this.entryIndex - 1, 0);
      this.highlightSelectedEntry();
    }
    
    if (changedEntry) Sup.Audio.playSound("Sounds/Sounds effects/Beep");
    
    switch(this.entryIndex) {
      case 0: { // Play
        if (Input.validate()) {
          Transition.fadeOut(300, () => {Game.showMissionInfo("Granny");});
          return;
        }
        break;
      }

      case 1: { // Language
        let changed = false;
        
        if (Input.right(true) || Input.validate()) {
          this.languageIndex = (this.languageIndex + 1) % this.supportedLanguages.length;
          changed = true;
        } else if (Input.left(true)) {
          this.languageIndex = (this.languageIndex + this.supportedLanguages.length - 1) % this.supportedLanguages.length;
          changed = true;
        }

        if (changed) {
          Settings.language = this.supportedLanguages[this.languageIndex];
          Sup.Audio.playSound("Sounds/Sounds effects/Beep");
          this.translate();
        }
        break;
      }
        
      case 2: { // Volume
        let changed = false;
        
        if (Input.right(true)) {
          Settings.volume = Math.min(Settings.volume + 5, 100);
          changed = true;
        }
        else if (Input.left(true)) {
          Settings.volume = Math.max(Settings.volume - 5, 0);
          changed = true;
        }
        
        if (changed) { 
          Sup.Audio.setMasterVolume(Settings.volume / 100);
          Sup.Audio.playSound("Sounds/Sounds effects/Beep");
          this.translate();
        }
      }
    }
  }
}
Sup.registerBehavior(MainMenuBehavior);
