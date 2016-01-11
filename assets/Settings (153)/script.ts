module Settings {
  
  export let language = "en";
  export let volume = 50;
  
  // Load on startup
  let json = Sup.Storage.get("kevinSettings");
  if (json != null) {
    let data = JSON.parse(json);
    
    // Language
    if (TextData.texts[data.language] != null) {
      language = data.language;
    }
    
    // Volume
    volume = data.volume;
    Sup.Audio.setMasterVolume(volume / 100);
  }
  
  // Save on exit
  Sup.Input.on("exit", () => {
    Sup.Storage.set("kevinSettings", JSON.stringify({ language, volume }));
  });
}
