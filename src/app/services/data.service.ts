import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ignoreElements, map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class DataService {
  private apiEndpointGlobalData = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/12-31-2020.csv`;
  constructor(private http: HttpClient) {}

  csvJSON(csv: any) {
    var lines = csv.split("\n");

    var result = [];
    var headers: any = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return JSON.stringify(result);
  }
  getGlobalData() {
    return this.http
      .get(this.apiEndpointGlobalData, { responseType: "text" })
      .pipe(
        map((res) => {
          let data = JSON.parse(this.csvJSON(res));
          let temp: any = {};
          let raw: any = {};
          data.forEach((row: any) => {
            temp = {
              active: parseInt(row.Active),
              confirmed: parseInt(row.Confirmed),
              recovered: parseInt(row.Recovered),
              deaths: parseInt(row.Deaths),
              country: row.Country_Region,
              lat: parseFloat(row.Lat),
              long: parseFloat(row.Long_),
            };
            raw[temp.country] = temp;
            if (raw) {
              raw.active = raw.active + temp.active;
              raw.confirmed = raw.confirmed + temp.confirmed;
              raw.recovered = raw.recovered + temp.recovered;
              raw.deaths = raw.deaths + temp.deaths;
            }
            raw[temp.country] = temp;
          });
          raw = Object.values(raw);
          raw = raw.filter((arr: any) => arr);
          raw = raw.filter(
            (arr: any) => !Number.isNaN(arr.confirmed) && arr.active >= 0
          );

          return raw;
        })
      );
  }
}
