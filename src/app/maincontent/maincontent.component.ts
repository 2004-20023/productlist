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
  itemsPerPage: number = 8; // Changed to 8 items per page
  paginatedProducts: any[] = [];
  searchQuery: string = '';
  filteredProducts: any[] = [];
  showSuggestions: boolean = false;
  selectedPrice: number = 50;
  maxAvailablePrice: number = 0;
  minPrice: number = 50;
  maxPrice: number = 0;

  // Add method to get total pages
  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

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
      const matchesPrice = product.price <= this.maxPrice && product.price >= this.minPrice;

      // Improved search functionality
      const searchTerms = this.searchQuery.toLowerCase().split(' ').filter(term => term);
      const matchesSearch = !this.searchQuery || searchTerms.every(term => {
        return (
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          String(product.price).includes(term)
        );
      });

      return matchesCategory && matchesSearch && matchesPrice;
    });
    this.currentPage = 1; // Reset to first page when filtering
    this.updatePaginatedProducts();
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.showSuggestions = this.searchQuery.length > 0;
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

  // Update changePage method
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  buyProduct(product: any): void {
    // Implement your buy logic here
    console.log('Buying product:', product);
  }

  resetPriceRange(): void {
    // Reset to initial values
    this.selectedPrice = this.maxAvailablePrice;
    this.maxPrice = this.maxAvailablePrice;
    this.applyFilters();
  }
}
