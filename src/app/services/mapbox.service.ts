// import { Inject, Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
// import { LngLatLike } from 'mapbox-gl';
// import * as mapboxgl from 'mapbox-gl';

// // @ts-ignore
// import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

// @Injectable({
//   providedIn: 'root'
// })
// export class MapboxService {

//   private map!: mapboxgl.Map;
//   private readonly center: GeoJson = new GeoJson([20.85, 39.66], {
//     name: 'Ioannina', details: 'City Center'
//   });

//   constructor() {
//     (<any>mapboxgl).accessToken = environment.mapbox.accessToken;
//   }

//   public initializeMap(el: string){
//     this.map = new mapboxgl.Map({
//       center: this.getLngLat(this.center.geometry.coordinates),
//       container: el,
//       style: 'mapbox://styles/bill435/cl67vtkyz001b15ruln6hztuu',
//       zoom: 13
//     });
//     this.map.addControl(new mapboxgl.NavigationControl());
//   }

//   public fetchOasa(){
//     const testPoints = [{"routed_x":"23.54011","routed_y":"38.03587","routed_order":"1"},{"routed_x":"23.53951","routed_y":"38.03618","routed_order":"2"},{"routed_x":"23.53771","routed_y":"38.03691","routed_order":"3"},{"routed_x":"23.54213","routed_y":"38.04307","routed_order":"4"},{"routed_x":"23.53657","routed_y":"38.04453","routed_order":"5"},{"routed_x":"23.53726","routed_y":"38.04771","routed_order":"6"},{"routed_x":"23.53735","routed_y":"38.04834","routed_order":"7"},{"routed_x":"23.53469","routed_y":"38.05457","routed_order":"8"},{"routed_x":"23.53094","routed_y":"38.0632","routed_order":"9"},{"routed_x":"23.52953","routed_y":"38.06629","routed_order":"10"},{"routed_x":"23.52978","routed_y":"38.06729","routed_order":"11"},{"routed_x":"23.53029","routed_y":"38.0678","routed_order":"12"},{"routed_x":"23.53162","routed_y":"38.06872","routed_order":"13"},{"routed_x":"23.53175","routed_y":"38.06916","routed_order":"14"},{"routed_x":"23.53167","routed_y":"38.07015","routed_order":"15"},{"routed_x":"23.53139","routed_y":"38.07191","routed_order":"16"},{"routed_x":"23.53157","routed_y":"38.07237","routed_order":"17"},{"routed_x":"23.53243","routed_y":"38.07299","routed_order":"18"},{"routed_x":"23.53355","routed_y":"38.07337","routed_order":"19"},{"routed_x":"23.53881","routed_y":"38.07538","routed_order":"20"},{"routed_x":"23.53984","routed_y":"38.07554","routed_order":"21"},{"routed_x":"23.54054","routed_y":"38.07544","routed_order":"22"},{"routed_x":"23.54161","routed_y":"38.08106","routed_order":"23"},{"routed_x":"23.54533","routed_y":"38.08185","routed_order":"24"},{"routed_x":"23.55108","routed_y":"38.08258","routed_order":"25"},{"routed_x":"23.55407","routed_y":"38.08281","routed_order":"26"},{"routed_x":"23.55677","routed_y":"38.08253","routed_order":"27"},{"routed_x":"23.55981","routed_y":"38.08016","routed_order":"28"},{"routed_x":"23.5615","routed_y":"38.0787","routed_order":"29"},{"routed_x":"23.56376","routed_y":"38.07689","routed_order":"30"},{"routed_x":"23.56601","routed_y":"38.07616","routed_order":"31"},{"routed_x":"23.56689","routed_y":"38.07584","routed_order":"32"},{"routed_x":"23.56862","routed_y":"38.07566","routed_order":"33"},{"routed_x":"23.57099","routed_y":"38.07562","routed_order":"34"},{"routed_x":"23.57318","routed_y":"38.07506","routed_order":"35"},{"routed_x":"23.57583","routed_y":"38.07418","routed_order":"36"},{"routed_x":"23.58047","routed_y":"38.06888","routed_order":"37"},{"routed_x":"23.58429","routed_y":"38.06506","routed_order":"38"},{"routed_x":"23.58496","routed_y":"38.06462","routed_order":"39"},{"routed_x":"23.58529","routed_y":"38.06514","routed_order":"40"},{"routed_x":"23.58689","routed_y":"38.06488","routed_order":"41"},{"routed_x":"23.58605","routed_y":"38.06231","routed_order":"42"},{"routed_x":"23.58517","routed_y":"38.0597","routed_order":"43"},{"routed_x":"23.59284","routed_y":"38.05796","routed_order":"44"},{"routed_x":"23.59468","routed_y":"38.06305","routed_order":"45"},{"routed_x":"23.59558","routed_y":"38.06548","routed_order":"46"},{"routed_x":"23.59585","routed_y":"38.06659","routed_order":"47"},{"routed_x":"23.59695","routed_y":"38.06721","routed_order":"48"},{"routed_x":"23.59807","routed_y":"38.06849","routed_order":"49"},{"routed_x":"23.59873","routed_y":"38.06944","routed_order":"50"},{"routed_x":"23.60069","routed_y":"38.07166","routed_order":"51"},{"routed_x":"23.60649","routed_y":"38.07062","routed_order":"52"},{"routed_x":"23.6209","routed_y":"38.06781","routed_order":"53"},{"routed_x":"23.62708","routed_y":"38.06654","routed_order":"54"},{"routed_x":"23.63113","routed_y":"38.06572","routed_order":"55"},{"routed_x":"23.63711","routed_y":"38.0645","routed_order":"56"},{"routed_x":"23.63871","routed_y":"38.06418","routed_order":"57"},{"routed_x":"23.64245","routed_y":"38.06373","routed_order":"58"},{"routed_x":"23.64538","routed_y":"38.06339","routed_order":"59"},{"routed_x":"23.64646","routed_y":"38.06314","routed_order":"60"},{"routed_x":"23.64737","routed_y":"38.06279","routed_order":"61"},{"routed_x":"23.64808","routed_y":"38.06232","routed_order":"62"},{"routed_x":"23.64821","routed_y":"38.06229","routed_order":"63"},{"routed_x":"23.6488","routed_y":"38.06248","routed_order":"64"},{"routed_x":"23.65613","routed_y":"38.06046","routed_order":"65"},{"routed_x":"23.65718","routed_y":"38.06034","routed_order":"66"},{"routed_x":"23.65811","routed_y":"38.06047","routed_order":"67"},{"routed_x":"23.66001","routed_y":"38.06091","routed_order":"68"},{"routed_x":"23.66106","routed_y":"38.06082","routed_order":"69"},{"routed_x":"23.66204","routed_y":"38.06062","routed_order":"70"},{"routed_x":"23.66282","routed_y":"38.06069","routed_order":"71"},{"routed_x":"23.66363","routed_y":"38.06119","routed_order":"72"},{"routed_x":"23.66436","routed_y":"38.06177","routed_order":"73"},{"routed_x":"23.66512","routed_y":"38.06213","routed_order":"74"},{"routed_x":"23.66611","routed_y":"38.06241","routed_order":"75"},{"routed_x":"23.66742","routed_y":"38.06372","routed_order":"76"},{"routed_x":"23.66828","routed_y":"38.06438","routed_order":"77"},{"routed_x":"23.66863","routed_y":"38.06463","routed_order":"78"},{"routed_x":"23.67168","routed_y":"38.06647","routed_order":"79"},{"routed_x":"23.67514","routed_y":"38.06789","routed_order":"80"},{"routed_x":"23.67701","routed_y":"38.06833","routed_order":"81"},{"routed_x":"23.67838","routed_y":"38.0689","routed_order":"82"},{"routed_x":"23.68013","routed_y":"38.06931","routed_order":"83"},{"routed_x":"23.6826","routed_y":"38.07007","routed_order":"84"},{"routed_x":"23.68391","routed_y":"38.07042","routed_order":"85"},{"routed_x":"23.68589","routed_y":"38.07076","routed_order":"86"},{"routed_x":"23.68816","routed_y":"38.07107","routed_order":"87"},{"routed_x":"23.69208","routed_y":"38.07093","routed_order":"88"},{"routed_x":"23.69523","routed_y":"38.07102","routed_order":"89"},{"routed_x":"23.69588","routed_y":"38.07109","routed_order":"90"},{"routed_x":"23.70395","routed_y":"38.07008","routed_order":"91"},{"routed_x":"23.70494","routed_y":"38.07009","routed_order":"92"},{"routed_x":"23.70586","routed_y":"38.06993","routed_order":"93"},{"routed_x":"23.70698","routed_y":"38.07138","routed_order":"94"},{"routed_x":"23.70721","routed_y":"38.07212","routed_order":"95"},{"routed_x":"23.70743","routed_y":"38.07357","routed_order":"96"},{"routed_x":"23.70676","routed_y":"38.07411","routed_order":"97"},{"routed_x":"23.70672","routed_y":"38.07426","routed_order":"98"},{"routed_x":"23.70677","routed_y":"38.07447","routed_order":"99"},{"routed_x":"23.70964","routed_y":"38.07867","routed_order":"100"},{"routed_x":"23.71001","routed_y":"38.07938","routed_order":"101"},{"routed_x":"23.71005","routed_y":"38.07972","routed_order":"102"},{"routed_x":"23.71025","routed_y":"38.07969","routed_order":"103"},{"routed_x":"23.71908","routed_y":"38.08021","routed_order":"104"},{"routed_x":"23.71954","routed_y":"38.0803","routed_order":"105"},{"routed_x":"23.71957","routed_y":"38.08041","routed_order":"106"},{"routed_x":"23.71954","routed_y":"38.08088","routed_order":"107"},{"routed_x":"23.7197","routed_y":"38.08131","routed_order":"108"},{"routed_x":"23.72328","routed_y":"38.08096","routed_order":"109"},{"routed_x":"23.72403","routed_y":"38.08048","routed_order":"110"},{"routed_x":"23.72482","routed_y":"38.08089","routed_order":"111"},{"routed_x":"23.7253","routed_y":"38.08134","routed_order":"112"},{"routed_x":"23.7258","routed_y":"38.08219","routed_order":"113"},{"routed_x":"23.72603","routed_y":"38.08285","routed_order":"114"},{"routed_x":"23.72593","routed_y":"38.08361","routed_order":"115"},{"routed_x":"23.72588","routed_y":"38.08406","routed_order":"116"},{"routed_x":"23.72605","routed_y":"38.08411","routed_order":"117"},{"routed_x":"23.73264","routed_y":"38.08265","routed_order":"118"},{"routed_x":"23.7333","routed_y":"38.07928","routed_order":"119"},{"routed_x":"23.73323","routed_y":"38.07919","routed_order":"120"},{"routed_x":"23.7314","routed_y":"38.07886","routed_order":"121"},{"routed_x":"23.73116","routed_y":"38.07868","routed_order":"122"},{"routed_x":"23.73159","routed_y":"38.0784","routed_order":"123"}];
//     return testPoints.map(e=>[(parseFloat(e.routed_x)), parseFloat(e.routed_y)]);  
//   }
 
//   public getStations() {

//     const features = [
//       {
//         type: 'Station',
//         geometry: {
//           type: 'Point',
//           coordinates: [39.614697418314975, 20.83922896533445]
//         },
//         properties: {
//           name: 'Mapbox',
//           details: 'Washington, D.C.'
//         }
//       },
//     ];
    
//     return new StationCollection(features);
//   }

//   private getLngLat(coords: number[]): LngLatLike{
//     return <LngLatLike>coords;
//   }
// }