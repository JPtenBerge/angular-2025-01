import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo';

  name = 'Tijmen';

  connectors = [
    { name: 'USB Type C', reversable: true, type: 'rectangle', photoUrl: 'https://www.kabelshop.nl/image/Goobay_USB_C_naar_USB_C_kabel_%7C_0.5_meter_%7C_USB_3.2_100%25_koper_Power_Delivery_100_W_Zwart_49252_K010214083_m1_big.jpg' },
    { name: 'USB Type B', reversable: false, type: 'rectangle', photoUrl: 'https://www.kantoorspecialist.nl/autoimg/1128438/1024x1024/resize/showimage.jpg' },
    { name: 'USB Type A', reversable: false, type: 'rectangle', photoUrl: 'https://image.allekabels.nl/image/1513-0/usb-a-kabel-lengte-1.8-meter.jpg' },
    { name: 'PS/2', reversable: false, type: 'round', photoUrl: 'https://media.startech.com/cms/products/gallery_large/kyc1mf.main.jpg' },
  ]

  changeName() {
    setTimeout(() => {
      this.name += ' Youri na timeout';
    }, 2000);
  }
}
