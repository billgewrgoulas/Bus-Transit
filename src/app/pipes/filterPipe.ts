import { Pipe, PipeTransform } from "@angular/core";
import { IRoute } from "src/app/state/Entities/route.entity";
import { IStop } from "src/app/state/Entities/stop.entity";

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {

  public transform(data: any[], value: string) {

    if(!data){
      return [];
    }

    if(value === undefined || value === null){
      return data;
    }

    const upper: string = value.toUpperCase();
    return data.filter((piece: IRoute | IStop) => {
      if(!piece){
        return false;
      }else{
        return piece.desc.toUpperCase().includes(upper) || piece.code.includes(value);
      }
    }).slice(0, 20);
  }

}