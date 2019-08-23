(ns user
  (:require [realworld-fulcro.server :as srv]
            [shadow.cljs.devtools.api :as shadow.api]
            [shadow.cljs.devtools.server :as shadow.server]))


(defn -main
  {:shadow/requires-server true}
  [& _]
  (shadow.server/start!)
  (shadow.api/watch :main)
  (shadow.api/watch :cards)
  (srv/-main))
