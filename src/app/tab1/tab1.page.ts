import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef } from '@angular/core';
declare const MediaRecorder: any;
declare const navigator: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  text = "";

  public isRecording: boolean = false;
  private chunks: any = [];
  private mediaRecorder: any;

  constructor(public http: HttpClient, private ref: ChangeDetectorRef) {
    const onSuccess = stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = e => {
        const audio = new Audio();
        const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
        this.chunks.length = 0;
        audio.src = window.URL.createObjectURL(blob);
        audio.load();
        audio.play();

        this.saveAudio(blob);
        // console.log(fetchEmployees)
      };

      this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
    };

    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    navigator.getUserMedia({ audio: true }, onSuccess, e => console.log(e));
  }

  public record() {
    this.isRecording = true;
    this.mediaRecorder.start();
  }

  public stop() {
    this.isRecording = false;
    this.mediaRecorder.stop();
  }

  saveAudio(audioBlob) {

    const formData = new FormData()

    let audioName;

    formData.append('audio', audioBlob, 'audio')

    this.http.post('https://ab26-93-175-28-10.in.ngrok.io/speech', formData).subscribe(
      (resp: any)=>{
        this.text = resp['text']
        console.log(resp['text'])
        this.ref.detectChanges();
      }
    )


    // try {
    //   await fetch('https://ab26-93-175-28-10.in.ngrok.io', {
    //     method: 'POST',
    //     body: formData
    //   })
    //   // const { data } = await response.json()
    //   console.log('Saved')
    //   return "data"
    // } catch (e) {
    //   console.error(e)
    // }
  }

}
