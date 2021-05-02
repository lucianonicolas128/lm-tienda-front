import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { UploadService } from '../../../../services/upload.service';
import { Global } from '../../../../services/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  providers: [CategoryService, UploadService]
})
export class AddCategoryComponent implements OnInit {
  public category: Category;
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
  public imageUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _uploadService: UploadService,
  ) {
    this.category = new Category('', '', '');
    this.buildForm();
  }

  ngOnInit(): void { }

  onSubmit(form: any) {
    this.category = form.value;
    this.category.image = this.imageUrl;
    this.status = 'loading';
    this._categoryService.saveCategory(this.category).subscribe(
      response => {
        if (response.category) {
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(Global.url + "image-upload/" + response.category._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                this.status = 'succes';
                console.log(result);
                this.save_category = result.category;
                form.reset();
              });
          } else {
            this.save_category = response.category;
            this.status = 'succes';
            form.reset();
          }
        } else { this.status = 'failed'; }
      },
      error => { console.log(<any>error); }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  onFileSelected(event) {
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
