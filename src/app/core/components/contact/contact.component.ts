import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ContactService } from '../../../shared/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  save(message) {
    console.log(message);
    this.contactService.createContact(message);
    this.flashMessage.show('We have recieved your query. Very soon response will be send through email!',
      { cssClass: 'alert-success', timeout: 5000 });
  }

}
