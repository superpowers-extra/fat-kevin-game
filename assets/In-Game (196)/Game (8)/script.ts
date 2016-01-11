module Game {

  export let gameOver = false;
  export let suspended = false;
  export let missionName: string;
  
  export let kevinBehavior: KevinBehavior;
  export let cameraBehavior: CameraBehavior;
  export let dialogBehavior: DialogBehavior;
  export let inventoryBehavior: InventoryBehavior;
  export let gamepadInputBehavior: GamepadInputBehavior;
  
  export let roomActor: Sup.Actor;
  export let map: Sup.TileMap;
  
  export let healthBehavior: KevinHealthBehavior;
  export let health: number;
  export let hearts = 4;
  export let healthByHeart = 4;
  export let marblesCount: number;
  export let lootChance: number = 3;
  
  export let bossHealthActor: Sup.Actor;

  export module Room {
    export let bodies: Sup.ArcadePhysics2D.Body[] = [];
    export let interactables: InteractiveBehavior[] = [];
    export let enemies: BasicEnemyBehavior[] = [];
  }
  
  export function init() {
    roomActor = null;
    
    Game.health = Game.hearts * Game.healthByHeart;
    Sup.loadScene("In-Game/Game Scene");
    
    kevinBehavior = Sup.getActor("Kevin").getBehavior(KevinBehavior);
    bossHealthActor = Sup.getActor("HUD").getChild("Boss Health");
    Transition.init(cameraBehavior.actor, Sup.getActor("Transition"));
    TextDisplayer.init(cameraBehavior.actor);
  }
  
  export function showMissionInfo(missionName: string) {
    Game.missionName = missionName;
    Sup.loadScene("Mission Menu/Mission Menu");
  }
  
  export function startMission() {
    MissionGranny.reset();
    MissionBirthday.reset();
    MissionMonster.reset();
    MissionEnd.reset();
    
    let missionSpawn: { startScene: string; startSpawnpoint: string; } = missionSpawns[missionName];
    TextDisplayer.display(TextData.get(`${missionName}.title`), TextData.get(`${Game.missionName}.summary`));
    Game.gameOver = false;
    marblesCount = 0;
    enterRoom(missionSpawn.startScene, missionSpawn.startSpawnpoint);
  }
    
  export function enterRoom(roomName: string, spawnName: string) {
    if (roomActor != null) roomActor.destroy();
    Game.Room.bodies.length = 0;

    roomActor = new Sup.Actor(roomName);
    Sup.appendScene(`In-Game/Rooms/${roomName}/${roomName}`, roomActor);
    let kevinSpawn = roomActor.getChild(spawnName);
    
    let mapActor = roomActor.getChild("Map");
    map = mapActor.tileMapRenderer.getTileMap();
    let mapBody = new Sup.ArcadePhysics2D.Body(mapActor, Sup.ArcadePhysics2D.BodyType.TileMap, {
      tileMapAsset: mapActor.tileMapRenderer.getTileMap(), tileSetPropertyName: "solid", layersIndex: "0"
    })
    Room.bodies.push(mapBody);
    
    let propsActor = roomActor.getChild("Props");
    let walk = (actor: Sup.Actor) => {
      if (actor.arcadeBody2D != null) Room.bodies.push(actor.arcadeBody2D);
      for (let child of actor.getChildren()) walk(child);
    }
    if (propsActor != null) walk(propsActor);
    
    let kevenPosition = kevinSpawn.getLocalPosition();
    kevinBehavior.warpPosition(kevenPosition.x, -kevenPosition.z);
    kevinBehavior.warpAngle(kevinSpawn.getLocalEulerY());
    kevinBehavior.isChangingRoom = true;
    cameraBehavior.init();
    
    Game.suspended = false;
    Transition.fadeIn(300, () => {
      kevinBehavior.isInteracting = false;
      kevinBehavior.isChangingRoom = false;
    });
  }
}
