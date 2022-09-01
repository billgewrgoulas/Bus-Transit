// import { GeoJson, IGeoJson } from "../models/dataInterfaces";

// export class Geolocation{

//     constructor(){}

//     public static getCurrentPosition(options?: PositionOptions): Promise<IGeoJson>{
//         return new Promise((resolve, reject)=>{
//           navigator.geolocation.getCurrentPosition((position)=>{
//             const {latitude, longitude} = position.coords;
//             resolve(new GeoJson([longitude, latitude]));
//           }, (error)=>{
//             reject(error.message);
//           });
//         });
//       }  
// }