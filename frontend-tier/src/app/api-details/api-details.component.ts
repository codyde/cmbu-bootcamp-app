import { Component, ViewChild } from '@angular/core';
import { RestService } from './rest.service';
import { Casdata } from './casdata';

export interface Token {
  cspapitoken: string;
}

@Component({
  selector: 'api-details',
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.scss']
})

export class Apidetailscomponent {
  title = 'cas-demo-app1';
  
  @ViewChild("f") formValues; // Added this
  cspapitoken: string

  public casdata: Casdata = <Casdata>{};

  public barChartData:any[];

  public polarAreaChartData:number[];

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };
  public barChartLabels = ['Blueprints','Cloud Accounts','Deployments','Projects'];
  public barChartType = 'bar';
  public barChartLegend = false;

  public polarAreaChartLabels:string[] = ['Blueprints','Cloud Accounts','Deployments','Projects'];
  public polarAreaLegend:boolean = true;
 
  public polarAreaChartType:string = 'doughnut';

  public show:boolean = false;

  constructor(private rs: RestService) {}

  onSubmit(token: Token) {
    console.log(token);
    this.show = true;
    this.rs.newCall(token).subscribe((data: Casdata) => {
      this.casdata = data;
      this.show = false;
      this.polarAreaChartData = [data.bps, data.cloudaccounts, data.deployments, data.projects];
      console.log(data)
    });
    this.formValues.resetForm();
  }

}