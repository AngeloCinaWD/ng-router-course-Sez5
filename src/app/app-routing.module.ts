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

// CUSTOM ROUTER PRELOADING STRATEGY
// per definire se un modulo deve essere o no precaricato utilizziamo la property data dell'oggetto di configurazione di ogni rotta
const routes: Routes = [
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
  {
    path: "courses",
    // tolgo la CanLoad guard
    // canLoad: [canLoadAuthGuard],
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
    data: {
      // definiamo la proprietà preload: true se deve essere precaricato, false se non lo deve essere
      // per gestire una preloading strategy creo un service in services/custom-preloading.strategy.ts
      preload: true,
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
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      // definiamo come strategia di precaricamento la CustomPreloadingStrategy
      preloadingStrategy: CustomPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
  // dobbimao importare la CustomPreloadingStrategy fra i providers
  providers: [CustomPreloadingStrategy],
})
export class AppRoutingModule {}
