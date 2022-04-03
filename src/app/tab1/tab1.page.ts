import { Component } from '@angular/core';
declare const MediaRecorder: any;
declare const navigator: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public isRecording: boolean = false;
  private chunks: any = [];
  private mediaRecorder: any;

  constructor() {
    const onSuccess = stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = e => {
        const audio = new Audio();
        const blob = new Blob(this.chunks, { 'type': 'video/mp4' });
        this.chunks.length = 0;
        audio.src = window.URL.createObjectURL(blob);
        audio.load();
        audio.play();

        this.saveAudio(blob)
      };

      this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
    };

    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    navigator.getUserMedia({ video: true }, onSuccess, e => console.log(e));
  }

  public record() {
    this.isRecording = true;
    this.mediaRecorder.start();
  }

  public stop() {
    this.isRecording = false;
    this.mediaRecorder.stop();
  }

  async saveAudio(audioBlob) {

    const formData = new FormData()

    let audioName;

    formData.append('file', audioBlob, 'file')

    try {
      await fetch('http://localhost:5000/save', {
        method: 'POST',
        body: formData
      })

      console.log('Saved')
    } catch (e) {
      console.error(e)
    }
  }

}
