enum DialogStates {
  Opened, Opening, Writing, Closed, Closing, Validated
}

class DialogBehavior extends Sup.Behavior {
  static closedScale = new Sup.Math.Vector3(0.5, 0.5, 0.5);
  static openedScale = new Sup.Math.Vector3(1, 1, 1);
  static lineWidth = 7;

  state = DialogStates.Closed;
  scale = new Sup.Math.Vector3();
  
  facesetRndr: Sup.SpriteRenderer;
  nameRndr: Sup.TextRenderer;
  textRndr: Sup.TextRenderer;
  choicesRndr: Sup.TextRenderer[] = [];
  selectionActor: Sup.Actor;
  selectedChoice: number;
  choiceOffset: number;

  textWritten: string;
  textToWrite: string;
  choices: {key: string; value: string}[] = [];
  callback: Function;
  
  awake() {
    Game.dialogBehavior = this;
    
    this.facesetRndr = this.actor.getChild("Faceset").spriteRenderer;
    this.nameRndr = this.actor.getChild("Name").textRenderer;
    this.textRndr = this.actor.getChild("Text").textRenderer;
    for (let choiceActor of this.actor.getChild("Choices").getChildren()) if (choiceActor.getName() !== "Selection") this.choicesRndr.push(choiceActor.textRenderer);
    this.selectionActor = this.actor.getChild("Selection");
    this.choiceOffset = this.choicesRndr[1].actor.getLocalY();
    
    this.actor.setVisible(false);
  }

  update() {
    switch (this.state) {
      case DialogStates.Opening:
        this.scale = this.scale.lerp(DialogBehavior.openedScale, 0.3);
        this.actor.setLocalScale(this.scale);
        
        if (this.scale.distanceTo(DialogBehavior.openedScale) < 0.05) {
          this.state = DialogStates.Writing;
        }
        break;

      case DialogStates.Closing:
        this.scale = this.scale.lerp(DialogBehavior.closedScale, 0.3);
        this.actor.setLocalScale(this.scale);
        this.actor.getChild("Backdrop").spriteRenderer.setOpacity((this.scale.x - DialogBehavior.closedScale.x) / (DialogBehavior.openedScale.x - DialogBehavior.closedScale.x));
        
        if (this.scale.distanceTo(DialogBehavior.closedScale) < 0.05) {
          this.actor.getChild("Backdrop").spriteRenderer.setOpacity(1);
          this.actor.setVisible(false);
          this.state = DialogStates.Closed;
        }
        break;
        
      case DialogStates.Writing:
        let offset = (Input.holdInteract()) ? 3 : 1;
        this.textWritten = this.textToWrite.slice(0, this.textWritten.length + offset);
        this.textRndr.setText(this.textWritten);
        
        if (this.textWritten === this.textToWrite) {
          for (let i = 0; i < this.choicesRndr.length; i++) {
            let choice = this.choices[i];
            this.choicesRndr[i].setText(choice != null ? choice.value : "");
          }
          if (this.choices.length != 0) this.selectionActor.setVisible(true);
          this.state = DialogStates.Opened;
        }
        break;
        
      case DialogStates.Opened:
        if (this.choices.length != 0) {
          if (Input.down(true)) {
            this.selectedChoice = Math.min(this.selectedChoice + 1, this.choices.length - 1);
            this.selectionActor.setLocalY(this.selectedChoice * this.choiceOffset);
          }
          if (Input.up(true)) {
            this.selectedChoice = Math.max(this.selectedChoice - 1, 0);
            this.selectionActor.setLocalY(this.selectedChoice * this.choiceOffset);
          }
        }
        
        if (Input.validate()) {
          this.state = DialogStates.Validated;
          let choice = this.choices.length != 0 ? this.choices[this.selectedChoice].key : null;
          if (this.callback == null) this.close();
          else this.callback(choice);
        }
        break;
    }
  }

  speak(faceset: string, text: string, callback?: Function) {
    if (this.state !== DialogStates.Closed && this.state !== DialogStates.Validated) return;
    
    this.show(faceset, text, callback);
  }

  ask(faceset: string, question: string, choicesKey: string, callback?: Function) {
    if (this.state !== DialogStates.Closed && this.state !== DialogStates.Validated) return;
    
    this.show(faceset, question, callback);
    let choices = TextData.getChoices(choicesKey);
    for (let key in choices) this.choices.push({ key, value: choices[key] });
  }

  private show(name: string, text: string, callback: Function) {
    let facesetSprite = Sup.get(`In-Game/Characters/Facesets/${name}`, Sup.Sprite, { ignoreMissing: true });
    if (facesetSprite != null) this.facesetRndr.setSprite(facesetSprite);
    else Sup.log(`Faceset -${name}- is missing`);
    
    this.nameRndr.setText(name);
    
    this.textWritten = "";
    this.textRndr.setText("");
    this.textToWrite = Utils.wrapText(TextData.get(text), this.textRndr.getFont(), DialogBehavior.lineWidth);
    
    for (let choiceRndr of this.choicesRndr) choiceRndr.setText("");
    this.selectedChoice = 0;
    this.choices.length = 0;
    this.selectionActor.setLocalY(this.selectedChoice * this.choiceOffset);
    this.selectionActor.setVisible(false);
    
    this.callback = callback;
    
    this.scale.copy(DialogBehavior.closedScale);
    this.actor.setLocalScale(this.scale);
    this.actor.setVisible(true);
    this.state = DialogStates.Opening;
    
    Game.suspended = true;
    Game.kevinBehavior.isInteracting = true;
  }

  close() {
    if (this.state !== DialogStates.Validated) return;
    
    this.state = DialogStates.Closing;
    Game.suspended = false;
    Game.kevinBehavior.isInteracting = false;
  }
}
Sup.registerBehavior(DialogBehavior);
