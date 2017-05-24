lazy val server = Server.server

lazy val sharedJs = Shared.sharedJs

lazy val client = Client.client

lazy val sharedJvm = Shared.sharedJvm

// loads the Play server project at sbt startup
onLoad in Global := (Command.process("project server", _: State)) compose (onLoad in Global).value