class Card
{
  name: string;
  description: string;
  sprite: Sup.Sprite;
  locked: boolean = true;
  activated: boolean = false;
  callbackAction: Function;
  disableCallback: Function;

  constructor(name: string, description: string, sprite: Sup.Sprite, activationCallback: Function, disableCallback?: Function)
  {
    this.name = name;
    this.description = description;
    this.sprite = sprite;
    this.callbackAction = activationCallback;
    this.disableCallback = disableCallback;
  }

  activate()
  {
    this.activated = true;
    this.callbackAction();
  }

  disable()
  {
    this.activated = false;
    if (this.disableCallback != null)
      this.disableCallback();
  }
}
