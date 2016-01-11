module Transition
{
  let updateActor: Sup.Actor;
  let transitionActor: Sup.Actor;
  
  export function init(actor: Sup.Actor, fadeActor: Sup.Actor)
  {
    updateActor = actor;
    transitionActor = fadeActor;
    fadeActor.setLocalZ(0.9);
    transitionActor.spriteRenderer.setOpacity(0);
  }
  
  export function fadeIn(duration: number, callback: Function = null)
  {
    new Sup.Tween(updateActor, {opacity: 1})
      .to({opacity: 0}, duration)
      .onUpdate((object) => {
      transitionActor.spriteRenderer.setOpacity(object.opacity);
    }).onComplete(() => {
      if (callback != null) callback();
    })
    .start();
  }
  
  export function fadeOut(duration: number, callback: Function = null)
  {
    new Sup.Tween(updateActor, {opacity: 0})
      .to({opacity: 1}, duration)
      .onUpdate((object) => {
      transitionActor.spriteRenderer.setOpacity(object.opacity);
    }).onComplete(() => {
      if (callback != null) callback();
    })
    .start();
  }
}
