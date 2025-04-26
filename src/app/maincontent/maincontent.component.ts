import { Component, OnInit } from '@angular/core';
import * as ProductList from './../../../public/ProductList.json'
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'maincontent',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './maincontent.component.html',
  styleUrl: './maincontent.component.scss'
})
export class MaincontentComponent implements OnInit {
  ProductList: any = ProductList;
  uniqueCategories: any = [];
  selectedCategory: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  paginatedProducts: any[] = [];
  searchQuery: string = '';
  filteredProducts: any[] = [];
  showSuggestions: boolean = false;
  selectedPrice: number = 50;
  maxAvailablePrice: number = 0;
  minPrice: number = 50;
  maxPrice: number = 0;

  ngOnInit(): void {
    this.ProductList = this.ProductList.default;
    this.uniqueCategories = [...new Set(this.ProductList.map((product: any) => product.category))];
    this.maxAvailablePrice = Math.max(...this.ProductList.map((product: any) => product.price));
    this.maxPrice = this.maxAvailablePrice;
    this.filteredProducts = this.ProductList;
    this.updatePaginatedProducts();
  }

  onPriceChange(event: any) {
    this.selectedPrice = event.target.value;
    this.maxPrice = this.selectedPrice;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.ProductList.filter((product: any) => {
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      const matchesSearch = !this.searchQuery || 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesPrice = product.price <= this.maxPrice && product.price >= this.minPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });
    this.updatePaginatedProducts();
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchQuery = query;
    this.showSuggestions = query.length > 0;
    this.applyFilters();
  }

  selectProduct(product: any) {
    this.searchQuery = product.name;
    this.filteredProducts = [product];
    this.showSuggestions = false;
    this.updatePaginatedProducts();
  }

  onCategoryChange(event: any) {
    const selectedValue = event.value || '';
    this.selectedCategory = selectedValue;
    this.currentPage = 1;
    this.applyFilters();
  }

  clearSearch() {
    this.searchQuery = '';
    this.showSuggestions = false;
    this.applyFilters();
  }

  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }
}
