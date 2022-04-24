import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Slider } from 'src/app/models/slider';
import { Global } from 'src/app/services/global';
import { SliderService } from 'src/app/services/slider.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [SliderService, UploadService]
})
export class SliderComponent implements OnInit {
  public slider: Slider;
  public sliders: Slider[];
  public url: string;

  constructor(
    private _sliderService: SliderService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
    ) { 
      this.url = Global.url;
    }

  ngOnInit(): void {
    this.getSliders();
  }

  getSliders(){
    this._sliderService.getSliders().subscribe(
      response => {
        if(response.sliders){
          this.sliders = response.sliders.reverse();
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  setClass(slider: Slider, i: number) {
    let classe: string = 'inactive';
    /* more complex choice logic to set class = 'active' */
    return classe;
}

}
