module Utils {
  export function delay(updateActor: Sup.Actor, duration: number, callback: Function) {
    new Sup.Tween(updateActor, {delay:0})
      .to({delay:1}, duration * 1000)
      .onComplete(() => {callback()})
      .start();
  }

  export function wrapText(text: string, font: Sup.Font, lineWidth: number) {
    let wrappedText = "";
    let lines = text.split("\n");
    for (let line of lines) {
      let currentLine = (wrappedText.length === 0 && line.length > 0) ? "" : "\n";
      let words = line.split(" ");
      for (let world of words) {
        if (font.getTextWidth(currentLine) + font.getTextWidth(world) < lineWidth) {
          if (currentLine.length > 0 && currentLine !== "\n") currentLine += " ";
        } else {
          wrappedText += currentLine;
          currentLine = "\n";
        }
        currentLine += world;
      }
      wrappedText += currentLine;
    }
    return wrappedText;
  }
}
