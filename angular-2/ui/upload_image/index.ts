/**
 * Created by ivan on 24.01.17.
 */
import { Component, Renderer, ViewChild, ElementRef, Input } from '@angular/core';
import { AuthService, BroadcastService } from '../../services';
import 'rxjs/Rx';
import {OPEN_INFO_POPUP, IMAGE_CANNOT_UPLOAD, IMAGE_TOO_LARGE, PROFILE_IS_UPDATE} from "../../config";

@Component({
  selector: 'upload-image',
  templateUrl: './upload_image.html'
})
export class UploadImage {
  @Input() photo;
  @Input() isAdd;
  @ViewChild('uploadPicture') uploadPicture:ElementRef;
  constructor(
    private authService: AuthService,
    private renderer: Renderer,
    private broadcastService: BroadcastService
  ) {
    
  }
  
  triggerToInput() {
    let event = new MouseEvent('click');
    this.renderer.invokeElementMethod(
      this.uploadPicture.nativeElement, 'dispatchEvent', [event]);
  }
  
  removePhoto() {
    let sendData = {
      'photo': null
    };
    this.changeEditProfile(sendData, 'formData');
    
  }
  
  changeEditProfile(sendData, type) {
    this.authService.
    changeProfile(sendData, type)
      .subscribe(
        response => {
          let configuration = {
            title: PROFILE_IS_UPDATE,
            description: ''
          };
          this.broadcastService.broadcast(OPEN_INFO_POPUP, configuration);
        }
      )
  }
  
  handleUpload($event): void {
    this.readThis($event.target);
  }
  readThis(inputValue: any) : void {
    const file:File = inputValue.files[0];
    const readerImage:FileReader = new FileReader();
    readerImage.onloadend = ((event) => {
      if (file.size > 10*1000000) {
        this.broadcastService.broadcast('error', IMAGE_TOO_LARGE);
        return false;
      }
      let sendData = {
        'photo': file
      };
      this.changeEditProfile(sendData, 'formData');
    });
    readerImage.readAsDataURL(file);
  }
}

