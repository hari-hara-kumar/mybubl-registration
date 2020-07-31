import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostDataService } from '../common/services/postdata.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  message = 'Mybubl';
  constructor(public activatedRoute: ActivatedRoute, public apiService: PostDataService) { }

  ngOnInit(): void {
    this.verifyUser();
  }
  verifyUser() {
    this.apiService.get('user/user-verify/' + this.activatedRoute.snapshot.queryParams['uid']).subscribe((res: any) => {
      this.message = res.message;
    });
  }
}
