import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CourseComponent } from "./course/course.component";
import { CourseResolver } from "./services/course.resolver";
import { LessonsListComponent } from "./lessons-list/lessons-list.component";
import { LessonDetailComponent } from "./lesson/lesson-detail.component";
import { lessonsResolver } from "./services/lessons.resolver";
import { lessonDetailResolver } from "./services/lesson-detail.resolver";
import { authGuard } from "../services/auth.guard";
import { authChildGuard } from "../services/auth-child.guard";
import { confirmExitGuard } from "../services/confirm-exit.guard";

const routes: Routes = [
  // questa rotta sarà aperta
  {
    path: "",
    component: HomeComponent,
    // data: { ruolo: "ruolo" },
  },
  // questa rotta si potrà accedere solo se si è loggati
  {
    path: ":courseUrl",
    component: CourseComponent,
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    canDeactivate: [confirmExitGuard],
    resolve: {
      course: CourseResolver,
    },
    children: [
      {
        path: "",
        component: LessonsListComponent,
        resolve: {
          lessons: lessonsResolver,
        },
      },
      {
        path: "lessons/:lessonSeqNo",
        component: LessonDetailComponent,
        resolve: {
          lesson: lessonDetailResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseResolver],
})
export class CoursesRoutingModule {}
