import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

// questo service implementa l'interface PreloadingStrategy di angular
// questa contiene un metodo da implementare che si chiama preload
@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
  // questo metodo ha 2 argomenti: la route che decidiamo sia precaricata o no ed una function (di default chiamata fn e che io rinomino load) che sarà la function chiamata se decidiamo di precaricare la rotta
  // il metodo preload viene chiamato quando c'è una transizione verso una rotta che dobbiamo precaricare secondo alcuni criteri
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // la prima cosa che facciamo è controllare fra i data della route se è true il flag preload
    // se è true ritorniamo il metodo load(), quindi precarichiamo
    if (route.data["preload"]) {
      console.log("è true");

      return load();
    }
    // se il modulo non è impostato per essere precaricato ritorniamo un Observable con null, generato con la factory function of() di RxJS, creerà un Oservable che emetterà il valore null e poi si completerà
    else {
      console.log("niente");

      return of(null);
    }
  }
}
