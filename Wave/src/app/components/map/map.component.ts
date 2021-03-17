/// <reference types="@types/googlemaps" />
import { Component } from '@angular/core';
 import { LocationsService } from '../../services/locations/locations.service';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {AfterViewInit } from '@angular/core';
// import {MarkerClusterer} from "@google/markerclustererplus";
import MarkerClusterer from '@google/markerclusterer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({

  selector: 'app-maps',

  templateUrl: './maps.component.html',

})

export class MapsComponent implements AfterViewInit {
  @ViewChild('gmap') gmapElement: any;
  locations: any;
   locationsService: LocationsService;
  iconUrl: google.maps.Icon;
  serverData: any;
  map: google.maps.Map;
  markers: Array<any>;
  mc: MarkerClusterer<any>;
  directionsService: google.maps.DirectionsService;
  infoWindow: google.maps.InfoWindow;
  directionsDisplay: google.maps.DirectionsRenderer;
  mapOptions: any;
  canZoom: boolean;
  currentZoom: number;
  startPos: any;
  MY_MAPTYPE_ID: string;
  mainPath: any;
  networkBody:any
  altPath: any;
  marker: google.maps.Marker;

  constructor(locationService: LocationsService) {
    this.locationsService = locationService;
    this.networkBody ={'networkId':['ULH_NETWORK'],'type':['DWDM_INFRASTRUCTURE']};
    this.markers = [];
    this.canZoom = true;
    this.currentZoom = 14;

    this.MY_MAPTYPE_ID = 'custom_style';
    this.directionsService = new google.maps.DirectionsService();
    this.infoWindow = new google.maps.InfoWindow;
    this.directionsDisplay = new google.maps.DirectionsRenderer(

    {
      polylineOptions:
      {
        strokeColor : '#FFFFFF'
      }

    });

    this.mapOptions = {
      zoomControl: this.canZoom,
      panControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      zoom: this.currentZoom,
      zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT
      },

      center: this.startPos,
      mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, this.MY_MAPTYPE_ID]

      },

      mapTypeId: this.MY_MAPTYPE_ID

    };

   }


  ngAfterViewInit() {

    this.initMap();

  }


  initMap = () => {
   const mapProp = {
      center: new google.maps.LatLng(37.090240, -95.712891),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    this.map = new google.maps.Map(document.getElementById('gmap'), {
      zoom: 4,
      center: new google.maps.LatLng(30.2979536, -97.7470835),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const options = {
      gridSize: 100,
      maxZoom: 12,
      zoomOnClick: true,
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    };
    // const mc =  new MarkerClusterer(map, markers, options);

    const latlngs = Array();
    const polyline = new google.maps.Polyline({
      map: this.map,
      path: latlngs,
      strokeOpacity: 0.4
    });

    this.getLocations(this.networkBody);
  }

  getLocations = (loc) =>
  {
    this.locationsService.getLocations(loc).subscribe((newLocs) => this.locationsLoaded(newLocs),(err) =>this.locationsFailure(err));
  }
  
  locationsLoaded = (result:any) =>{
    this.locations = result;
    //.log(this.locations);
    //this.locations.result[0].nodes[i].siteAttributes[0].LATITUDE
    var i:number =0;
    for(i;i<this.locations.result[0].nodes.length;i++)
    {
      //console.log(this.locations.result[0].nodes[i]);
      var a:number = 0;
      for(a;a<1;a++)
      {
        if(this.locations.result[0].nodes[i].siteAttributes[0].name == "LATITUDE") 
        {
          var lat = this.locations.result[0].nodes[i].siteAttributes[0].value;
          var lng = this.locations.result[0].nodes[i].siteAttributes[1].value;
          var id = this.locations.result[0].nodes[i].nodeId;
          //console.log(lat,lng,id);
          //console.log(this.locations.result[0].nodes[i].siteAttributes[0]);
          this.addMarker([lat,lng],id);
        }
      }
      //console.log(this.markers);
      /*
      const markers = this.locations.map(function(location: any, i: any) {
        return new google.maps.Marker({
          position: location,
         // label: labels[i % labels.length],
  
        });
  
      });
      */
    }
  }

  addMarker = (location,id) => {
    var _lat = Number(location[0]);
    var _lng = Number(location[1]);
    //console.log(_lat,_lng);
    var mylatLng  = {lat:_lat,lng:_lng};
   var marker = new google.maps.Marker({
        position: mylatLng,
        map: this.map,
        title:id
    });
    this.markers.push(marker);
  }

  locationsFailure = (error:any) =>{
    console.log("error: " + error);
  }

  }
