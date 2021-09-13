import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { CommonService } from "../../common/common.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = "bar";
  barChartLegend = true;

  barChartData: ChartDataSets[] = [{ data: [], label: "Launch Count" }];
  upcomongLaunchCount: any;
  pastLaunchCount: any;
  totalLaunchCount: any;
  launchYear: any = [];
  yearCount: string[];
  temp: any = [];

  constructor(private cs: CommonService) {}

  ngOnInit() {
    this.getUpcomingLaunches();
    this.getPastLaunches();
    this.getTotalLaunches();
  }

  getUpcomingLaunches() {
    this.cs.getUcLaunch().subscribe((res: any) => {
      this.upcomongLaunchCount = res;
    });
  }
  getPastLaunches() {
    this.cs.getPastLaunch().subscribe((res: any) => {
      this.pastLaunchCount = res;
    });
  }
  getTotalLaunches() {
    this.cs.getTotalLaunch().subscribe((res: any) => {
      this.totalLaunchCount = res;
      this.totalLaunchCount.forEach((element: any) => {
        this.launchYear.push(element.launch_year);
      });
//Get the count of all years and their repetitive counts
      const counts = {};
      for (const num of this.launchYear) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }
      this.yearCount = Object.keys(counts);
      this.barChartLabels = this.yearCount;
      for (let i = 0; i <= this.yearCount.length; i++) {
        let currYear = this.yearCount[i];
        this.temp.push(counts[currYear]);
      }
      this.barChartData[0].data = this.temp;
    });
  }
}
