import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Service } from '../service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-update-user',
  standalone: false,
  templateUrl: './create-update-user.html',
  styleUrl: './create-update-user.scss',
})
export class CreateUpdateUser implements OnInit {
  userForm!: FormGroup;
  userData: any;
  userId!: string;
  role = '';
  submitted = false;
  constructor(private service: Service, private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit() {
    this.role = this.service.getCookie('Role');
    this.userData = {
      id: 0,
      name: '',
      email: '',
      password: '',
      mobile: '',
      isEnable: false,
      role: 'user'
    }

    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.userForm = new FormGroup({
      name: new FormControl(this.userData?.name || '', Validators.required),
      email: new FormControl(this.userData?.email || '', [Validators.required, Validators.email]),
      mobile: new FormControl(this.userData?.mobile || '', [Validators.required]),
      password: new FormControl(this.userData?.password || '', Validators.minLength(6)),
      isEnable: new FormControl(this.userData?.isEnable ?? true, Validators.required),
      role: new FormControl(this.userData?.role || 'user', Validators.required)
    });
    if (this.userId !== '0') {
      this.loadUser(this.userId);
    }
  }

  loadUser(id: string) {
    this.service.getUserById(id, this.role).subscribe(
      (res: any) => {
        const user = res.user; // access the user object from response

        this.userForm.patchValue({
          name: user.name,
          email: user.email,
          password: '',
          isEnable: user.approved,
          role: user.role,
          mobile: user.mobile
        });
      },
      err => console.error('Error fetching user', err)
    );
  }


  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;
    const user: any = {
      name: formValue.name,
      email: formValue.email,
      mobile: formValue.mobile,
      password: formValue.password || '', 
      approved: formValue.isEnable,           
      role: formValue.role                     
    };

    if (this.userId !== '0') user.id = this.userId;

    this.service.saveUser(user, this.role).subscribe(
      (res: any) => {
        const createdUserId = res.user.id;

        if (this.userId !== '0') {
          alert('User updated!');
        } else {
          alert('User created!');
          this.router.navigate(['/create-update-user', createdUserId]);
        }
      },
      (err) => console.error('Error saving user', err)
    );
  }
}
