import { Component, OnInit} from '@angular/core';
import {ImageService} from '../services/image.service';
import {Subscription} from 'rxjs';
import {Image} from "../models/image";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  galleryImages: Image[];
  selectedImages: Image[];
  imageSubscription: Subscription;
  loadingImages: boolean;
  checked = false;
  indeterminate = false;
  constructor(public service: ImageService) { }

  ngOnInit() {
    this.loadingImages = true;
    this.getImages();
    this.getSelectedImages();
  }

  getImages(): void {
    this.imageSubscription = this.service
      .getImages()
      .subscribe(images => {
        this.galleryImages = images['entries'];
        this.loadingImages = false;
      });
  }

  getSelectedImages(){
    this.imageSubscription = this.service
    .getSelectedImages()
    .subscribe(images => {
      this.selectedImages = images;
      this.loadingImages = false;
    });
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  saveImage(image:Image){
    this.service.saveSelectedImages(image).subscribe(images => {
      window.location.reload();
    });
  }
}
