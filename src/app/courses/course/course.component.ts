import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  course: Course;

  couponCode: string;

  // per poter accedere al course disponibile nel Router ho bisogno di iniettare ActivatedRoute che contiene tutti i dati disponibili per questa rotta
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    //  accedo ai dati contenuti nel Router per questa rotta
    // console.log(this.route.snapshot.data["course"]);
    // console.log(this.route.snapshot.data);
    // console.log(this.route.snapshot.data.course);

    this.course = this.route.snapshot.data["course"];
  }

  // per utilizzare il CanDeactivate si implementa un metodo nel componente della rotta che si vuole lasciare che deve ritornare un booleano
  // questo metodo verrà richiamato nella guard con la CanDeactivate
  confirmExit() {
    return confirm("vuoi abbandonare la pagina?");
  }
}
