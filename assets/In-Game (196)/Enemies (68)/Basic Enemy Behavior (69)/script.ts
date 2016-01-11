enum EnemyStates {
  IDLE,
  CHASING,
  ATTACKING,
  DYING,
  DEAD,
    
  SPECIAL_ATTACKING,
}

class BasicEnemyBehavior extends Sup.Behavior {
  
  state = EnemyStates.IDLE;
  isBoss = false;
  
  oldPosition: Sup.Math.Vector2;
  position: Sup.Math.Vector2;
  velocity = new Sup.Math.Vector2();
  speed = 0;
  static maxSpeed = 0.06;
  
  private angle: number;
  lookAtKevin = true;
  
  health: number;
  maxHealth = 3;
  healthActor: Sup.Actor;
  healthRndr: Sup.SpriteRenderer;
  healthOutlineRndr: Sup.SpriteRenderer;
  healthOpacity = 0;
  hitTimer = -1;

  attackDamage = 2;
  
  chaseRange = 7;
  stopChaseRange = 10;
  triggerAttackRange = 1;
  attackRange = 1.2;
  
  attackCooldown = 0;
  static attackCooldownDelay = 20;
 
  static minPeerDistance = 1;
  
  static hitDelay = 15;
  static hitSpeed = 0.12;

  private attackTimer: number = 0;
  
  awake() {
    Game.Room.enemies.push(this);
    this.position = this.actor.getPosition().toVector2();
    this.oldPosition = this.position.clone();
    this.angle = this.actor.getLocalEulerY();
    this.health = this.maxHealth;
    
    if (!this.isBoss) {
      this.healthActor = this.actor.getChild("Health Pivot");
      this.healthOutlineRndr = this.healthActor.getChild("Health").spriteRenderer;
      this.healthRndr = this.healthActor.getChild("Health").getChild("Bar").spriteRenderer;
    } else Game.bossHealthActor.setVisible(true);
  }

  onDestroy() {
    Game.Room.enemies.splice(Game.Room.enemies.indexOf(this), 1);
  }

  updateHealth() {
    let scale: Sup.Math.Vector3;
    if (!this.isBoss) scale = this.healthRndr.actor.getLocalScale();
    else scale = Game.bossHealthActor.getChild("Bar").getLocalScale();
    let targetScale = this.health / this.maxHealth;
    scale.x = Sup.Math.lerp(scale.x, targetScale, 0.15);
    
    if (!this.isBoss) {
      this.healthActor.lookAt(Game.cameraBehavior.position, new Sup.Math.Vector3(0, 0, 1)).setEulerX(0);
      this.healthOpacity = Sup.Math.lerp(this.healthOpacity, 0, 0.02);
      let actualOpacity = Math.min(0.99, this.healthOpacity);
      this.healthOutlineRndr.setOpacity(actualOpacity);
      this.healthRndr.setOpacity(actualOpacity);
      this.healthRndr.actor.setLocalScale(scale);

    } else Game.bossHealthActor.getChild("Bar").setLocalScale(scale);
  }

  onHit() {
    let velocity = new Sup.Math.Vector2();
    velocity.x = -Math.cos(this.angle) * BasicEnemyBehavior.hitSpeed;
    velocity.y = -Math.sin(this.angle) * BasicEnemyBehavior.hitSpeed;
    this.actor.arcadeBody2D.setVelocity(velocity);

    this.hitTimer -= 1;
    if (this.hitTimer === -1) {
      this.actor.modelRenderer.setColor(1.0, 1.0, 1.0);
      this.state = EnemyStates.CHASING;
    }
    
    this.actor.modelRenderer.setAnimation("Run"); //TODO: replace by Hit
  }

  die() {
    this.actor.modelRenderer.setAnimation("Die", false);
    this.actor.arcadeBody2D.setVelocity(0, 0);
    this.state = EnemyStates.DYING;
    this.healthOpacity = 1;
    this.onDie();
  }

  onDie() {}

  onDisapear() {
    let marbleCount = Sup.Math.Random.integer(2,5);
    if (Sup.Math.Random.integer(1,Game.lootChance) == 2) {
      for (let i = 0; i < marbleCount; i++) {
        let marbleActor = new Sup.Actor("Marble", Game.roomActor);
        marbleActor.setPosition(this.actor.getPosition());
        marbleActor.setY(marbleActor.getY() + 0.25)
        new Sup.SpriteRenderer(marbleActor, Sup.get("In-Game/HUD/Marbles", Sup.Sprite));
        new Sup.ArcadePhysics2D.Body(marbleActor, Sup.ArcadePhysics2D.BodyType.Box, {movable: true, width: 1, height: 1});

        marbleActor.addBehavior(MarbleBehavior);
      }
    }
  }

  moveTo(target: Sup.Math.Vector2) {
    let toTarget = target.clone().subtract(this.position);
    
    let targetAngle = Sup.Math.wrapAngle(Math.atan2(toTarget.y, toTarget.x) + Math.PI / 2);
    this.angle = Sup.Math.lerpAngle(this.angle, targetAngle, 0.5);
    if (isNaN(this.angle)) throw new Error("wtf");
    
    this.speed = Sup.Math.lerp(this.speed, BasicEnemyBehavior.maxSpeed, 0.1);
    toTarget.normalize().multiplyScalar(this.speed);
    this.velocity.copy(toTarget);
  }

  movement() {
    // Move
    let isMoving = false;
    let animation: string;
    
    this.oldPosition.copy(this.position);
    this.position.x = this.actor.getX();
    this.position.y = this.actor.getY();
    
    let kevinPosition = Game.kevinBehavior.position;
    let toKevin = kevinPosition.clone().subtract(this.position);
    let toKevinDistance = toKevin.length();
    
    this.attackCooldown -= 1;
    
    if (this.state === EnemyStates.IDLE) {
      this.lookAtKevin = true;
      if (toKevinDistance < this.chaseRange) this.state = EnemyStates.CHASING;

    } else if (this.state === EnemyStates.CHASING) {
      isMoving = true;
      this.lookAtKevin = true;
      this.moveTo(kevinPosition);
      
      if (toKevinDistance > this.stopChaseRange) {
        this.speed = 0;
        this.velocity.set(0, 0);
        this.state = EnemyStates.IDLE;
      }
      
      if (toKevinDistance < this.attackRange && this.attackCooldown <= 0) {
        this.speed = 0;
        this.velocity.set(0, 0);
        this.state = EnemyStates.ATTACKING;
        this.actor.modelRenderer.setAnimation("Punch", false);
      }

    } else if (this.state === EnemyStates.ATTACKING) {
      this.lookAtKevin = false;
      if (!this.actor.modelRenderer.isAnimationPlaying()) {
        if (toKevinDistance < this.attackRange) Game.kevinBehavior.hit(this.attackDamage, this.position);
        this.state = EnemyStates.CHASING;
        this.attackCooldown = BasicEnemyBehavior.attackCooldownDelay;
      }
    }
    
    let targetAngle = Sup.Math.wrapAngle(Math.atan2(toKevin.y, toKevin.x) + Math.PI / 2);
    if (this.speed > 0.05 && !this.lookAtKevin) {
      let lookDirection = this.velocity.clone().normalize();
      targetAngle = Sup.Math.wrapAngle(Math.atan2(lookDirection.y, lookDirection.x) + Math.PI / 2);
    }
    
    this.angle = Sup.Math.lerpAngle(this.angle, targetAngle, 0.1);
    this.actor.setLocalEulerY(this.angle);
    
    if (this.state === EnemyStates.ATTACKING || this.state === EnemyStates.SPECIAL_ATTACKING) return;
    
    if (animation == null) {
      if (this.oldPosition.distanceTo(this.position) > 0.9 * this.speed) animation = "Run";
      else animation = "Idle";
    }
    this.actor.modelRenderer.setAnimation(animation);
  }

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Game.Room.bodies);
    
    this.updateHealth();
    
    if (this.state === EnemyStates.DEAD) return;
    
    if (this.state === EnemyStates.DYING && !this.isBoss) {
      if (!this.actor.modelRenderer.isAnimationPlaying()){
        this.state = EnemyStates.DEAD;
        Utils.delay(this.actor, 0.5, () => {
          this.onDisapear();
          this.actor.destroy();
        });
      }
      return;
    }

    if (this.hitTimer >= 0) {
      this.onHit();
      return;
    }
    
    if (Game.gameOver || Game.suspended) {
      this.state = EnemyStates.IDLE;
      this.actor.modelRenderer.setAnimation("Idle");
      this.velocity.set(0, 0);
      this.actor.arcadeBody2D.setVelocity(this.velocity);
      return;
    }
    
    this.movement();
    this.customBehavior();

    for (let enemy of Game.Room.enemies) {
      if (enemy === this) continue;
      if (enemy.health === 0) continue;
      
      let toEnemy = enemy.position.clone().subtract(this.position);
      let toEnemyDistance = toEnemy.length();
      if (toEnemyDistance < BasicEnemyBehavior.minPeerDistance) {
        let amount = Math.min(1, BasicEnemyBehavior.minPeerDistance - toEnemyDistance);
        toEnemy.normalize().multiplyScalar(amount);
        this.velocity.subtract(toEnemy);
      }
    }
    
    let velocityLength = this.velocity.length();
    if (velocityLength > 0 && velocityLength > this.speed) this.velocity.normalize().multiplyScalar(this.speed);
    this.actor.arcadeBody2D.setVelocity(this.velocity);
  }

  customBehavior() {}

  hit(damage: number) {
    if (this.health === 0 || this.hitTimer >= 0) return;
    
    this.health = Math.max(0, this.health - damage);
    if (this.health === 0) {
      this.die();
      return;
    }

    this.healthOpacity = 3;
    this.hitTimer = BasicEnemyBehavior.hitDelay;
    this.actor.modelRenderer.setColor(1.5, 1.5, 1.5);
  }
}
Sup.registerBehavior(BasicEnemyBehavior);
