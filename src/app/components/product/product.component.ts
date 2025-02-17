import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, EditPopupComponent, ConfirmPopupModule, TruncateNamePipe, PricePipe],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  constructor(
    private confirmationService: ConfirmationService
  ) { }

  @ViewChild('deleteButton') deleteButton: any

  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct() {
    this.edit.emit(this.product)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProduct()
      },
      reject: () => {
      }
    });
  }

  deleteProduct() {
    this.delete.emit(this.product)
  }
  ngOnInit() {
  }
}
