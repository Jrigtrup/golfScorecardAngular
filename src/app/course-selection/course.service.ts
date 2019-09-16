import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GolfCourse } from '../interfaces/golf-course';
import { GolfCourses } from '../interfaces/golf-courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  getGolfCourses(): Observable<GolfCourse[]> {
    const url = "http://golf-courses-api.herokuapp.com/courses";
    return this.httpClient.get<GolfCourses>(url).pipe(
      map(data => data.courses)
    );
  }

  getGolfCourse(id): Observable<any> {
    const url = `http://golf-courses-api.herokuapp.com/courses/${id}`;
    return this.httpClient.get(url)
  }
}


// courseUrl = "http://golf-courses-api.herokuapp.com";

// getCourses(): Observable<Object> {
//   const courses = this.httpClient.get(this.courseUrl);
//   console.log(courses);
//   return courses;
// }