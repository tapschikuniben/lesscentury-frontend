import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { NotifierService } from 'src/app/services/notifier.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  public category: Category;

  constructor(
    @Inject(MAT_DIALOG_DATA) public categorydatainfo: any,
    private categoryService: CategoryService,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<CategoryDetailComponent>,
  ) { }

  ngOnInit(): void {
    this.initializeCategory();
    this.getCategory();
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

  // get category by Id
  getCategory() {
    const categoryId = this.categorydatainfo.id
    if (categoryId) {
      this.categoryService.getCategoryById(categoryId).subscribe(returnedcategory => {
        this.category = returnedcategory;
      })
    }
  }

  // update category
  updateCategory(currentcategory: Category): void {
    {
      this.categoryService.updateCategory(currentcategory).subscribe(updatedcategory => {
        this.category = updatedcategory;
        if (updatedcategory) {
          this.notifier.Notification("success", "successfully updated.");
          this.getCategory();
        } else {
          this.notifier.Notification("warning", "failed to update.");
        }
      })
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  getCategoryNameErrorMessage() {
    return 'Enter category name';
  }

}
