import { Component, OnInit } from "@angular/core";
import { GoogleChartComponent, GoogleChartInterface } from "ng2-google-charts";
import { DataService } from "./../../services/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  covidData = [];
  totalData = {
    active: 0,
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  };
  pieChart: GoogleChartInterface = {
    chartType: "PieChart",
  };
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.getDataFromService();
  }

  initPieChart() {
    let dataTable = [];
    dataTable.push(["Country", "Cases"]);
    this.covidData.forEach((arr: any) => {
      dataTable.push([arr.country, arr.confirmed]);
    });
    this.pieChart = {
      chartType: "PieChart",
      dataTable,
      options: { Country: "Cases" },
    };
  }
  getDataFromService() {
    this.dataService.getGlobalData().subscribe({
      next: (res) => {
        this.covidData = res;
        res.forEach((arr: any) => {
          this.totalData.active += arr.active;
          this.totalData.confirmed += arr.confirmed;
          this.totalData.deaths += arr.deaths;
          this.totalData.recovered += arr.recovered;
        });
        this.initPieChart();
      },
    });
  }
}
