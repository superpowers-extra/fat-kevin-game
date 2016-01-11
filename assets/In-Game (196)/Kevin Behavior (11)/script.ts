class KevinBehavior extends Sup.Behavior {

  position: Sup.Math.Vector2;
  angle = 0;
  targetAngle = 0;
  modelActor: Sup.Actor;
  lightActor: Sup.Actor;
  lightPosition: Sup.Math.Vector3;

  attackDamage = 1;
  moveSpeed = 0;
  jumpSpeed = 0;
  rollSpeed = 0.12;
  rollCooldown = 0;

  static rollCoolDownDelay = 30;
  static maxMoveSpeed = 0.1;
  static changeRoomSpeed = 0.05;
  static hitSpeed = 0.05;
 
  static maxVerticalJumpSpeed = 0.1;
  static gravity = 0.0055;

  static interactionDistance = 1.2;
  static attackDistance = 1.5;

  isInteracting = false;
  isChangingRoom = false;
  footsteps: Sup.Audio.SoundPlayer = null;
  footstepsPlaying: boolean = false;

  awake() {
    this.position = this.actor.getPosition().toVector2();
    this.modelActor = this.actor.getChild("Model");
    this.lightActor = this.actor.getChild("Light");
    this.lightPosition = this.lightActor.getLocalPosition();
    this.footsteps = new Sup.Audio.SoundPlayer("Sounds/Sounds effects/Footsteps2");
    this.footsteps.stop();
    this.footsteps.setLoop(true);
  }

  warpPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    this.actor.arcadeBody2D.warpPosition(this.position);
  }

  warpAngle(angle: number) {
    this.targetAngle = angle;
    this.angle = angle;
  }

  isIdleOrRun() { return (this.modelActor.modelRenderer.getAnimation() === "Idle" || this.modelActor.modelRenderer.getAnimation() === "Run"); }

  canHit() {
    let animationRatio = this.modelActor.modelRenderer.getAnimationTime() / this.modelActor.modelRenderer.getAnimationDuration();
    return (this.modelActor.modelRenderer.getAnimation() === "Punch" && animationRatio > 0.8)
  }

  canSee(targetPosition: Sup.Math.Vector2) {
    let angle = Math.atan2(targetPosition.y - this.position.y, targetPosition.x - this.position.x);
    return Math.abs(Sup.Math.wrapAngle(angle - this.targetAngle)) < Math.PI / 4;
  }

  addHeart() {
    Game.hearts += 1;
    Game.health += Game.healthByHeart;
    Game.healthBehavior.createHearts();
  }

  removeHeart() {
    Game.hearts -= 1;
    Game.health = Math.min(Game.health, Game.healthByHeart * Game.hearts);
    Game.healthBehavior.createHearts();
  }

  hit(damage: number, enemyPosition: Sup.Math.Vector2) {
    if (this.modelActor.modelRenderer.getAnimation() === "Hit") return;
    
    SoundManager.playRandomPitch(Sup.get("Sounds/Sounds effects/Hit", Sup.Sound));
    Game.health = Math.max(0, Game.health - damage);
    Game.healthBehavior.refresh();

    let angle = Math.atan2(enemyPosition.y - this.position.y, enemyPosition.x - this.position.x);
    this.warpAngle(angle);
    
    if (Game.health === 0) {
      this.modelActor.modelRenderer.setAnimation("Die", false);
      this.actor.arcadeBody2D.setVelocity(0, 0);
      Game.gameOver = true;
      TextDisplayer.display("Game Over...");
      Utils.delay(this.actor, 2, () => {
        Transition.fadeOut(300, () => {
          Utils.delay(this.actor, 0.3, () => {
            Game.showMissionInfo(Game.missionName); })
         });
       });
    }
    else this.modelActor.modelRenderer.setAnimation("Hit", false);
  }

  update() {
    if (Game.gameOver) return;

    this.doControls();
    if (Sup.Input.wasKeyJustPressed("R")) Game.showMissionInfo(Game.missionName);
  }
  
  doControls() {
    // Direction
    let isMoving = false;
    
    if (!this.isInteracting && (this.isIdleOrRun() || this.modelActor.modelRenderer.getAnimation() === "Jump")) {
      
      let angle = Input.getMovementAngle();
      
      if (angle != null) {
        this.targetAngle = angle;
        isMoving = true;
      }
    }
    
    this.angle = Sup.Math.lerpAngle(this.angle, this.targetAngle, 0.2);
    this.modelActor.setLocalEulerY(this.angle + Math.PI / 2);
    
    if (isMoving && !this.footstepsPlaying)
    {
      this.footstepsPlaying = true;
      this.footsteps.play();
    }
    else if (!isMoving)
    {
      this.footstepsPlaying = false;
      this.footsteps.stop();
    }

    
    // Movement
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Game.Room.bodies);
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    // Roll
    this.rollCooldown -= 1;
    if (!this.isInteracting && Input.roll() && this.isIdleOrRun() && this.rollCooldown <= 0) {
      this.modelActor.modelRenderer.setAnimation("Roll", false);
      Sup.Audio.playSound("Sounds/Sounds effects/Roulade");
    }
    
    // Jump
    this.jumpSpeed -= KevinBehavior.gravity;
    let y = this.modelActor.getLocalY();
    y += this.jumpSpeed;
    if (y <= 0) {
      y = 0;
      if (this.modelActor.modelRenderer.getAnimation() === "Jump") this.modelActor.modelRenderer.setAnimation("Idle");
    }
    this.modelActor.setLocalY(y);
      
    if (!this.isInteracting && Input.jump() && this.isIdleOrRun()) {
      this.modelActor.modelRenderer.setAnimation("Jump", false);
      this.jumpSpeed = KevinBehavior.maxVerticalJumpSpeed;
    }
    
    if (this.modelActor.modelRenderer.getAnimation() === "Hit") {
      velocity.set(-Math.cos(this.targetAngle) * KevinBehavior.hitSpeed, -Math.sin(this.targetAngle) * KevinBehavior.hitSpeed);
      
      if (!this.modelActor.modelRenderer.isAnimationPlaying()) this.modelActor.modelRenderer.setAnimation("Idle");
      
    } else if (this.isChangingRoom) {
      this.modelActor.modelRenderer.setAnimation("Run");
      velocity.set(Math.cos(this.targetAngle) * KevinBehavior.changeRoomSpeed, Math.sin(this.targetAngle) * KevinBehavior.changeRoomSpeed);
      
    } else if (this.isInteracting) {
      this.modelActor.modelRenderer.setAnimation("Idle");
      velocity.set(0, 0);
      
    } else if (this.modelActor.modelRenderer.getAnimation() === "Roll") {
      velocity.set(Math.cos(this.targetAngle) * this.rollSpeed, Math.sin(this.targetAngle) * this.rollSpeed);
      if (!this.modelActor.modelRenderer.isAnimationPlaying()) {
        this.modelActor.modelRenderer.setAnimation("Idle");
        this.rollCooldown = KevinBehavior.rollCoolDownDelay;
      }
      
    } else if (isMoving) {
      if (this.modelActor.modelRenderer.getAnimation() === "Jump") {
        if (!this.modelActor.modelRenderer.isAnimationPlaying()) this.modelActor.modelRenderer.setAnimation("Idle");  
      } else this.modelActor.modelRenderer.setAnimation("Run");
      
      this.moveSpeed = Sup.Math.lerp(this.moveSpeed, KevinBehavior.maxMoveSpeed, 0.1);
      velocity.set(Math.cos(this.targetAngle) * this.moveSpeed, Math.sin(this.targetAngle) * this.moveSpeed);
      
    } else {
      if ((this.modelActor.modelRenderer.getAnimation() !== "Punch" && this.modelActor.modelRenderer.getAnimation() !== "Jump") || !this.modelActor.modelRenderer.isAnimationPlaying())
        this.modelActor.modelRenderer.setAnimation("Idle");
      velocity.set(0, 0);
      this.moveSpeed = 0;
    }
    
    // Collide and attack with enemies
    if (!this.isInteracting && Input.attack() && this.isIdleOrRun()) this.modelActor.modelRenderer.setAnimation("Punch", false);
    
    let offset = new Sup.Math.Vector2();
    let movedPos = this.position.clone().add(velocity);
    for (let enemy of Game.Room.enemies) {
      if (enemy.health === 0) continue;
      
      let toEnemy = enemy.position.clone().subtract(movedPos);
      let toEnemyDistance = toEnemy.length();
      if (toEnemyDistance < BasicEnemyBehavior.minPeerDistance) {
        let amount = Math.min(1, BasicEnemyBehavior.minPeerDistance - toEnemyDistance);
        toEnemy.normalize().multiplyScalar(Math.min(this.moveSpeed, amount));
        offset.subtract(toEnemy);
        movedPos.subtract(toEnemy);
      }
      
      if (this.canHit() && this.canSee(enemy.position) && toEnemyDistance < KevinBehavior.attackDistance){
        enemy.hit(this.attackDamage);
        SoundManager.playRandomPitch(Sup.get("Sounds/Sounds effects/Punch2", Sup.Sound));
      }
    }
    
    if (offset.length() > 0) {
      offset.normalize().multiplyScalar(this.moveSpeed);
      velocity.add(offset);
      let length = velocity.length();
      if (length > this.moveSpeed) velocity.multiplyScalar(this.moveSpeed / length);
    }
    
    this.actor.arcadeBody2D.setVelocity(velocity);
    
    // Interactions
    this.position.x = this.actor.getX();
    this.position.y = this.actor.getY();
    
    this.lightPosition.x = this.position.x;
    this.lightPosition.y = this.position.y;
    this.lightActor.light.setTarget(this.lightPosition);
    
    let closestInteractable: InteractiveBehavior = null;
    let closestDistance = 1000;
    for (let interactable of Game.Room.interactables)
    {
      interactable.canTrigger(false);
      let interactablePosition = interactable.actor.getPosition().toVector2();
      let distanceToInteractable = interactablePosition.distanceTo(this.position);

      if (distanceToInteractable < KevinBehavior.interactionDistance && this.canSee(interactablePosition) && distanceToInteractable < closestDistance) {
        closestInteractable = interactable;
        closestDistance = distanceToInteractable;
      }
      
      if (closestInteractable != null) {
        closestInteractable.canTrigger(true);
        if (!this.isInteracting && Input.interact()) closestInteractable.interact();
      }
    }
  }
}
Sup.registerBehavior(KevinBehavior);
