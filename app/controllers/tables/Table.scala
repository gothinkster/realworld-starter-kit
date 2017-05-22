package tables

//noinspection ScalaStyle
object Tables {

  /////////////////////////////////////////////////////
  // Courses
  /////////////////////////////////////////////////////
  case class Courses(id: Courses.Id, code: Courses.Code, name: Courses.Name, created: Courses.Created)

  object Courses {
    def create(id: java.util.UUID, code: String, name: String, created: java.util.Date): Courses = {
      Courses(Id(id), Code(code), Name(name), Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Code(value: String) extends AnyVal

    case class Name(value: String) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // CoursesInstructors
  /////////////////////////////////////////////////////
  case class CoursesInstructors(id: CoursesInstructors.Id,
                                courseId: Courses.Id,
                                instructorId: Employees.Id,
                                created: CoursesInstructors.Created)

  object CoursesInstructors {
    def create(id: java.util.UUID,
               courseId: java.util.UUID,
               instructorId: java.util.UUID,
               created: java.util.Date): CoursesInstructors = {
      CoursesInstructors(Id(id), Courses.Id(courseId), Employees.Id(instructorId), Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // CoursesSemesters
  /////////////////////////////////////////////////////
  case class CoursesSemesters(id: CoursesSemesters.Id,
                              courseId: Courses.Id,
                              semesterId: Semesters.Id,
                              created: CoursesSemesters.Created)

  object CoursesSemesters {
    def create(id: java.util.UUID,
               courseId: java.util.UUID,
               semesterId: java.util.UUID,
               created: java.util.Date): CoursesSemesters = {
      CoursesSemesters(Id(id), Courses.Id(courseId), Semesters.Id(semesterId), Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // CoursesStudents
  /////////////////////////////////////////////////////
  case class CoursesStudents(id: CoursesStudents.Id,
                             courseId: Option[CoursesStudents.CourseId],
                             studentId: Option[Students.Id],
                             created: CoursesStudents.Created)

  object CoursesStudents {
    def create(id: java.util.UUID,
               courseId: Option[java.util.UUID],
               studentId: Option[java.util.UUID],
               created: java.util.Date): CoursesStudents = {
      CoursesStudents(Id(id), courseId.map(CourseId.apply), studentId.map(Students.Id.apply), Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class CourseId(value: java.util.UUID) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // Departments
  /////////////////////////////////////////////////////
  case class Departments(id: Departments.Id,
                         facultyId: Option[Faculties.Id],
                         name: Departments.Name,
                         yearOfEstablishment: Departments.YearOfEstablishment,
                         address: Departments.Address,
                         created: Departments.Created)

  object Departments {
    def create(id: java.util.UUID,
               facultyId: Option[java.util.UUID],
               name: String,
               yearOfEstablishment: String,
               address: String,
               created: java.util.Date): Departments = {
      Departments(Id(id),
        facultyId.map(Faculties.Id.apply),
        Name(name),
        YearOfEstablishment(yearOfEstablishment),
        Address(address),
        Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Name(value: String) extends AnyVal

    case class YearOfEstablishment(value: String) extends AnyVal

    case class Address(value: String) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // Employees
  /////////////////////////////////////////////////////
  case class Employees(id: Employees.Id,
                       userId: Option[Users.Id],
                       departmentId: Option[Departments.Id],
                       employeeSince: Option[Employees.EmployeeSince],
                       created: Employees.Created)

  object Employees {
    def create(id: java.util.UUID,
               userId: Option[java.util.UUID],
               departmentId: Option[java.util.UUID],
               employeeSince: Option[java.util.Date],
               created: java.util.Date): Employees = {
      Employees(Id(id),
        userId.map(Users.Id.apply),
        departmentId.map(Departments.Id.apply),
        employeeSince.map(EmployeeSince.apply),
        Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class EmployeeSince(value: java.util.Date) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // EmployeesDesignations
  /////////////////////////////////////////////////////
  case class EmployeesDesignations(id: EmployeesDesignations.Id,
                                   name: EmployeesDesignations.Name,
                                   created: EmployeesDesignations.Created)

  object EmployeesDesignations {
    def create(id: java.util.UUID, name: String, created: java.util.Date): EmployeesDesignations = {
      EmployeesDesignations(Id(id), Name(name), Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Name(value: String) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // EmployeesGrades
  /////////////////////////////////////////////////////
  case class EmployeesGrades(id: EmployeesGrades.Id,
                             name: EmployeesGrades.Name,
                             payBandMin: Option[EmployeesGrades.PayBandMin],
                             payBandMax: Option[EmployeesGrades.PayBandMax],
                             created: EmployeesGrades.Created)

  object EmployeesGrades {
    def create(id: java.util.UUID,
               name: String,
               payBandMin: Option[Int],
               payBandMax: Option[Int],
               created: java.util.Date): EmployeesGrades = {
      EmployeesGrades(Id(id),
        Name(name),
        payBandMin.map(PayBandMin.apply),
        payBandMax.map(PayBandMax.apply),
        Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Name(value: String) extends AnyVal

    case class PayBandMin(value: Int) extends AnyVal

    case class PayBandMax(value: Int) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // EmployeesSalaries
  /////////////////////////////////////////////////////
  case class EmployeesSalaries(id: EmployeesSalaries.Id,
                               employeeId: Option[Employees.Id],
                               employeeGradeId: Option[EmployeesGrades.Id],
                               employeeDesignationId: Option[EmployeesDesignations.Id],
                               appraisalDueOn: Option[EmployeesSalaries.AppraisalDueOn],
                               created: EmployeesSalaries.Created)

  object EmployeesSalaries {
    def create(id: java.util.UUID,
               employeeId: Option[java.util.UUID],
               employeeGradeId: Option[java.util.UUID],
               employeeDesignationId: Option[java.util.UUID],
               appraisalDueOn: Option[java.util.Date],
               created: java.util.Date): EmployeesSalaries = {
      EmployeesSalaries(Id(id),
        employeeId.map(Employees.Id.apply),
        employeeGradeId.map(EmployeesGrades.Id.apply),
        employeeDesignationId.map(EmployeesDesignations.Id.apply),
        appraisalDueOn.map(AppraisalDueOn.apply),
        Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class AppraisalDueOn(value: java.util.Date) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // Faculties
  /////////////////////////////////////////////////////
  case class Faculties(id: Faculties.Id,
                       universityId: Option[Universities.Id],
                       code: Faculties.Code,
                       name: Faculties.Name,
                       addressOfFaculty: Faculties.AddressOfFaculty,
                       yearOfEstablishment: Faculties.YearOfEstablishment,
                       created: Faculties.Created)

  object Faculties {
    def create(id: java.util.UUID,
               universityId: Option[java.util.UUID],
               code: String,
               name: String,
               addressOfFaculty: String,
               yearOfEstablishment: String,
               created: java.util.Date): Faculties = {
      Faculties(Id(id),
        universityId.map(Universities.Id.apply),
        Code(code),
        Name(name),
        AddressOfFaculty(addressOfFaculty),
        YearOfEstablishment(yearOfEstablishment),
        Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Code(value: String) extends AnyVal

    case class Name(value: String) extends AnyVal

    case class AddressOfFaculty(value: String) extends AnyVal

    case class YearOfEstablishment(value: String) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // PasswordInfo
  /////////////////////////////////////////////////////
  case class PasswordInfo(userId: Option[Users.Id],
                          provider: PasswordInfo.Provider,
                          key: PasswordInfo.Key,
                          hasher: PasswordInfo.Hasher,
                          password: PasswordInfo.Password,
                          salt: Option[PasswordInfo.Salt],
                          created: PasswordInfo.Created)

  object PasswordInfo {
    def create(userId: Option[java.util.UUID],
               provider: String,
               key: String,
               hasher: String,
               password: String,
               salt: Option[String],
               created: java.util.Date): PasswordInfo = {
      PasswordInfo(userId.map(Users.Id.apply),
        Provider(provider),
        Key(key),
        Hasher(hasher),
        Password(password),
        salt.map(Salt.apply),
        Created(created))
    }

    case class Provider(value: String) extends AnyVal

    case class Key(value: String) extends AnyVal

    case class Hasher(value: String) extends AnyVal

    case class Password(value: String) extends AnyVal

    case class Salt(value: String) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // Roles
  /////////////////////////////////////////////////////
  case class Roles(id: Roles.Id, description: Roles.Description, created: Roles.Created)

  object Roles {
    def create(id: java.util.UUID, description: String, created: java.util.Date): Roles = {
      Roles(Id(id), Description(description), Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Description(value: String) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // Semesters
  /////////////////////////////////////////////////////
  case class Semesters(id: Semesters.Id,
                       session: Semesters.Session,
                       semesterType: Semesters.SemesterType,
                       created: Semesters.Created)

  object Semesters {
    def create(id: java.util.UUID, session: String, semesterType: String, created: java.util.Date): Semesters = {
      Semesters(Id(id), Session(session), SemesterType(semesterType), Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Session(value: String) extends AnyVal

    case class SemesterType(value: String) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // StudentAdmission
  /////////////////////////////////////////////////////
  case class StudentAdmission(id: StudentAdmission.Id,
                              departmentId: Option[Departments.Id],
                              studentId: Option[Students.Id],
                              created: StudentAdmission.Created)

  object StudentAdmission {
    def create(id: java.util.UUID,
               departmentId: Option[java.util.UUID],
               studentId: Option[java.util.UUID],
               created: java.util.Date): StudentAdmission = {
      StudentAdmission(Id(id),
        departmentId.map(Departments.Id.apply),
        studentId.map(Students.Id.apply),
        Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // Students
  /////////////////////////////////////////////////////
  case class Students(id: Students.Id, userId: Option[Users.Id], created: Students.Created)

  object Students {
    def create(id: java.util.UUID, userId: Option[java.util.UUID], created: java.util.Date): Students = {
      Students(Id(id), userId.map(Users.Id.apply), Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // StudentsCoursesResults
  /////////////////////////////////////////////////////
  case class StudentsCoursesResults(id: StudentsCoursesResults.Id,
                                    studentId: Students.Id,
                                    courseSemesterId: CoursesSemesters.Id,
                                    grade: StudentsCoursesResults.Grade,
                                    maximumMarks: StudentsCoursesResults.MaximumMarks,
                                    marksObtained: StudentsCoursesResults.MarksObtained,
                                    created: StudentsCoursesResults.Created)

  object StudentsCoursesResults {
    def create(id: java.util.UUID,
               studentId: java.util.UUID,
               courseSemesterId: java.util.UUID,
               grade: String,
               maximumMarks: String,
               marksObtained: String,
               created: java.util.Date): StudentsCoursesResults = {
      StudentsCoursesResults(Id(id),
        Students.Id(studentId),
        CoursesSemesters.Id(courseSemesterId),
        Grade(grade),
        MaximumMarks(maximumMarks),
        MarksObtained(marksObtained),
        Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Grade(value: String) extends AnyVal

    case class MaximumMarks(value: String) extends AnyVal

    case class MarksObtained(value: String) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // Universities
  /////////////////////////////////////////////////////
  case class Universities(id: Universities.Id,
                          code: Universities.Code,
                          name: Universities.Name,
                          yearOfEstablishment: Universities.YearOfEstablishment,
                          state: Universities.State,
                          address: Universities.Address,
                          created: Universities.Created)

  object Universities {
    def create(id: java.util.UUID,
               code: String,
               name: String,
               yearOfEstablishment: String,
               state: String,
               address: String,
               created: java.util.Date): Universities = {
      Universities(Id(id),
        Code(code),
        Name(name),
        YearOfEstablishment(yearOfEstablishment),
        State(state),
        Address(address),
        Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Code(value: String) extends AnyVal

    case class Name(value: String) extends AnyVal

    case class YearOfEstablishment(value: String) extends AnyVal

    case class State(value: String) extends AnyVal

    case class Address(value: String) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // UniversityAllocatedLeaves
  /////////////////////////////////////////////////////
  case class UniversityAllocatedLeaves(id: UniversityAllocatedLeaves.Id,
                                       year: UniversityAllocatedLeaves.Year,
                                       universityId: Option[Universities.Id],
                                       numberOfLeaves: UniversityAllocatedLeaves.NumberOfLeaves,
                                       created: UniversityAllocatedLeaves.Created)

  object UniversityAllocatedLeaves {
    def create(id: java.util.UUID,
               year: String,
               universityId: Option[java.util.UUID],
               numberOfLeaves: Int,
               created: java.util.Date): UniversityAllocatedLeaves = {
      UniversityAllocatedLeaves(Id(id),
        Year(year),
        universityId.map(Universities.Id.apply),
        NumberOfLeaves(numberOfLeaves),
        Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Year(value: String) extends AnyVal

    case class NumberOfLeaves(value: Int) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // UserProfile
  /////////////////////////////////////////////////////
  case class UserProfile(userId: Users.Id,
                         address: Option[UserProfile.Address],
                         phoneNumber: Option[UserProfile.PhoneNumber],
                         firstName: Option[UserProfile.FirstName],
                         lastName: Option[UserProfile.LastName],
                         imgUrl: Option[UserProfile.ImgUrl],
                         nationality: Option[UserProfile.Nationality],
                         fatherName: Option[UserProfile.FatherName],
                         motherName: Option[UserProfile.MotherName],
                         created: UserProfile.Created)

  object UserProfile {
    def create(userId: java.util.UUID,
               address: Option[String],
               phoneNumber: Option[String],
               firstName: Option[String],
               lastName: Option[String],
               imgUrl: Option[String],
               nationality: Option[String],
               fatherName: Option[String],
               motherName: Option[String],
               created: java.util.Date): UserProfile = {
      UserProfile(Users.Id(userId),
        address.map(Address.apply),
        phoneNumber.map(PhoneNumber.apply),
        firstName.map(FirstName.apply),
        lastName.map(LastName.apply),
        imgUrl.map(ImgUrl.apply),
        nationality.map(Nationality.apply),
        fatherName.map(FatherName.apply),
        motherName.map(MotherName.apply),
        Created(created))
    }

    case class Address(value: String) extends AnyVal

    case class PhoneNumber(value: String) extends AnyVal

    case class FirstName(value: String) extends AnyVal

    case class LastName(value: String) extends AnyVal

    case class ImgUrl(value: String) extends AnyVal

    case class Nationality(value: String) extends AnyVal

    case class FatherName(value: String) extends AnyVal

    case class MotherName(value: String) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

  /////////////////////////////////////////////////////
  // Users
  /////////////////////////////////////////////////////
  case class Users(id: Users.Id, roleId: Option[Roles.Id], created: Users.Created)

  object Users {
    def create(id: java.util.UUID, roleId: Option[java.util.UUID], created: java.util.Date): Users = {
      Users(Id(id), roleId.map(Roles.Id.apply), Created(created))
    }

    case class Id(value: java.util.UUID) extends AnyVal

    case class Created(value: java.util.Date) extends AnyVal

  }

}