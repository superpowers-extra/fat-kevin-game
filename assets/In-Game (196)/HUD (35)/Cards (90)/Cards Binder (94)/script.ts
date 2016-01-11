enum CardsBinderState
{
  OPEN,
  CLOSED
}

class CardsBinderBehavior extends Sup.Behavior
{
  lockedSprite: Sup.Sprite;
  binder: Sup.Actor;
  private cards: {card: Card, x: number, y: number, selected: boolean, actor: Sup.Actor}[];
  private state: CardsBinderState = CardsBinderState.CLOSED;
  private cursor: {x: number, y: number};
  private selectedCard: number;
  private tween: Sup.Tween;
  private onFocus: boolean = false;

  awake()
  {
    this.binder = Sup.getActor("Binder HUD");
    this.actor.spriteRenderer.setAnimation("Close");
    this.lockedSprite = Sup.get("In-Game/HUD/Cards/Back Card HD", Sup.Sprite);
    this.cards = [
      {card: new Card(<string>TextData.get("waterDragon"), <string>TextData.get("waterDragonDescription"), Sup.get("In-Game/HUD/Cards/Aquatrique", Sup.Sprite), () => {
        Game.kevinBehavior.addHeart();
      }, () => {
        Game.kevinBehavior.removeHeart();
      }), x:0, y:0, selected:false, actor:Sup.getActor("Card0")},
      {card: new Card(<string>TextData.get("fireDragon"), <string>TextData.get("fireDragonDescription"), Sup.get("In-Game/HUD/Cards/Firetrique", Sup.Sprite), () => {
        Game.kevinBehavior.attackDamage += 1;
      }, () => {
        Game.kevinBehavior.attackDamage -= 1;
      }), x:1, y:0, selected:false, actor:Sup.getActor("Card1")},
      {card: new Card(<string>TextData.get("knackix"), <string>TextData.get("knackixDescription"), Sup.get("In-Game/HUD/Cards/PurpleFighter", Sup.Sprite), () => {
        Game.lootChance = 2;
      }, () => {
        Game.lootChance = 3;
      }), x:0, y:1, selected:false, actor:Sup.getActor("Card2")},
      {card: new Card("Aquatrique", "", Sup.get("In-Game/HUD/Cards/Aquatrique", Sup.Sprite), () => {}), x:1, y:1, selected:false, actor:Sup.getActor("Card3")}
    ];
    this.cards[0].card.locked = false;
    this.cards[1].card.locked = false;
    this.cards[2].card.locked = false;
    this.refreshCards();
    this.cursor = {x:0, y:0};
    this.selectedCard = 0;
    this.tween = null;
  }

  update()
  {
    if (Sup.Input.wasKeyJustPressed("I") || Sup.Input.wasGamepadButtonJustPressed(0, 8 /* Back */))
    {
      if (this.state == CardsBinderState.CLOSED) this.open();
      else this.close();
    }
    if (this.state == CardsBinderState.OPEN)
    {
      if (!this.onFocus)
      {
        if (Input.down())
          this.cursor.y = 1;
        else if (Input.up())
          this.cursor.y = 0;
        else if (Input.left())
          this.cursor.x = 0;
        else if (Input.right())
          this.cursor.x = 1;

        for(let key in this.cards)
        {
           if (this.cards[key].x == this.cursor.x && this.cards[key].y == this.cursor.y)
           {
             if (this.selectedCard != key)
             {
               if (this.tween != null)
                 this.tween.stop();
               this.cards[this.selectedCard].actor.setLocalZ(0.1);
               this.selectedCard = key;
               this.cards[this.selectedCard].actor.setLocalZ(0.2);
               this.tween = new Sup.Tween(this.actor, {floating:0.7})
                  .to({floating:0.75}, 1000)
                  .onUpdate((object) => {
                    this.cards[this.selectedCard].actor.setLocalScale(new Sup.Math.Vector3(object.floating, object.floating, 1));
                }).yoyo(true)
                  .repeat(Infinity)
                  .start();
             }
           }
        }
      }

      if (Sup.Input.wasKeyJustPressed("RETURN") || Sup.Input.wasKeyJustPressed("SPACE") || Sup.Input.wasGamepadButtonJustPressed(0, 0))
      {
        if (!this.cards[this.selectedCard].card.locked)
        {
          if (!this.cards[this.selectedCard].selected)
          {
            if (this.tween != null)
              this.tween.stop();
            this.cards[this.selectedCard].selected = true;
            this.cards[this.selectedCard].actor.setLocalScale(new Sup.Math.Vector3(2, 2, 1));
            this.cards[this.selectedCard].actor.setLocalZ(0.3);
            this.onFocus = true;
          }
          else
          {
            if (this.tween != null)
              this.tween.start();
            this.cards[this.selectedCard].selected = false;
            this.cards[this.selectedCard].actor.setLocalScale(new Sup.Math.Vector3(0.7, 0.7, 1));
            this.cards[this.selectedCard].actor.setLocalZ(0.1);
            this.onFocus = false;
          }
        }
      }
      
      if (this.onFocus && Input.interact())
      {
        if (!this.cards[this.selectedCard].card.activated)
        {
          this.cards[this.selectedCard].actor.spriteRenderer.setColor(1.5, 1.5, 1);
          this.cards[this.selectedCard].card.activate();
          for (let card of this.cards)
          {
            if (this.cards[this.selectedCard] != card && card.card.activated)
            {
              card.card.disable();
              card.actor.spriteRenderer.setColor(1, 1, 1);
            }
          }
        }
        else
        {
          this.cards[this.selectedCard].actor.spriteRenderer.setColor(1, 1, 1);
          this.cards[this.selectedCard].card.disable();
        }
      }
    }
  }

  refreshCards()
  {
    for (let card of this.cards)
    {
      card.actor.spriteRenderer.setSprite((card.card.locked) ? this.lockedSprite : card.card.sprite);
      if (!card.card.locked)
      {
        card.actor.getChild("CardName").textRenderer.setText(card.card.name);
        card.actor.getChild("CardDescription").textRenderer.setText(card.card.description);
      }
      card.actor.getChild("CardName").setVisible((card.card.locked) ? false : true);
      card.actor.getChild("CardDescription").setVisible((card.card.locked) ? false : true);
    }
  }

  open()
  {
    this.state = CardsBinderState.OPEN;
    this.actor.spriteRenderer.setAnimation("Open");
    this.binder.setVisible(true);
    Game.kevinBehavior.isInteracting = true;
  }

  close()
  {
    if (this.tween != null)
      this.tween.start();
    this.cards[this.selectedCard].selected = false;
    this.cards[this.selectedCard].actor.setLocalScale(new Sup.Math.Vector3(0.7, 0.7, 1));
    this.cards[this.selectedCard].actor.setLocalZ(0.1);
    this.onFocus = false;
    this.state = CardsBinderState.CLOSED;
    this.actor.spriteRenderer.setAnimation("Close");
    this.binder.setVisible(false);
    Game.kevinBehavior.isInteracting = false;
  }
}
Sup.registerBehavior(CardsBinderBehavior);
