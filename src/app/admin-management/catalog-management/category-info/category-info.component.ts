import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/services/notifier.service';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})
export class CategoryInfoComponent implements OnInit {

  public category: Category;
  public categoryDialogRef: MatDialogRef<NewCategoryComponent>;
  public categoryDetailRef: MatDialogRef<CategoryDetailComponent>;
  public CategoryData: any = [];
  public dataSource: MatTableDataSource<Category>;
  @ViewChild('category_paginator', { static: true }) category_paginator: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent: PageEvent;
  public pageSize = 5;
  public displayedCategoryColumns: string[] = ['category_name', 'parent_category', 'status', 'view', 'action'];


  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getAllCategorys();
    this.initializePageSizeOptions();
  }

  //create new category
  openNewCategoryDialog() {
    this.categoryDialogRef = this.dialog.open(NewCategoryComponent, { width: '50%', maxHeight: '620px' });

    this.categoryDialogRef.updatePosition({
      top: '4%',
    });

    this.categoryDialogRef.afterClosed().subscribe(result => {
      this.getAllCategorys();
    });
  }

  //getting all categorys
  getAllCategorys(): void {
    // get main category
    this.categoryService.getAllCategorys().subscribe(data => {
      this.CategoryData = data;
      this.dataSource = new MatTableDataSource<Category>(this.CategoryData);
      setTimeout(() => {
        this.dataSource.paginator = this.category_paginator;
      }, 0);
    })
  }

  //confirm to delete category
  confirmDialog(myindex: number, e): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.deleteCategory(myindex, e);
        this.notifier.Notification("success", "successfully deleted.");
      } else {
        this.notifier.Notification("warning", "action aborted");
      }
    });
  }

  //deleting category
  deleteCategory(index: number, e) {
    const data = this.dataSource.data;
    console.log('page index', this.category_paginator.pageIndex)
    data.splice((this.category_paginator.pageIndex * this.category_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.categoryService.deleteCategory(e.id).subscribe()
  }

  //open category details
  openCategoryDetail(selected): void {
    const dialogRef = this.dialog.open(CategoryDetailComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCategorys();
    });
  }

  public applyCategoryFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  initializePageSizeOptions(): void {
    for (let i = 5; i <= 1000; i += 5) {
      this.pageSizeOptions.push(i);
    }
  }

}
