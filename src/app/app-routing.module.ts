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
import { CustomPreloadingStrategy } from "./services/custom-preloading.strategy";
import { ChatComponent } from "./chat/chat.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
  {
    path: "courses",
    // canLoad: [canLoadAuthGuard],
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
    data: {
      preload: false,
    },
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  // aggiungo la rotta per il ChatComponent
  {
    path: "chat",
    component: ChatComponent,
    // con la property outlet definiamo il nome del router-outlet secondario dove vogliamo che venga renderizzato il componente
    outlet: "chat",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
      // altre opzioni di configurazione del RouterModule
      // enableTracing, booleano, utile per il debug, mostra informazioni in console sulle rotte durante la navigazione
      enableTracing: false,
      // viene messo l'hash (il cancelletto) che determina per il server quale è la root dell'app per l'index.html, quando è true
      useHash: false,
      // se torno alla pagina che ho lasciato mi riporta dove avevo scrollato
      scrollPositionRestoration: "enabled",
      // paramsInheritanceStrategy settata 'always' mi permette di ritrovare nella rotta chil fra i suoi Path Variables anche quelli del parent, non ho quindi bisogno di fare ad esempio route.parent.paramMap.get("courseUrl") ma mi basta fare route.paramMap.get("courseUrl") ad esempio nei resolver
      paramsInheritanceStrategy: "always",
    }),
  ],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy],
})
export class AppRoutingModule {}
