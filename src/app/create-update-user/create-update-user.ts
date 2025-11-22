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
  filteredRoles: string[] = [];
  roles = ['admin', 'faculty', 'student'];  // all roles
  faculties: any[] = [];

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
      role: 'user',
      facultyId: '0'
    }

    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.userForm = new FormGroup({
      name: new FormControl(this.userData?.name || '', Validators.required),
      email: new FormControl(this.userData?.email || '', [Validators.required, Validators.email]),
      mobile: new FormControl(this.userData?.mobile || '', [Validators.required]),
      password: new FormControl(this.userData?.password || '', Validators.minLength(6)),
      isEnable: new FormControl(this.userData?.isEnable ?? true, Validators.required),
      role: new FormControl(this.userData?.role || 'student', Validators.required),
      facultyId: new FormControl(this.userData?.role === 'student' ? this.userData?.facultyId || '' : ''),
    });
    if (this.userId !== '0') {
      this.loadUser(this.userId);
    }
    this.filterRoles();


    // Subscribe to role changes
    this.userForm.get('role')?.valueChanges.subscribe(role => {
      if (role === 'student') {
        this.loadFaculties(); // fetch faculty list
      } else {
        this.faculties = []; // hide faculty dropdown
        this.userForm.get('facultyId')?.setValue('');
      }
    });

    // If default role is student, load faculties immediately
    if (this.userForm.get('role')?.value === 'student') {
      this.loadFaculties();
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
          mobile: user.mobile,
          facultyId: user.facultyid
        });
      },
      err => console.error('Error fetching user', err)
    );
  }

  loadFaculties() {
    this.service.getFaculties(this.role).subscribe({
      next: (res: any) => {
        this.faculties = res; // res should be array of {id, name}
        this.userForm.patchValue({
          facultyId: this.userForm.value.facultyId
        });
      },
      error: (err: any) => console.error(err)
    });
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
      role: formValue.role,
      facultyId: formValue.role === 'student' ? formValue.facultyId : null
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

  filterRoles() {
    if (this.role === 'admin') {
      this.filteredRoles = [...this.roles]; // admin sees all
    } else if (this.role === 'faculty') {
      this.filteredRoles = ['student']; // hide admin
    } else {
      this.filteredRoles = ['student']; // only student
    }
  }
}
