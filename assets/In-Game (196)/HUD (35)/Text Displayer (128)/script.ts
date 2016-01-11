module TextDisplayer
{
  let updateActor: Sup.Actor = null;
  
  let textActor: Sup.Actor = null;
  let textShadowActor: Sup.Actor = null;
  let subtextActor: Sup.Actor = null;
  let subtextShadowActor: Sup.Actor = null;
  
  let iconActor: Sup.Actor = null;
  
  let isActive: boolean = false;
  
  export function init(actor: Sup.Actor/*, text: Sup.Actor, subtext: Sup.Actor*/)
  {
    updateActor = actor;
    textActor = Sup.getActor("Text Displayer"); // text;
    textShadowActor = textActor.getChild("Shadow");
    subtextActor = Sup.getActor("Subtext Displayer"); // subtext;
    subtextShadowActor = subtextActor.getChild("Shadow");
    
    iconActor = Sup.getActor("Icon Displayer"); // Icon;
    
    textActor.textRenderer.setOpacity(0);
    textShadowActor.textRenderer.setOpacity(0);
    subtextActor.textRenderer.setOpacity(0);
    subtextShadowActor.textRenderer.setOpacity(0);
  }
    
  export function display(text: string, subtext: string = null, duration=4, spriteIcon: Sup.Sprite=null)
  {
    if (updateActor != null)
    {
      if (!isActive)
      {
        textActor.textRenderer.setText(text);
        textShadowActor.textRenderer.setText(text);
        subtextActor.textRenderer.setText(subtext);
        subtextShadowActor.textRenderer.setText(subtext);
        
        if (spriteIcon != null) {
           iconActor.spriteRenderer.setSprite(spriteIcon);
        }
        
        new Sup.Tween(updateActor, {opacity:0})
          .to({opacity:1}, 1000)
          .onUpdate((object) => {
            textActor.textRenderer.setOpacity(object.opacity);
            textShadowActor.textRenderer.setOpacity(Math.max(0, object.opacity - 0.5));
            if (subtext != null) {
              subtextActor.textRenderer.setOpacity(object.opacity);
              subtextShadowActor.textRenderer.setOpacity(Math.max(0, object.opacity - 0.5));
            }
            
            if (spriteIcon != null) {
              iconActor.spriteRenderer.setOpacity(object.opacity);
            }
          
        }).onComplete(() => {Utils.delay(updateActor, duration, () => {
          new Sup.Tween(updateActor, {opacity:1})
            .to({opacity:0}, 1000)
            .onUpdate((object) => {
              textActor.textRenderer.setOpacity(object.opacity);
              textShadowActor.textRenderer.setOpacity(Math.max(0, object.opacity - 0.5));
              if (subtext != null) {
                subtextActor.textRenderer.setOpacity(object.opacity);
                subtextShadowActor.textRenderer.setOpacity(Math.max(0, object.opacity - 0.5));
              }
              if (spriteIcon != null) {
                iconActor.spriteRenderer.setOpacity(object.opacity);
              }
          }).start();
        })}).start();
      }
      else
        Sup.log(`[Text Displayer] Can't display "${text} already displaying"`);
    }
    else
      Sup.log("TextDisplayer.display() is called but the module hasn't been initialized yet.")
  }
}
