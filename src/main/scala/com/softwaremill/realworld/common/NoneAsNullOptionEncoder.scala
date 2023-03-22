package com.softwaremill.realworld.common

import zio.json.JsonEncoder
import zio.json.ast.Json
import zio.json.internal.Write

trait NoneAsNullOptionEncoder {

  implicit def optionEnc[A](implicit jea: JsonEncoder[A]): zio.json.JsonEncoder[Option[A]] = {
    val delegate = JsonEncoder.option(jea)
    new JsonEncoder[Option[A]] {
      override def isNothing(a: Option[A]): Boolean = a match {
        case None    => false
        case Some(a) => jea.isNothing(a)
      }
      override def toJsonAST(a: Option[A]): Either[String, Json] = delegate.toJsonAST(a)
      override def unsafeEncode(a: Option[A], indent: Option[Int], out: Write): Unit = delegate.unsafeEncode(a, indent, out)
    }
  }

}

object NoneAsNullOptionEncoder extends NoneAsNullOptionEncoder
