import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.scss']
})
export class CourseSelectionComponent implements OnInit {

  courses: any[];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService
    .getGolfCourses()
    .subscribe(data => this.courses = data);
  }
}