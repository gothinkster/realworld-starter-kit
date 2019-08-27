package com.hexagonkt.realworld.messages

import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(JsonInclude.Include.NON_NULL)
data class TagsResponseRoot(val tags: Collection<String>)
