import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketModel } from '../../models/basket.model';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { BasketService } from '../../services/basket.service';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/common/shared/services/swal.service';
import { OrderService } from 'src/app/components/orders/services/order.service';

@Component({
  selector: 'app-baskets',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit {
baskets:BasketModel[]=[];
sum:number=0;

constructor(private _basket:BasketService,private toastr:ToastrService,private _swal:SwalService,private _order:OrderService){

}
  ngOnInit(): void {
    this.getAll();
  }
getAll(){
  this._basket.getAll(res=>{
    this.baskets=res;
    this.calculate();
  });
}

calculate(){
  this.sum=0;
  this.baskets.forEach(element=>{
    this.sum += (element.price * element.quantity);
  })
}
removeById(_id:string){
  this._swal.callSwal("Urunu sepetten silmek istiyor musunuz?","Urunu Sil","Sil",()=>{
    let model={_id:_id};
    this._basket.removeById(model,res=>{
      this.toastr.info(res.message);
      this.getAll();
  });

  })
}
createOrder(){
  this._swal.callSwal("Urunleri almak istiyor musunuz?","Urunleri Al","Odeme Yap",()=>{
      this._order.create(res=>{
        this.toastr.success(res.message);
        this.getAll();
      });
  });
}
}