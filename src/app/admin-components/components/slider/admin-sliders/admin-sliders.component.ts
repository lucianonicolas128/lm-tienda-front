import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Slider } from 'src/app/models/slider';
import { Global } from 'src/app/services/global';
import { SliderService } from 'src/app/services/slider.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-admin-sliders',
  templateUrl: './admin-sliders.component.html',
  styleUrls: ['./admin-sliders.component.css'],
  providers: [SliderService, UploadService]
})
export class AdminSlidersComponent implements OnInit {
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
          this.sliders = response.sliders;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }


  deleteSlider(id) {
    let message = confirm("Desea eliminar este slider?");
    if (message) {
      this._sliderService.deleteSlider(id).subscribe(
        response => {
          /* this.reloadComponent(); */
          this.ngOnInit();
        },
        error => {
          console.log(<any>error);
        }
      )
    } else {
      console.log('Producto no eliminado');
    }
  }

}
