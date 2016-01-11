module SoundManager{
  
  export function playDistance(sound: Sup.Sound|string, position: Sup.Math.Vector2) {
    
    let kevinPosition = Game.kevinBehavior.position;
    let distance = position.distanceTo(kevinPosition);
   
    if (distance > 100) return;
    let volume = (100 - distance) / 100;
    
    Sup.Audio.playSound(sound, volume);
  }
   
  export function playRandomPitch(sound: Sup.Sound|string) {
    Sup.Audio.playSound(sound, 1, { pitch: Math.random() * 0.4 - 0.2 });
  }
  
}