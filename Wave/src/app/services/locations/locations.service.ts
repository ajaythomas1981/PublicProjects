import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic SVZBUFA6aXZhcHA='
  })
};

@Injectable()

export class LocationsService {

  $http: HttpClient;
  serverData: any;
  networkTopologyURL: string;

  constructor(http: HttpClient) {

    this.$http = http;
    this.networkTopologyURL = 'https://trail-clr-uat.cfappsawsnpeast-hto.ebiz.verizon.com/network/search?';
    this.setData();
   }


   getLocations = (locationType:string) =>{
    var url = this.networkTopologyURL+"page=1&size=250";
      var data= JSON.stringify(locationType);
     return this.$http.post(url,data,httpOptions)
    }

  setData = () => {
    console.log('nothing');
  }

}
