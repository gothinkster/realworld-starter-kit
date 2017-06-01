--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY courses (id, code, name, created) FROM stdin;
\.

--
-- Data for Name: courses_semesters; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY courses_semesters (id, course_id, semester_id, created) FROM stdin;
\.


--
-- Data for Name: courses_students; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY courses_students (id, course_id, student_id, created) FROM stdin;
\.


--
-- Data for Name: universities; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY universities (id, code, name, year_of_establishment, state, address, created) FROM stdin;
de2283f9-71d9-4182-bbdb-55e5b3c7a28b	AMU	Aligarh Muslim University	1919	Uttar Pradesh	Aligarh	2017-06-01 02:55:06.576
\.




--
-- Data for Name: faculties; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY faculties (id, university_id, code, name, address_of_faculty, year_of_establishment, created) FROM stdin;
2303f32f-b744-4c1d-a160-4c832fc4b7f6	de2283f9-71d9-4182-bbdb-55e5b3c7a28b	AMUFCS	Faculty Of Computer Application	Aligarh Muslim University	1995	2017-06-01 02:55:06.774
8c4f386c-5cf4-4e52-959b-273158a17445	de2283f9-71d9-4182-bbdb-55e5b3c7a28b	AMUFCS	Faculty Of Engineering	Aligarh Muslim University	1965	2017-06-01 05:57:46.934
\.



--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY departments (id, faculty_id, code, name, year_of_establishment, address, created) FROM stdin;
90110ff9-7a40-4096-8d18-8753a22a261e	2303f32f-b744-4c1d-a160-4c832fc4b7f6	DCS	Department Of Computer Application	1995	Aligarh Muslim University	2017-06-01 02:55:06.797
39bd5196-9282-41a9-967d-16d4fd087ac1	8c4f386c-5cf4-4e52-959b-273158a17445	FEE	Department Of Electronics Engineering	1965	Aligarh Muslim University	2017-06-01 05:57:47.268
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY users (id, role, created) FROM stdin;
e73015bd-c4e9-46a2-9a5d-e146cb649185	teacher	2017-06-01 02:55:06.823
36070226-d989-4eaa-9cc0-f1214b9342e5	admin	2017-06-01 05:57:47.297
b576daa7-576c-4d84-876e-c994e411c37d	teacher	2017-06-01 06:59:11.399
ee84b07d-2c04-4f6b-b6d3-a88ec5392e7f	teacher	2017-06-01 07:00:16.07
bb3e74f6-8da8-4295-8c95-f854fe22e64b	teacher	2017-06-01 07:01:01.081
fe016bbf-2bc2-4ba9-9a3b-a8235eee82b2	teacher	2017-06-01 07:07:14.361
02504232-8cee-4062-ab2d-c7c0585f3a51	teacher	2017-06-01 07:08:29.394
927bf315-cd66-443c-a52a-d23b6c7ba1a5	teacher	2017-06-01 08:06:44.654
a61cfd85-b8f7-480a-b133-669d52f26d10	teacher	2017-06-01 08:07:25.665
a6fce8fb-82d1-4139-8b29-88c8a696a711	teacher	2017-06-01 08:16:44.706
7c52b5e0-22f0-4d6a-b4e2-1160d57f6206	teacher	2017-06-01 08:18:09.945
b9a4af1e-4d4a-4c27-9746-9aa878c295b6	teacher	2017-06-01 09:01:24.547
a8af77c5-41a3-413f-9809-d217497850ec	admin	2017-06-01 09:02:06.079
3e638e0e-4662-4ecb-b082-925f439a6352	admin	2017-06-01 09:48:53.332
ba713c72-288f-48fe-93d0-75d6d5820688	teacher	2017-06-01 09:56:02.991
36b79cf0-0271-41d8-86a7-52c22cd8c46a	teacher	2017-06-01 10:00:41.662
\.








--
-- Data for Name: emp_details; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY emp_details (user_id, first_name, last_name, department, grade, salary, pay_scale, created, shortbio) FROM stdin;
ee84b07d-2c04-4f6b-b6d3-a88ec5392e7f	firstName	lastName	department	A	100000	100000-120000	created	shortbio
bb3e74f6-8da8-4295-8c95-f854fe22e64b	firstName	lastName	department	A	100000	100000-120000	created	shortbio
02504232-8cee-4062-ab2d-c7c0585f3a51	firstName1	lastName1	FEE	A1	1000001	100000-1200001	created	shortbio1
a61cfd85-b8f7-480a-b133-669d52f26d10	Riddhi	Sharma	DCS	A	100000	100000-120000	January 29th 1999	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lorem sem, bibendum rutrum eros vel, consectetur tincidunt magna. Phasellus at tincidunt lacus, ac tristique lacus. Nullam auctor suscipit arcu quis fermentum. Pellentesque ut tortor accumsan, consectetur eros sagittis, bibendum felis. Etiam leo libero, sodales vitae hendrerit eget, egestas ac nisi.
a6fce8fb-82d1-4139-8b29-88c8a696a711	Siddhi	Sharma	FEE	B	300000	300000-600000	January 29th 1999	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lorem sem, bibendum rutrum eros vel, consectetur tincidunt magna. Phasellus at tincidunt lacus, ac tristique lacus. Nullam auctor suscipit arcu quis fermentum. Pellentesque ut tortor accumsan, consectetur
7c52b5e0-22f0-4d6a-b4e2-1160d57f6206	Shubham	Kam	DCS	D	100000	100000-200000	January 29th 1999	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lorem sem, bibendum rutrum eros vel, consectetur tincidunt magna. Phasellus at tincidunt lacus, ac tristique lacus. Nullam auctor suscipit arcu quis fermentum. Pellentesque ut tortor accumsan, consectetur
b9a4af1e-4d4a-4c27-9746-9aa878c295b6	Admin	Admin	FEE	A1	1000001	100000-1200001	12th July 1997	Short bio for admin
a8af77c5-41a3-413f-9809-d217497850ec	Admin	Admin	FEE	A1	1000001	100000-1200001	12th July 1997	Short bio for admin
3e638e0e-4662-4ecb-b082-925f439a6352	AdminYo	AdminYo	FEE	A1	1000001	100000-1200001	12th July 1997	Short bio for admin
ba713c72-288f-48fe-93d0-75d6d5820688	New 	Employee	DCS	C	120000	120000-140000	January 29th 1999	This is a very good employee.
36b79cf0-0271-41d8-86a7-52c22cd8c46a	New 	Employee 2	FEE	A	1800000	1800000 - 2000000	January 29th 1999	A very rich employee
\.


--
-- Name: employee_seq; Type: SEQUENCE SET; Schema: public; Owner: omis
--

SELECT pg_catalog.setval('employee_seq', 14, true);


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY employees (id, registration_number, emp_group, user_id, department_id, employee_since, created) FROM stdin;
523bbe6e-f104-49e7-9b58-a82155433599	0001	AE	b576daa7-576c-4d84-876e-c994e411c37d	90110ff9-7a40-4096-8d18-8753a22a261e	2017-06-01 06:59:11.397	2017-06-01 06:59:11.399
4758842d-52f6-4bd6-9fca-faba65b99660	0002	AE	ee84b07d-2c04-4f6b-b6d3-a88ec5392e7f	90110ff9-7a40-4096-8d18-8753a22a261e	2017-06-01 07:00:16.069	2017-06-01 07:00:16.07
5efa89db-b5db-4a06-bb51-003e844c96cf	0003	AE	bb3e74f6-8da8-4295-8c95-f854fe22e64b	90110ff9-7a40-4096-8d18-8753a22a261e	2017-06-01 07:01:01.08	2017-06-01 07:01:01.081
11d0e3fa-bddb-4e5e-a21f-b5ddb619f58d	0004	AE	fe016bbf-2bc2-4ba9-9a3b-a8235eee82b2	39bd5196-9282-41a9-967d-16d4fd087ac1	2017-06-01 07:07:14.359	2017-06-01 07:07:14.361
32d97ffc-fbf9-4a5c-b1dd-c1716860fb94	0005	AE	02504232-8cee-4062-ab2d-c7c0585f3a51	39bd5196-9282-41a9-967d-16d4fd087ac1	2017-06-01 07:08:29.392	2017-06-01 07:08:29.394
808d9c48-f6cf-4e70-a70c-b8e798cf2696	0006	AR	927bf315-cd66-443c-a52a-d23b6c7ba1a5	90110ff9-7a40-4096-8d18-8753a22a261e	2017-06-01 08:06:44.653	2017-06-01 08:06:44.654
c067b91d-54bf-4f7b-83ee-f4e9475492e4	0007	ZB	a61cfd85-b8f7-480a-b133-669d52f26d10	90110ff9-7a40-4096-8d18-8753a22a261e	2017-06-01 08:07:25.665	2017-06-01 08:07:25.665
9dd3c435-2518-46d2-94c9-50a3204fcfed	0008	DA	a6fce8fb-82d1-4139-8b29-88c8a696a711	39bd5196-9282-41a9-967d-16d4fd087ac1	2017-06-01 08:16:44.706	2017-06-01 08:16:44.706
96aaa443-c55a-4458-81f4-d2704cba389b	0009	LE	7c52b5e0-22f0-4d6a-b4e2-1160d57f6206	90110ff9-7a40-4096-8d18-8753a22a261e	2017-06-01 08:18:09.945	2017-06-01 08:18:09.945
7dfadd28-662c-43ca-83b5-90c126f21721	0010	AE	b9a4af1e-4d4a-4c27-9746-9aa878c295b6	39bd5196-9282-41a9-967d-16d4fd087ac1	2017-06-01 09:01:24.546	2017-06-01 09:01:24.547
c28d6c8d-33a9-4e8f-9445-3c23685be8cc	0011	AE	a8af77c5-41a3-413f-9809-d217497850ec	39bd5196-9282-41a9-967d-16d4fd087ac1	2017-06-01 09:02:06.078	2017-06-01 09:02:06.079
5ccb0638-71ca-4da4-b5d2-40b4f3437b11	0012	AE	3e638e0e-4662-4ecb-b082-925f439a6352	39bd5196-9282-41a9-967d-16d4fd087ac1	2017-06-01 09:48:53.331	2017-06-01 09:48:53.332
90bb8868-ebe8-4433-9e05-f994d92ddb8b	0013	BG	ba713c72-288f-48fe-93d0-75d6d5820688	90110ff9-7a40-4096-8d18-8753a22a261e	2017-06-01 09:56:02.99	2017-06-01 09:56:02.991
9edf148b-4c1d-4de0-9e92-4a319cd7fb39	0014	FO	36b79cf0-0271-41d8-86a7-52c22cd8c46a	39bd5196-9282-41a9-967d-16d4fd087ac1	2017-06-01 10:00:41.662	2017-06-01 10:00:41.662
\.


--
-- Data for Name: employees_designations; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY employees_designations (id, name, created) FROM stdin;
\.


--
-- Data for Name: employees_grades; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY employees_grades (id, name, pay_band_min, pay_band_max, created) FROM stdin;
\.


--
-- Name: enrollment_number_seq; Type: SEQUENCE SET; Schema: public; Owner: omis
--

SELECT pg_catalog.setval('enrollment_number_seq', 1, false);





--
-- Name: faculty_number_seq; Type: SEQUENCE SET; Schema: public; Owner: omis
--

SELECT pg_catalog.setval('faculty_number_seq', 1, false);


--
-- Data for Name: login_info; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY login_info (user_id, provider_i_d, provider_key) FROM stdin;
e73015bd-c4e9-46a2-9a5d-e146cb649185	credentials	AG0001
36070226-d989-4eaa-9cc0-f1214b9342e5	credentials	AE0002
b576daa7-576c-4d84-876e-c994e411c37d	credentials	AE0001
ee84b07d-2c04-4f6b-b6d3-a88ec5392e7f	credentials	AE0002
bb3e74f6-8da8-4295-8c95-f854fe22e64b	credentials	AE0003
fe016bbf-2bc2-4ba9-9a3b-a8235eee82b2	credentials	AE0004
02504232-8cee-4062-ab2d-c7c0585f3a51	credentials	AE0005
927bf315-cd66-443c-a52a-d23b6c7ba1a5	credentials	AR0006
a61cfd85-b8f7-480a-b133-669d52f26d10	credentials	ZB0007
a6fce8fb-82d1-4139-8b29-88c8a696a711	credentials	DA0008
7c52b5e0-22f0-4d6a-b4e2-1160d57f6206	credentials	LE0009
b9a4af1e-4d4a-4c27-9746-9aa878c295b6	credentials	AE0010
a8af77c5-41a3-413f-9809-d217497850ec	credentials	AE0011
3e638e0e-4662-4ecb-b082-925f439a6352	credentials	AE0012
ba713c72-288f-48fe-93d0-75d6d5820688	credentials	BG0013
36b79cf0-0271-41d8-86a7-52c22cd8c46a	credentials	FO0014
\.


--
-- Data for Name: password_info; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY password_info (user_id, hasher, password, salt, created) FROM stdin;
e73015bd-c4e9-46a2-9a5d-e146cb649185	bcrypt	$2a$10$ByZ9CwYg9XjQ7427Bv6ojuquUF/2.CQb3CMNZV9TcBza6JYn5doUa	salt	2017-06-01 03:20:10.185
36070226-d989-4eaa-9cc0-f1214b9342e5	bcrypt	$2a$10$nXPchnpOL.DhIFqwirbyzOqMJNhvk.ePEkL1m/WM4dLZ43wblCMc.	salt	2017-06-01 06:09:51.073
b9a4af1e-4d4a-4c27-9746-9aa878c295b6	bcrypt	$2a$10$ecnO5wltMLOgp1gmvUFvN.JXGa9FHfCqaJPTfKhHqTfa6vspetDd6	salt	2017-06-01 09:01:41.415
a8af77c5-41a3-413f-9809-d217497850ec	bcrypt	$2a$10$I174hyv40oZ1tPmnysK1keSj2Fa/M7GqI1UaCuXfHQ7qibaD7rC/y	salt	2017-06-01 09:02:20.918
a61cfd85-b8f7-480a-b133-669d52f26d10	bcrypt	$2a$10$xqI667rceiTNu9rYcQEgZ..VNL3jnSlgQ0wRc83cVjW9CKjCp2Izy	salt	2017-06-01 09:45:10.986
3e638e0e-4662-4ecb-b082-925f439a6352	bcrypt	$2a$10$dejbX4zV/YOiMpoicO5lruS6AxuYbHbAjS9AgD3tIlRiA6zRXuxGm	salt	2017-06-01 09:52:40.636
36b79cf0-0271-41d8-86a7-52c22cd8c46a	bcrypt	$2a$10$BF/FtQBagTw.F4tC2FFO/.lPt17WVe8lQBLBKKrVtP2udZ0dGzBry	salt	2017-06-01 10:05:02.312
\.


--
-- Data for Name: schema_version; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY schema_version (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
1	1	schema	SQL	default/V1__schema.sql	456773286	omis	2017-06-01 02:55:06.361667	1487	t
2	2	data	SQL	default/V2__data.sql	0	omis	2017-06-01 02:55:06.380829	0	t
\.


--
-- Data for Name: semesters; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY semesters (id, session, semester_type, created) FROM stdin;
\.


--
-- Data for Name: student_admission; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY student_admission (id, faculty_serial, department_id, student_id, date_of_admission, date_of_leaving, created) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY students (id, user_id, enrollment_number, student_group, date_of_enrollment, created) FROM stdin;
\.


--
-- Data for Name: students_courses_results; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY students_courses_results (id, student_id, course_semester_id, grade, maximum_marks, marks_obtained, created) FROM stdin;
\.





--
-- Data for Name: university_allocated_leaves; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY university_allocated_leaves (id, year, university_id, number_of_leaves, created) FROM stdin;
\.


--
-- Data for Name: user_profile; Type: TABLE DATA; Schema: public; Owner: omis
--

COPY user_profile (user_id, address, phone_number, first_name, last_name, img_url, nationality, father_name, mother_name, created, short_bio) FROM stdin;
\.



