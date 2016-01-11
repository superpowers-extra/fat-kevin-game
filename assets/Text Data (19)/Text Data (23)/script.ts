module TextData {
  
  export let texts = { en: null, fr: null };
  
  export function get(key: string): string {
    let parts = key.split(".");
    let obj = texts[Settings.language];
    for (let part of parts) {
      if (obj == null) {
        Sup.log(`The key -"${key}"- is missing for language -${Settings.language}-`);
        break;
      }
      obj = obj[part];
    }
    return obj != null ? obj : `[Missing key "${key}"]`;
  }
  
  export function getChoices(key: string): { [key: string]: string } { return <any>get(key); }
}
