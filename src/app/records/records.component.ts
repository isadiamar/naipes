import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/services/api.service";
import {PersistenceService} from "../shared/services/persistence.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  displayedColumns: string[] = ['username', 'punctuation', 'cards', 'disposedTime', 'recordDate'];
  globalRecords: any = [];
  userRecords: any = [];
  isLogged: boolean = false;
  username: string = "";

  constructor(private api: ApiService, private persistence: PersistenceService, private _snackBar: MatSnackBar
  ) {
    this.isLogged = this.persistence.isLogged;
    this.username = this.persistence.getUsername();
    this.persistence.loggedChange.subscribe((value) => {
      this.isLogged = value;
    })
  }

  ngOnInit(): void {
    this.api.getRecords().then(res => {
      this.globalRecords = res;
    });

    if(this.isLogged){
      this.api.getUserRecords(this.username).then(value => {
        this.userRecords = value;
      })
    }
  }

  getDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
  }

  async deleteRecords() {
    let res = await this.api.deleteUserRecords();
    if (res) {
      this.userRecords = [];
      this._snackBar.open('Borrado', 'Close', {
        duration: 1000
      });
    }
  }
}
