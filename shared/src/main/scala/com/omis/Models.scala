package com.omis

import java.util.UUID

case class Employee(empId:UUID, firstName: String, lastName: String, university: String, faculty: String, department: String,
                    grade: String, salary: String, payScale: String, shortbio: String,
                    since: String, registrationCode: String, imgUrl: String)
