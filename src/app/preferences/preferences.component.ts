import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  timeOptions: number[] = [0, 60, 90, 120, 150];
  selectedTime: number = 0;

  imagesOptions: number[] = [20, 26, 32];
  selectedImages: number = 20;


  constructor(private router: Router, private _snackBar: MatSnackBar,
  ) {

  }

  ngOnInit(): void {
  }

  savePreferences() {
    localStorage.setItem("numImages", String(this.selectedImages));
    localStorage.setItem("timer", String(this.selectedTime));

    let message = 'Saved';
    let action = 'close'
    this._snackBar.open(message, action, {
      duration: 1000
    });

    this.router.navigate(['/play']);
  }
}
