/*CREATE ROLE omis;*/

--CREATE DATABASE omis;


create table if not exists universities(
    id uuid,
    code varchar(4) not null unique,
    name varchar(128) not null unique,
    year_of_establishment varchar(4) not null,
    state varchar(20) not null,
    address varchar(128) not null,
    created timestamp not null,
    primary key (id)
);

create unique index code_idx on universities(code);

create table if not exists faculties(
    id uuid,
    university_id uuid,
    code varchar(4) not null unique ,
    name varchar(128) not null,
    address_of_faculty varchar (128) not null,
    year_of_establishment varchar (4) not null,
    created timestamp not null,
    primary key (id)
);

alter table faculties add constraint faculty_university_fk FOREIGN KEY (university_id) references universities(id)
    on delete cascade on update cascade;

create table if not exists departments(
    id uuid,
    faculty_id uuid,
    name varchar(128) not null,
    year_of_establishment varchar (4) not null,
    address varchar (128) not null,
    created timestamp not null,
    primary key (id)
);

alter table departments add constraint department_faculty_fk FOREIGN KEY (faculty_id) references faculties(id)
    on delete cascade on update cascade;

create table if not exists users(
    id uuid,
    role_id uuid,
    created TIMESTAMP not null
);

alter table users add constraint user_id primary key(id);

create table if not exists roles (
    id uuid,
    description varchar(2048) not null,
    created timestamp not null
);
alter table roles add constraint role_id primary key(id);

alter table users add constraint user_role_fk
    foreign key(role_id) references roles(id) on delete cascade on update cascade;


create table if not exists password_info (
    user_id uuid,
    provider varchar(64) not null,
    key varchar(2048) not null,
    hasher varchar(64) not null,
    password varchar(256) not null,
    salt varchar(256),
    created timestamp not null,
    primary key (provider, key)
);


alter table password_info add constraint password_info_user_fk FOREIGN KEY (user_id) references users(id)
    on delete cascade on update cascade;

create table if not exists user_profile(
    user_id uuid,
    address varchar (256),
    phone_number varchar (12),
    first_name varchar (64),
    last_name varchar (64),
    img_url varchar (128),
    nationality varchar (4),
    father_name varchar (64),
    mother_name varchar (64),
    created timestamp not null,
    primary key(user_id)
);

alter table user_profile add constraint user_profile_user_fk FOREIGN KEY (user_id) references users(id)
    on delete cascade on update cascade;

create sequence  if not exists employee_seq;

create table if not exists employees(
    id uuid,
    serial_number char(4) not null default to_char(nextval('employee_seq'), '0000FM'),
    user_id uuid,
    department_id uuid,
    employee_since timestamp,
    created timestamp not null,
    primary key(id)
);

alter sequence employee_seq owned by employees.serial_number;

alter table employees add constraint employee_user_fk FOREIGN KEY (user_id) references users(id)
    on delete cascade on update cascade;


alter table employees add constraint employee_department_fk FOREIGN KEY (department_id) references departments(id)
    on delete cascade on update cascade;

create table if not exists employees_salaries(
    id uuid,
    employee_id uuid,
    employee_grade_id uuid,
    employee_designation_id uuid,
    appraisal_due_on timestamp,
    created timestamp not null,
    primary key (id)
);

create table if not exists employees_grades(
    id uuid,
    name varchar(1) not null,
    pay_band_min int ,
    pay_band_max int,
    created timestamp not null,
    primary key (id)
);

create table if not exists employees_designations(
    id uuid,
    name varchar(12) not null,
    created timestamp not null,
    primary key (id)
);

alter table employees_salaries add constraint employees_salary_employee_fk FOREIGN KEY (employee_id) references employees(id)
    on delete cascade on update cascade;

alter table employees_salaries add constraint employees_salary_grade_fk FOREIGN KEY (employee_grade_id) references employees_grades(id)
    on delete cascade on update cascade;

create table if not exists employees_leaves(
    id uuid,
    employee_id uuid,
    leave_type varchar(12) not null,
    from date not null,
    to date not null,
    created timestamp not null,
    primary key (id)
);

alter table employees_leaves add constraint employee_leaves_employee_id FOREIGN KEY (employee_id) references employees(id)
    on delete cascade on update cascade;

create table if not exists university_allocated_leaves(
    id uuid,
    year varchar (4) not null,
    university_id uuid,
    number_of_leaves int not null,
    created timestamp not null,
    primary key (id)
);

alter table university_allocated_leaves add constraint allocated_leaves_university_fk FOREIGN KEY (university_id) references universities(id)
    on delete cascade on update cascade;

/*Student management */
create sequence  if not exists enrollment_number_seq;

create table if not exists students(
    id uuid,
    user_id uuid,
    enrollment_serial char(6) not null default to_char(nextval('enrollment_number_seq'), '00000FM'),
    date_of_enrollment date not null,
    created timestamp not null,
    primary key (id)
);

alter sequence enrollment_number_seq owned by students.enrollment_serial;

alter table students add constraint student_user_fk FOREIGN KEY (user_id) references users(id)
    on delete cascade on update cascade;

create sequence  if not exists faculty_number_seq;

create table if not exists student_admission(
    id uuid,
    faculty_serial char(3) not null default to_char(nextval('faculty_number_seq'), '000FM'),
    department_id uuid,
    student_id uuid,
    date_of_admission date not null,
    date_of_leaving date not null,
    created timestamp not null,
    primary key (id)
);

alter sequence faculty_number_seq owned by student_admission.faculty_serial;

alter table student_admission add constraint student_admission_department_fk FOREIGN KEY (department_id) references departments(id)
    on delete cascade on update cascade;

alter table student_admission add constraint student_admission_student_fk FOREIGN KEY (student_id) references students(id)
    on delete cascade on update cascade;


create table if not exists semesters(
    id uuid,
    session varchar(20) not null,
    type varchar (12) not null,
    created timestamp not null,
    primary key (id)
);

create table if not exists courses(
    id uuid,
    code varchar(4) not null,
    name varchar(20) not null,
    created timestamp not null,
    primary key (id)
);

create table if not exists courses_semesters(
    id uuid,
    course_id uuid not null,
    semester_id uuid not null,
    created timestamp not null,
    primary key (id)
);

alter table courses_semesters add constraint courses_semesters_course_fk FOREIGN KEY (course_id) references courses(id)
    on delete cascade on update cascade;

alter table courses_semesters add constraint courses_semesters_semester_fk FOREIGN KEY (semester_id) references semesters(id)
    on delete cascade on update cascade;

create table if not exists courses_instructors(
    id uuid,
    course_id uuid not null,
    instructor_id uuid not null,
    created timestamp not null,
    primary key (id)
);


alter table courses_instructors add constraint courses_instructor_instructor_fk FOREIGN KEY (instructor_id) references employees(id)
    on delete cascade on update cascade;

alter table courses_instructors add constraint courses_instructor_course_fk FOREIGN KEY (course_id) references courses(id)
    on delete cascade on update cascade;

create table if not exists courses_students(
    id uuid,
    course_id uuid,
    student_id uuid,
    created timestamp not null,
    primary key (id)
);

alter table courses_semesters add constraint courses_students_courses_fk FOREIGN KEY (course_id) references courses(id)
    on delete cascade on update cascade;

alter table courses_students add constraint courses_students_student_fk FOREIGN KEY (student_id) references students(id)
    on delete cascade on update cascade;

create table if not exists students_courses_results(
    id uuid,
    student_id uuid not null,
    course_semester_id uuid not null,
    grade varchar (1) not null,
    maximum_marks varchar (3) not null,
    marks_obtained varchar (3) not null,
    created timestamp not null,
    primary key (id)
);

alter table students_courses_results add constraint students_courses_results_student_fk FOREIGN KEY (student_id) references students(id)
    on delete cascade on update cascade;

alter table students_courses_results add constraint students_courses_results_courses_fk FOREIGN KEY (course_semester_id) references courses_semesters(id)
    on delete cascade on update cascade;