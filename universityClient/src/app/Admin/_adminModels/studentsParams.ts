export class StudentsParams {
  pageNumber = 1;
  pageSize = 12;
  facultyId: number;
  majorId: number;
  name: string;

  constructor(FacultyId?: number, MajorId?: number, Name?: string) {
    this.facultyId = FacultyId;
    this.majorId = MajorId;
    this.name = Name;
  }
}
