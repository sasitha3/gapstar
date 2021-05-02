import {getTestBed, TestBed} from '@angular/core/testing';

import {ImageService} from './image.service';
import {Image} from "../models/image";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ImageService', () => {
  let injector: TestBed;
  let service: ImageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [ImageService]
      });
    injector = getTestBed();
    service = injector.get(ImageService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getImages', () => {
    it('should return an Observable<Image[]>'), () => {
      const dummyImages: Image[] = [
        new Image(
          0,
          "jpeg",
          5616,
          3744,
          "0.jpeg",
          "Alejandro Escamilla",
          "https://unsplash.com/photos/yC-Yzbqy7PY",
          "https://unsplash.com/photos/yC-Yzbqy7PY"
        ),
        new Image(
          1,
          "jpeg",
          5616,
          3744,
          "1.jpeg",
          "Alejandro Escamilla",
          "https://unsplash.com/photos/LNRyGwIJr5c",
          "https://unsplash.com/photos/LNRyGwIJr5c"
        ),
      ];

      service.getImages().subscribe(images => {
        expect(images.length).toBe(2);
        expect(images).toEqual(dummyImages);
      });

      const req = httpMock.expectOne(service.IMAGE_URL);
      expect(req.request.method).toBe("GET");
      req.flush(dummyImages);
    };
  });
});
