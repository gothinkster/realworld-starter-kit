import com.typesafe.sbt.packager.Keys._
import com.typesafe.sbt.packager.debian.DebianPlugin.autoImport.Debian
import com.typesafe.sbt.packager.docker.DockerPlugin.autoImport.{ Docker, dockerExposedPorts, dockerExposedVolumes }
import com.typesafe.sbt.packager.jdkpackager.JDKPackagerPlugin.autoImport.{ JDKPackager, jdkAppIcon, jdkPackagerBasename }
import com.typesafe.sbt.packager.universal.UniversalPlugin.autoImport.{ Universal, useNativeZip }
import com.typesafe.sbt.packager.windows
import com.typesafe.sbt.packager.windows.WindowsPlugin.autoImport.Windows
import sbt.Keys._
import sbt._

object Packaging {
  private[this] lazy val iconGlob = sys.props("os.name").toLowerCase match {
    case os if os.contains("mac") => "*.icns"
    case os if os.contains("win") => "*.ico"
    case _ => "*.png"
  }

  private[this] def isConf(x: (File, String)) = x._1.getAbsolutePath.contains("conf/")

  val settings = useNativeZip ++ Seq(
    topLevelDirectory in Universal := None,
    packageSummary := description.value,
    packageDescription := description.value,

    mappings in Universal := (mappings in Universal).value.filterNot(isConf),

    // Linux Settings
    packageDescription in Debian := s"${Shared.projectName} Debian Package",
    topLevelDirectory in Debian := Some(Shared.projectId + "-" + Shared.Versions.app),
    debianNativeBuildOptions in Debian := Seq("-Zgzip", "-z3"),
    debianPackageRecommends in Debian ++= Seq("openjdk-8-jre"),
    rpmVendor := Shared.projectName,
    linuxPackageMappings := linuxPackageMappings.value.filter(_.fileData.config != "false"),

    // Windows settings
    mappings in Windows := (mappings in Windows).value.filterNot(isConf),
    //makeBatScript := Some(file(s"./src/deploy/package/windows/${Shared.projectId}.bat")),
    topLevelDirectory in Windows := Some(Shared.projectName),
    wixProductId := "5fee44ae-0989-429b-9b1a-de8ec7dd9af5",
    wixProductUpgradeId := "6d353c6a-6f39-48f1-afa8-2c5eb726a8b8",
    wixProductLicense := None,//Some(file("src/deploy/package/windows/license.rtf")),
    wixFeatures := makeWindowsFeatures((mappings in Windows).value),

    // Docker
    dockerExposedPorts := Seq(4260, 4261, 4262, 4263),
    defaultLinuxInstallLocation in Docker := s"/opt/${Shared.projectId}",
    packageName in Docker := packageName.value,
    dockerExposedVolumes := Seq(s"/opt/${Shared.projectId}"),
    version in Docker := version.value,

    // JDK Packager
    jdkAppIcon :=  (sourceDirectory.value ** iconGlob).getPaths.headOption.map(file),
    jdkPackagerBasename := Shared.projectName,
    name in JDKPackager := Shared.projectName,

    javaOptions in Universal ++= Seq(
      "-J-Xmx2g",
      "-J-Xms256m",
      s"-Dproject=${Shared.projectId}"
    )
  )

  private[this] def makeWindowsFeatures(mappings: Seq[(File, String)]): Seq[windows.WindowsFeature] = {
    import windows._

    val files = for {
      (file, name) <- mappings
      if !file.isDirectory
    } yield ComponentFile(name, editable = false)

    val corePackage = WindowsFeature(
      id = WixHelper.cleanStringForId(s"${Shared.projectId}_core").takeRight(38), // Must be no longer
      title = "Core Files",
      desc = s"Core files for ${Shared.projectName}.",
      absent = "disallow",
      components = files
    )
    val addBinToPath = WindowsFeature(
      id = "AddBinToPath",
      title = "Update PATH",
      desc = "Update PATH environment variables (requires restart).",
      components = Seq(AddDirectoryToPath("bin"))
    )
    // val menuLinks = WindowsFeature(
    //   id = "AddConfigLinks",
    // title = "Start Menu Links",
    // desc = "Adds start menu shortcuts.",
    // components = Seq(AddShortCuts(Seq(s"bin\\${Shared.projectId}.bat")))
    // )

    Seq(corePackage, addBinToPath/* , menuLinks */)
  }
}
