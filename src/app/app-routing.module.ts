import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  UrlSerializer,
  NoPreloading,
} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { CoursesModule } from "./courses/courses.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { authGuard } from "./services/auth.guard";
import { canLoadAuthGuard } from "./services/can-load-auth.guard";

// ANGULAR ROUTER PRELOADING STRATEGY
// di default angular carica in lazyloading i moduli solo quando ne ha realmente bisogno, è possibile modificare questa strategia per fare in modo che li carichi solo in precisi momenti, ad esempio potremmo avere un modulo visible solo agli utenti amministratori e quindi non c'è bisogno di caricarlo se un utente è un semplice user
// in un'app con tanti moduli sarebbe utile far precaricare solamente quelli che sono realmente utili subito
const routes: Routes = [
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
  {
    path: "courses",
    // se commentassi questa guard e ricaricassi l'app ed avessi impostata come strategia di preloading PreloadAllModules, su una pagina qualsiasi, ad esempio about, vedrei in console che viene caricato anche il module courses, vedrei effettuata la chiamata verso il BE
    // in pratica con questa opzione di configurazione vado ad eliminare il lazy loading
    canLoad: [canLoadAuthGuard],
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  // pre gestire una custom preloading strategy lo facciamo nell'oggetto di configurazione degli imports
  imports: [
    RouterModule.forRoot(routes, {
      // definiamo la proprietà preloadingStrategy, alla quale passiamo delle classi contenenti una custom preloading startegy
      // di default ogni angular app ha questa proprietà settata come NoPreloading strategy, cioè nessun modulo è precaricato all'avvio dell'app
      // preloadingStrategy: NoPreloading
      // un'alternativa è PreloadAllModules, quando è attiva questa configurazione se si utilizza una CanLoad guard su una route questa guard avrà la precedenza sulla strategia generale
      // preloadingStrategy: PreloadAllModules,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
