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
    // console.log(this.route.snapshot);

    this.course = this.route.snapshot.data["course"];

    // per accedere alle Path Variables di una rotta
    // per ricevere il valore di un determinato parametro utilizzare il .get('nome')
    // paramMap mi dà un oggetto Map in cui posso utilizzare i metodi .get(), .has() etc
    console.log(this.route.snapshot.paramMap);
    // params mi dà un oggetto literals con i path Variables all'interno e non posso utilizzare i metodi
    console.log(this.route.snapshot.params);

    // per accedere ai Query Parameters
    console.log(this.route.snapshot.queryParamMap);
    console.log(this.route.snapshot.queryParams);

    // assegnamo il valore del query parameter couponCode alla property couponCode
    this.couponCode = this.route.snapshot.queryParamMap.get("couponCode");
  }

  // per utilizzare il CanDeactivate si implementa un metodo nel componente della rotta che si vuole lasciare che deve ritornare un booleano
  // questo metodo verrà richiamato nella guard con la CanDeactivate
  confirmExit() {
    return confirm("vuoi abbandonare la pagina?");
  }
}
