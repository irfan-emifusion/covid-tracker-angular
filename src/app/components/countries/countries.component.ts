import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../services/data.service";

@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.css"],
})
export class CountriesComponent implements OnInit {
  covidData = [];
  countries: String[] = [];
  totalData = {
    active: 0,
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  };
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.getDataFromService();
  }

  getDataFromService() {
    this.dataService.getGlobalData().subscribe((res) => {
      this.covidData = res;
      res.forEach((arr: any) => {
        this.countries.push(arr.country);
      });
      console.log(this.countries);
    });
  }
  updateCountryData(country: String) {
    this.covidData.forEach((arr: any) => {
      if (arr.country === country) {
        this.totalData.active += arr.active;
        this.totalData.confirmed += arr.confirmed;
        this.totalData.deaths += arr.deaths;
        this.totalData.recovered += arr.recovered;
      }
    });
  }
}
