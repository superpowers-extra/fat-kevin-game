module Input {
  // In-game Controls
  export function up(autoRepeat=false) {
    return (Sup.Input.wasKeyJustPressed("UP", { autoRepeat }) || Game.gamepadInputBehavior.upJustPressed || (autoRepeat && Game.gamepadInputBehavior.upJustRepeated));
  }
  export function down(autoRepeat=false) {
    return (Sup.Input.wasKeyJustPressed("DOWN", { autoRepeat }) || Game.gamepadInputBehavior.downJustPressed || (autoRepeat && Game.gamepadInputBehavior.downJustRepeated));
  }
  export function left(autoRepeat=false) {
    return (Sup.Input.wasKeyJustPressed("LEFT", { autoRepeat }) || Game.gamepadInputBehavior.leftJustPressed || (autoRepeat && Game.gamepadInputBehavior.leftJustRepeated));
  }
  export function right(autoRepeat=false) {
    return (Sup.Input.wasKeyJustPressed("RIGHT", { autoRepeat }) || Game.gamepadInputBehavior.rightJustPressed || (autoRepeat && Game.gamepadInputBehavior.rightJustRepeated));
  }

  export const minimumAxisTriggerValue = 0.3;

  /*export function holdUp() { return (Sup.Input.isKeyDown("UP") || Sup.Input.getGamepadAxisValue(0, 1) < -minimumAxisTriggerValue); }
  export function holdDown() { return (Sup.Input.isKeyDown("DOWN") || Sup.Input.getGamepadAxisValue(0, 1) > minimumAxisTriggerValue); }
  export function holdLeft() { return (Sup.Input.isKeyDown("LEFT") || Sup.Input.getGamepadAxisValue(0, 0) < -minimumAxisTriggerValue); }
  export function holdRight() { return (Sup.Input.isKeyDown("RIGHT") || Sup.Input.getGamepadAxisValue(0, 0) > minimumAxisTriggerValue); }*/

  export function getMovementAngle() {
    let angle = null;
    if (Sup.Input.isKeyDown("LEFT")) {
      if (Sup.Input.isKeyDown("UP")) angle = Math.PI * 3 / 4;
      else if (Sup.Input.isKeyDown("DOWN")) angle = -Math.PI * 3 / 4;
      else angle = -Math.PI;

    } else if (Sup.Input.isKeyDown("RIGHT")) {
      if (Sup.Input.isKeyDown("UP")) angle = Math.PI / 4;
      else if (Sup.Input.isKeyDown("DOWN")) angle = -Math.PI / 4;
      else angle = 0;

    } else if (Sup.Input.isKeyDown("UP")) angle = Math.PI / 2;
    else if (Sup.Input.isKeyDown("DOWN")) angle = -Math.PI / 2;
    
    if (angle == null) {
      let gamepadX = Sup.Input.getGamepadAxisValue(0, 0);
      let gamepadY = -Sup.Input.getGamepadAxisValue(0, 1);
      const minGamepadValue = 0.25;
      if (gamepadX*gamepadX + gamepadY*gamepadY > minGamepadValue*minGamepadValue) {
        angle = Math.atan2(gamepadY, gamepadX);
      }
    }
    
    return angle;
  }

  export function interact() { return (Sup.Input.wasKeyJustPressed("C") || Sup.Input.wasGamepadButtonJustPressed(0, 1 /* B */)); }
  export function holdInteract() { return (Sup.Input.isKeyDown("C") || Sup.Input.isGamepadButtonDown(0, 1 /* B */)); }

  export function attack() { return (Sup.Input.wasKeyJustPressed("X") || Sup.Input.wasGamepadButtonJustPressed(0, 2 /* X */)); }
  export function roll() { return (Sup.Input.wasKeyJustPressed("V") || Sup.Input.wasGamepadButtonJustPressed(0, 5 /* Left shoulder */)); }
  export function jump() { return (Sup.Input.wasKeyJustPressed("SPACE") || Sup.Input.wasGamepadButtonJustPressed(0, 0 /* A */)); }
    
  // Menu
  export function validate() {
    return (Sup.Input.wasKeyJustPressed("SPACE")
     || Sup.Input.wasKeyJustPressed("X")
     || Sup.Input.wasKeyJustPressed("C")
     || Sup.Input.wasKeyJustPressed("RETURN")
     || Sup.Input.wasGamepadButtonJustPressed(0, 0 /* A */)
     || Sup.Input.wasGamepadButtonJustPressed(0, 1 /* B */)
     || Sup.Input.wasGamepadButtonJustPressed(0, 9 /* Start */));
  }
    
  export function exit() {
    return (Sup.Input.wasKeyJustPressed("ESCAPE") || Sup.Input.wasGamepadButtonJustPressed(0, 9 /* Start */));
  }
}

class GamepadInputBehavior extends Sup.Behavior {
  
  upJustPressed = false;
  downJustPressed = false;
  leftJustPressed = false;
  rightJustPressed = false;

  upJustRepeated = false;
  downJustRepeated = false;
  leftJustRepeated = false;
  rightJustRepeated = false;
  
  // Gamepad timers
  upTimer: number;
  downTimer: number;
  leftTimer: number;
  rightTimer: number;

  awake() {
    Game.gamepadInputBehavior = this;
  }
  
  update() {
    this.upJustPressed = false;
    this.downJustPressed = false;
    this.leftJustPressed = false;
    this.rightJustPressed = false;
    
    this.upJustRepeated = false;
    this.downJustRepeated = false;
    this.leftJustRepeated = false;
    this.rightJustRepeated = false;
    
    const repeatDelay = 15;
    const repeatRate = 8;
    
    if (Sup.Input.getGamepadAxisValue(0, 1) < -Input.minimumAxisTriggerValue) {
      if (this.upTimer == null) {
        this.upTimer = 0;
        this.upJustPressed = true;
      } else {
        this.upTimer++;
        if (this.upTimer > repeatDelay && (this.upTimer - repeatDelay) % repeatRate === 0) this.upJustRepeated = true;
      }
    } else this.upTimer = null;
    
    if (Sup.Input.getGamepadAxisValue(0, 1) > Input.minimumAxisTriggerValue) {
      if (this.downTimer == null) {
        this.downTimer = 0;
        this.downJustPressed = true;
      } else {
        this.downTimer++;
        if (this.downTimer > repeatDelay && (this.downTimer - repeatDelay) % repeatRate === 0) this.downJustRepeated = true;
      }
    } else this.downTimer = null;
    
    if (Sup.Input.getGamepadAxisValue(0, 0) < -Input.minimumAxisTriggerValue) {
      if (this.leftTimer == null) {
        this.leftTimer = 0;
        this.leftJustPressed = true;
      } else {
        this.leftTimer++;
        if (this.leftTimer > repeatDelay && (this.leftTimer - repeatDelay) % repeatRate === 0) this.leftJustRepeated = true;
      }
    } else this.leftTimer = null;
    
    if (Sup.Input.getGamepadAxisValue(0, 0) > Input.minimumAxisTriggerValue) {
      if (this.rightTimer == null) {
        this.rightTimer = 0;
        this.rightJustPressed = true;
      } else {
        this.rightTimer++;
        if (this.rightTimer > repeatDelay && (this.rightTimer - repeatDelay) % repeatRate === 0) this.rightJustRepeated = true;
      }
    } else this.rightTimer = null;
  }
}
Sup.registerBehavior(GamepadInputBehavior);
