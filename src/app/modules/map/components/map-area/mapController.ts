import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { latLng, tileLayer } from 'leaflet';

export class MapController{

  private static map: L.Map;

  constructor(){}

  public static setMap(map: L.Map){
    this.map = map;
  }

  public static mapInitializer(center: L.LatLng){

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker(center, {
      icon: L.icon({
        ...L.Icon.Default.prototype.options,
        iconUrl: 'src/assets/marker-icon.png',
        iconRetinaUrl: 'src/assets/marker-icon-2x.png',
        shadowUrl: 'src/assets/marker-shadow.png'
      })
    }).addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }

}