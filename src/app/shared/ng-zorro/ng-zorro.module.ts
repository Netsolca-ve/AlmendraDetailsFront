import { NgModule } from '@angular/core';
import { NzIconModule, provideNzIcons } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import {
  ShoppingCartOutline,
  WhatsAppOutline,
} from '@ant-design/icons-angular/icons';  


const icons = [
  ShoppingCartOutline,
  WhatsAppOutline
];

const zorroModules = [
  NzTableModule,
  NzModalModule,
  NzMessageModule,
  NzIconModule,
  NzBadgeModule
]

@NgModule({
  declarations: [],
  imports: [...zorroModules],
  exports: [...zorroModules],
  providers: [provideNzIcons(icons)]
})
export class NgZorroModule { }
