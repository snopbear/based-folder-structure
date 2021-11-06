import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  pageTitle = 'Acme Product Management';

  isMessageDisplayed = true;
  get isLoggedIn(): boolean {
    // return this.authService.isLoggedIn;
    return true;
  }

  // get isMessageDisplayed(): boolean {
  //   // return this.messageService.isDisplayed;
  //   return true;
  // }

  get userName(): string {
    // if (this.authService.currentUser) {
    //   return this.authService.currentUser.userName;
    // }
    return 'assaf';
  }

  constructor(
    // private authService: AuthService,
    private router: Router // private messageService: MessageService
  ) {}

  ngOnInit() {}

  displayMessages(): void {
    // Example of primary and secondary routing together
    // this.router.navigate(['/login', {outlets: { popup: ['messages']}}]); // Does not work
    // this.router.navigate([{outlets: { primary: ['login'], popup: ['messages']}}]); // Works
    this.router.navigate([{ outlets: { popup: ['messages'] } }]); // Works
    // this.messageService.isDisplayed = true;
    this.isMessageDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    // this.messageService.isDisplayed = false;
    this.isMessageDisplayed = false;
  }

  logOut(): void {
    // this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
}
