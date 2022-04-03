import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer) { }

  async saveImage(audioBlob) {

    const formData = new FormData()
    formData.append('file', audioBlob)

    try {
      await fetch('http://localhost:5000/save_image', {
        method: 'POST',
        body: formData
      })

      console.log('Saved')
    } catch (e) {
      console.error(e)
    }
  }
}
