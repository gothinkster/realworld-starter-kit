(defproject conduit "0.1.0-SNAPSHOT"
            :dependencies [[org.clojure/clojure "1.9.0"]
                           [org.clojure/clojurescript "1.9.946"]
                           [reagent "0.7.0"]
                           [re-frame "0.10.2"]
                           [cljs-ajax "0.7.3"]
                           [day8.re-frame/http-fx "0.1.4"]
                           [secretary "1.2.3"]
                           [com.andrewmcveigh/cljs-time "0.5.2"]
                           [binaryage/devtools "0.9.8"]
                           [proto-repl "0.3.1"]
                           [re-frisk "0.5.3"]]

            :jvm-opts ["--add-modules" "java.xml.bind"]

            :plugins [[lein-cljsbuild "1.1.7"]
                      [lein-doo "0.1.8"]
                      [lein-figwheel  "0.5.14"]]

            :hooks [leiningen.cljsbuild]

            :aliases {"dev" ["do" "clean" ["figwheel"]]
                      "prod" ["do" "clean" ["with-profile" "prod" "compile"]]}

            :profiles {:dev  {:cljsbuild
                              {:builds {:client {:compiler {:asset-path           "js"
                                                            :optimizations        :none
                                                            :source-map           true
                                                            :source-map-timestamp true
                                                            :preloads             [re-frisk.preload]
                                                            :main                 "conduit.core"}
                                                 :figwheel {:on-jsload            "conduit.core/main"}}}}}

                       :prod {:cljsbuild
                              {:builds {:client {:compiler {:optimizations :advanced
                                                            :elide-asserts true
                                                            :pretty-print  false}}}}}
                       :test {:cljsbuild
                              {:builds {:client {:source-paths ["src/conduit" "test"]
                                                 :compiler {:optimizations :none
                                                            :main          test.runner
                                                            :output-to     "resources/public/test"
                                                            :output-dir    "resources/public/test/out"}}}}}}
            :figwheel {:server-port 3449
                       :repl        true}

            :clean-targets ^{:protect false} ["resources/public/js" "target"]

            :cljsbuild {:builds {:client {:source-paths ["src/conduit"]
                                          :compiler     {:output-dir "resources/public/js"
                                                         :output-to  "resources/public/js/client.js"}}}})
