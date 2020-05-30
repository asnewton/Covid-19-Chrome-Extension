import { Component, OnInit } from '@angular/core';
import { CovidService } from '../service/covid.service';
import { Chart } from 'chart.js';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private covidService: CovidService) { }

  chart: AnimationPlaybackEvent
  ngOnInit() {
    this.getCovidSummary();

    setInterval(() => {
      this.getCovidSummary();
    }, 10000)
  }
  TotalConfirmed:number;
  TotalDeaths:number;
  TotalRecovered:number;
  NewConfirmed:number;
  NewDeaths:number;
  NewRecovered:number;
  upToDate:any;
  getCovidSummary() {
    this.covidService.getCovidSummary().subscribe(data => { 
      this.TotalConfirmed = data['Global'].TotalConfirmed;
      this.TotalDeaths = data['Global'].TotalDeaths;
      this.TotalRecovered = data['Global'].TotalRecovered;
      this.NewConfirmed = data['Global'].NewConfirmed;
      this.NewDeaths = data['Global'].NewDeaths;
      this.NewRecovered = data['Global'].NewRecovered;
      this.upToDate = data['Date'];
       this.globalChart(data['Global']);
      });
  }

  globalChart(data) {
    let myLabels = ["Total Confirmed", "Total Deaths","Total Recorved"]; 
    let myLabelsPie = ["New Confirmed", "New Deaths","New Recorved"]; 
    var ctx = document.getElementById('myChart');
    var ctxPie = document.getElementById('myChartPie');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: myLabels,
            datasets: [{
                 labels: myLabels,
                data: [data.TotalConfirmed, data.TotalDeaths, data.TotalRecovered ],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            legend: {
              display: false
          },
          title: {
            display: true,
            text: 'Total Cases',
            fontSize:20
        }
        }
    });
    var myChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
          labels: myLabelsPie,
          datasets: [{
               label: myLabelsPie,
              data: [data.NewConfirmed, data.NewDeaths, data.NewRecovered ],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              xAxes: [{
                
                  ticks: {
                      beginAtZero: false,
                      display: false
                  },
                  gridLines: {
                    display: false
                 }
              }],
              yAxes: [{
                  ticks: {
                      beginAtZero: false,
                      display: false
                  },
                  gridLines: {
                    display: false
                 }
              }]
          },
          legend: {
            display: false
        },
        title: {
          display: true,
          text: 'New Cases',
          fontSize:20
      }
      }
  });
  }

}
