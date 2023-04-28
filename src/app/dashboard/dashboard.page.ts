import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform , LoadingController } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  type: any = 'qrcode';
  qrData: any = null;
  createdCode: any = 'default';
  elementType = NgxQrcodeElementTypes.CANVAS;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  scannedData: any = null;
  constructor(public auth:AuthService, 
    private socialSharing: SocialSharing, 
    private loadingController: LoadingController, 
    private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  // fun createQRCode creating a qr code
  createQRCode() {
    this.createdCode = this.qrData;
  }
 
  // share created qr code using fun shareQRCode
  shareQRCode(){
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();  
    this.showLoader();
    this.socialSharing.share('Authenticator App', "You can create, share and scan any QR Code.", imageData, "Thank You!").then((res) => {
      this.loadingController.dismiss();
      console.log(JSON.stringify(res));  
    }).catch((error) => {
      this.loadingController.dismiss();
      console.log(JSON.stringify(error));
    });
    this.loadingController.dismiss();
  }

  // scan qr code also added flash light and camera
  scanQRCode(){
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      alert(JSON.stringify(barcodeData));
      this.scannedData = barcodeData;
    }).catch(err => {
      alert(err)
    });
  }

  // /shwoing a simple loader
  async showLoader(){
    const loading = await this.loadingController.create({
      message : "Please wait..."
    });
    await loading.present();
  }

  logout(){
    this.auth.logout();
  }
}
