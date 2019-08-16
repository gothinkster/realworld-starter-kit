(ns user
  (:require [realworld-fulcro.server :as srv]
            [shadow.cljs.devtools.api :as shadow.api]
            [shadow.cljs.devtools.server :as shadow.server]))


(defn -main
  [& _]
  (shadow.server/start!)
  (shadow.api/watch :main)
  (srv/-main))
