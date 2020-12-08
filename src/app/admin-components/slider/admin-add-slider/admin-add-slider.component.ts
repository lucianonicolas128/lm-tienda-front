import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Slider } from 'src/app/models/slider';
import { Global } from 'src/app/services/global';
import { SliderService } from 'src/app/services/slider.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-admin-add-slider',
  templateUrl: './admin-add-slider.component.html',
  styleUrls: ['./admin-add-slider.component.css'],
  providers: [SliderService, UploadService]
})
export class AdminAddSliderComponent implements OnInit {
  public title: string;
  public slider: Slider;
  public status: string;
  public filesToUpload: Array<File>;
  public save_slider;
  public url: string;
  public imageUrl: string;

  constructor(
    private _sliderService: SliderService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.slider = new Slider('', '', '');
    this.url = Global.url;
  }

  ngOnInit(): void {
  }
  
  onSubmit(form) {
    // this.slider.image = this.imageUrl;
    //Save the data
    this._sliderService.saveSlider(this.slider).subscribe(
      response => {
        if (response.slider) {
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(Global.url + "image-upload-slider/" + response.slider._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                this.status = 'succes';
                console.log(result);
                this.save_slider = result.slider;
                // location.reload();
                form.reset();
              });
          } else {
            this.save_slider = response.slider;
            this.status = 'succes';
            form.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
