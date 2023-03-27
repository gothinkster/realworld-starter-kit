package com.softwaremill.realworld.articles

import io.getquill.*

//We force tags to be alphanumeric, so we can deterministically join it and split on "|" symbol.
private[articles] object ArticlesTags:

  inline def tagsConcat: Quoted[String => String] = quote { (str: String) =>
    sql"GROUP_CONCAT(($str), '|')".pure.as[String]
  }

  def explodeTags(tags: String): List[String] = tags.split("\\|").toList
