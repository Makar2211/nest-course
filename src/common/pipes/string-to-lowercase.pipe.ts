import { type ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class StringToLowercase implements PipeTransform {
  transform(obj: any, metadata: ArgumentMetadata) {
    //obj = то, что приходит в теле запроса
    // console.log({
    //   obj
    // })
    if (typeof obj.title === 'string') {
      obj.title = obj.title.toLowerCase();
    }

    return obj
  }
}