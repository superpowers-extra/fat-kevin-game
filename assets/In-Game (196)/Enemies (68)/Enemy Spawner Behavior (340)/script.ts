class EnemySpawnerBehavior extends Sup.Behavior {
  minEnemies = 2;
  maxEnemies = 4;
  
  awake() {
    let skins = Sup.get("In-Game/Enemies/Prefabs", Sup.Folder).children;
    
    let enemiesToSpawn = Sup.Math.Random.integer(this.minEnemies, this.maxEnemies);
    let spawns = this.actor.getChildren();
    for (let i = 0; i < enemiesToSpawn; i++) {
      if (spawns.length === 0) {
        Sup.log("Not enough enemies spawn points");
        return;
      }
      let spawnIndex = Sup.Math.Random.integer(0, spawns.length - 1);
      let spawn = spawns[spawnIndex];
      let skin = Sup.Math.Random.sample(skins);
      let actor = Sup.appendScene(`In-Game/Enemies/Prefabs/${skin}`, spawn)[0];
      spawns.splice(spawnIndex, 1);
    }
  }
}
Sup.registerBehavior(EnemySpawnerBehavior);
