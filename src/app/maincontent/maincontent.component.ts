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
product: any;
getFilteredProductCount() {
throw new Error('Method not implemented.');
}
  ProductList: any = ProductList
  uniqueCategories: any = []
  selectedCategory: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  paginatedProducts: any[] = [];

  ngOnInit(): void {
    this.ProductList = this.ProductList.default
    this.uniqueCategories = [...new Set(this.ProductList.map((product: any) => product.category))];
    this.updatePaginatedProducts();

    console.log("Product List:", this.ProductList)
    console.log("uniqueCategories:", this.uniqueCategories)
  }

  onCategoryChange(event: any) {
    const selectedValue = event.value || '';
    console.log("Selected Category:", event.value)
    this.selectedCategory = selectedValue;
    this.currentPage = 1;
    this.updatePaginatedProducts();

  }

  updatePaginatedProducts() {
    const filteredProducts = this.ProductList.filter(
      (product: any) =>
        product.category == this.selectedCategory || this.selectedCategory == ''
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }
}
