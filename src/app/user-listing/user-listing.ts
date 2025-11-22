import { ChangeDetectorRef, Component } from '@angular/core';
import { Service } from '../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-listing',
  standalone: false,
  templateUrl: './user-listing.html',
  styleUrl: './user-listing.scss',
})
export class UserListing {

  users: any[] = [];
  page = 1;
  errorMessage = '';
  loading = false;
  role = '';

  constructor(private usersService: Service, private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.role = this.usersService.getCookie('Role');
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.errorMessage = '';

    this.usersService.getUsers(this.page, this.role).subscribe({
      next: (res) => {
        this.users = [...res.users];
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load users.';
        this.loading = false;
      }
    });
  }
  editUser(id: number) {
    this.router.navigate(['/create-update-user', id]);
  }
  createUser() {
    this.router.navigate(['/create-update-user', 0]);
  }
  nextPage() {
    this.page++;
    this.loadUsers();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }
}