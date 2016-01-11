class BossEnemyBehavior extends BasicEnemyBehavior {
  isBoss = true;

  maxHealth = 20;

  pickUpPoints: Sup.Math.Vector2[] = [];
  currentPickUpPoint: Sup.Math.Vector2;

  private throwTimer = 0;
  static throwDelay = 180; //500

  hasThrown = false;

  awake() {
    super.awake();

    let pickUpActors = Sup.getActor("Balls PickupPoints").getChildren();
    for (let pickUpActor of pickUpActors) this.pickUpPoints.push(pickUpActor.getLocalPosition().toVector2());
  }

  die() {
    this.state = EnemyStates.DEAD;
    Game.bossHealthActor.setVisible(false);
    
    Game.dialogBehavior.speak("Jeremy", "bossGiveUp", () => {
      Game.dialogBehavior.speak("Jeremy", "iDontHaveTheCard", () => {
        Transition.fadeOut(300, () => {
          Utils.delay(this.actor, 0.3, () => { Game.showMissionInfo("End"); })
        });
      });
    });
  }

  customBehavior() {
    if (this.state === EnemyStates.IDLE || this.state === EnemyStates.ATTACKING) return;
    
    if (this.state === EnemyStates.SPECIAL_ATTACKING) {
      if (this.position.distanceTo(this.currentPickUpPoint) > 0.5) {
        this.lookAtKevin = false;
        this.moveTo(this.currentPickUpPoint);
        
      } else {
        this.lookAtKevin = true;
        if (!this.hasThrown) {
          this.hasThrown = true;
          this.actor.modelRenderer.setAnimation("Launch", false);

          let ballActor = Sup.appendScene("In-Game/Rooms/Locker Room/Monster/Ball Prefab", this.actor)[0];
          ballActor.setParent(null);

          Utils.delay(this.actor, 1, () => {
            this.hasThrown = false;
            this.state = EnemyStates.CHASING;
            
          });
        }
      }
      
    } else {
      this.throwTimer += 1;
      if (this.throwTimer >= BossEnemyBehavior.throwDelay) {
        this.throwTimer = 0;
        this.state = EnemyStates.SPECIAL_ATTACKING;
        this.findPickUpPoint();
      }
    }
  }

  findPickUpPoint(previousPickUpPoint?: Sup.Math.Vector2) {
    let closestPickUpPoint: Sup.Math.Vector2;
    let closestDistance = 1000;
    
    for (let pickUpPoint of this.pickUpPoints)
    {
      if (previousPickUpPoint != null && pickUpPoint.distanceTo(previousPickUpPoint) < 1) continue;

      let distance = this.position.distanceTo(pickUpPoint);
      if (distance < closestDistance)
      {
        closestPickUpPoint = pickUpPoint;
        closestDistance = distance;
      }
    }
    this.currentPickUpPoint = closestPickUpPoint;
  }
  
  hit(damage: number) {
    super.hit(damage);
    if (this.state === EnemyStates.SPECIAL_ATTACKING && this.hitTimer === BasicEnemyBehavior.hitDelay) this.findPickUpPoint(this.currentPickUpPoint);
  }
}
Sup.registerBehavior(BossEnemyBehavior);
