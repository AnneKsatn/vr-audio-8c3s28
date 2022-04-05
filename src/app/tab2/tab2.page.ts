import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public image;

  b64toBlob(b64Data) {

    const bstr = atob(b64Data);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const file: File = new File([u8arr], "file", { type: 'img/pmg' })
    console.log(file);
    return file
  }

  public async addPhotoToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    });

    let b64 = 'data:image/jpeg;base64,' + capturedPhoto.base64String;
    this.image = this.sanitizer.bypassSecurityTrustUrl(b64)

    let file = this.b64toBlob(capturedPhoto.base64String);

    this.saveImage(file)
  }

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }

  saveImage(audioBlob) {

    const formData = new FormData()
    formData.append('image', audioBlob)


    this.http.post('https://ab26-93-175-28-10.in.ngrok.io/image', formData).subscribe(
      (resp: any)=>{
        console.log(resp['image'])
        // this.ref.detectChanges();
    })
  }

    // try {
    //   await fetch('https://ab26-93-175-28-10.in.ngrok.io/image', {
    //     method: 'POST',
    //     body: formData
    //   })

    //   console.log('Saved')
    // } catch (e) {
    //   console.error(e)
    // }
  
}
