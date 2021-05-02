import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from '../../../../services/global';

export interface DialogData {
  _id: string;
}
@Component({
  selector: 'app-edit-category',
  templateUrl: '../add-category/add-category.component.html',
  styleUrls: ['./edit-category.component.css'],
  providers: [CategoryService, UploadService]
})
export class EditCategoryComponent implements OnInit {
  public category!: Category;
  public status!: string;
  public filesToUpload!: Array<File>;
  public save_category!: any;
  public file!: any;
  public selectedFile = null;
  categoryForm!: FormGroup;

  public CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/lucianonicolas/upload";
  public CLOUDINARY_UPLOAD_PRESET = "ry8eoxub";
  public imageUploader = (<HTMLInputElement>document.getElementById('img-uploader-category'));
  public imagePreview = (<HTMLInputElement>document.getElementById('img-preview-category'));
  public imageUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.getCategory(this.data._id);
    });
  }

  onSubmit(form: any) {
    this.category = form.value;
    this.category.image = this.imageUrl;
    this.status = 'loading';

    this._categoryService.updateCategory(this.category).subscribe(
      response => {
        if (response.category) {
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(Global.url + "image-upload/" + response.category._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                this.status = 'succes';
                console.log(result);
                this.save_category = result.category;
              });
          } else {
            this.save_category = response.category;
            this.status = 'succes';
          }
        } else { this.status = 'failed'; }
      },
      error => { console.log(<any>error); }
    );

  }

  getCategory(id: any) {
    this._categoryService.getCategory(id).subscribe(
      response => {
        this.category = response.category;
        this.categoryForm.patchValue(response.category)
      }
    )
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(event);
  }

  private buildForm() {
    this.categoryForm = this.formBuilder.group({
      _id: [''],
      image: [],
      name: ['', Validators.required],
    });
  }


}
