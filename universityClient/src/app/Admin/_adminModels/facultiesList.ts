export class FaculiesList {
  facultyName: string;
  majorsCount: number;
  studentsCount: number;
  teachersCount: number;

  constructor(
    facultyName: string,
    majorsCount: number = 0,
    studentsCount: number = 0,
    teachersCount: number = 0
  ) {
    this.facultyName = facultyName;
    this.majorsCount = majorsCount;
    this.studentsCount = studentsCount;
    this.teachersCount = teachersCount;
  }
}
