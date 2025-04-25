import { Component, OnInit } from '@angular/core';
import * as ProductList from './../../../public/ProductList.json'
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'maincontent',
  imports: [NgFor, NgIf],
  templateUrl: './maincontent.component.html',
  styleUrl: './maincontent.component.scss'
})
export class MaincontentComponent implements OnInit {
  ProductList: any = ProductList
  uniqueCategories: any = []
  selectedCategory: string = '';
  ngOnInit(): void {
    this.ProductList = this.ProductList.default
    this.uniqueCategories = [...new Set(this.ProductList.map((product: any) => product.category))];
    console.log("Product List:", this.ProductList)
    console.log("uniqueCategories:", this.uniqueCategories)
  }

  onCategoryChange(event: any) {
    console.log("Selected Category:", event.value)
    this.selectedCategory = event.value;
  }

}
