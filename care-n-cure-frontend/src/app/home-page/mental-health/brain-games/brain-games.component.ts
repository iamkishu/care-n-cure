import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brain-games',
  templateUrl: './brain-games.component.html',
  styleUrls: ['./brain-games.component.scss']
})
export class BrainGamesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goToLink(url: string){
    console.log(url);
    window.open(url, "_blank");
  }

}
