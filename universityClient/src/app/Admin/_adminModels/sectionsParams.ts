export class SectionsParams {
  pageNumber = 1;
  pageSize = 12;
  CourseId: number;
  MajorId: number;
  FacultyId: number;
  TeacherId: number;

  constructor(
    CourseId?: number,
    MajorId?: number,
    FacultyId?: number,
    TeacherId?: number
  ) {
    this.FacultyId = FacultyId;
    this.MajorId = MajorId;
    this.CourseId = CourseId;
    this.TeacherId = TeacherId;
  }
}
