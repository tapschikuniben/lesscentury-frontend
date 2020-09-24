import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { NotifierService } from 'src/app/services/notifier.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public category: Category;
  public onCategoryCreation = new EventEmitter();
  public selected_sku_status: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<NewCategoryComponent>,
  ) { }

  ngOnInit(): void {
    // initialising categorys
    this.initializeCategory();
  }

  initializeCategory(): void {
    this.category = {
      _id: '',
      category_name: '',
      meta_tag_title: '',
      meta_tag_description: '',
      meta_tag_keyword: '',
      parent_category: '',
      status: 'active',
      sort_index: 0,
      created_by: '',
      modified_by: '',
      created_date: new Date(Date.now()),
      modified_date: new Date(Date.now()),
    }
  }

  addCategory(category: Category): void {
    this.categoryService.addCategory(category).subscribe(createdcategory => {
      if (createdcategory) {
        this.onCategoryCreation.emit(createdcategory);
        this.notifier.Notification("success", "category successfully saved.");
        this.initializeCategory();
      }
    })
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  getCategoryNameErrorMessage() {
    return 'Enter category name';
  }

}
