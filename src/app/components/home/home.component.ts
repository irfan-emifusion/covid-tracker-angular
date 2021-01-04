import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../services/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}