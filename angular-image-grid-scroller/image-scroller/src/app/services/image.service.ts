import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Entries } from '../models/entries';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly IMAGE_URL = 'https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json';
  readonly IMAGE_SELECTED_URL = 'http://localhost:3100/api/images';
 
  constructor(private http: HttpClient) {
  }

  getImages() {
    return this.http.get<Entries>(this.IMAGE_URL);
  }

  getSelectedImages(){
    return this.http.get<Image[]>(this.IMAGE_SELECTED_URL);
  }

  saveSelectedImages(image:Image){
    return this.http.post<Image>(this.IMAGE_SELECTED_URL, image);
  }
}
