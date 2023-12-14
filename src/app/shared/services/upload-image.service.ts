import { Injectable } from '@angular/core';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  storage: FirebaseTSStorage = new FirebaseTSStorage();

  uploadImage(imageFile: any,path:string) {
    let imageUrl = '';
    this.storage.upload({
      uploadName: imageFile.name,
      path: [path,imageFile.name,"image"],
      data: { data: imageFile },
      onComplete: (downloadUrl) => {
        imageUrl = downloadUrl;
        console.log(downloadUrl);
        return downloadUrl;
      },
    });
     
  }
}
