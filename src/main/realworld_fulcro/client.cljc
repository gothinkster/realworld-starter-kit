(ns realworld-fulcro.client
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [com.fulcrologic.fulcro.application :as app]
            [realworld-fulcro.proxy :as proxy]
            [realworld-fulcro.ui :as ui]
            [com.fulcrologic.fulcro.routing.legacy-ui-routers :as fr]
            #?@(:cljs [[goog.dom :as gdom]])
            #?(:cljs    [com.fulcrologic.fulcro.dom :as dom]
               :default [com.fulcrologic.fulcro.dom-server :as dom])
            [com.fulcrologic.fulcro.mutations :as fm]
            [com.fulcrologic.fulcro.data-fetch :as df]))


(fr/defsc-router Router [this {:PAGE/keys [ident id]}]
  {:router-targets {:PAGE/home  ui/Home
                    :PAGE/login ui/Login}
   :ident          (fn []
                     [ident id])
   :router-id      ::router
   :default-route  ui/Home}
  (dom/div "404"))

(def ui-router (comp/factory Router))

(defsc Root [this {::keys [router header]}]
  {:query         [{::router (comp/get-query Router)}
                   {::header (comp/get-query ui/Header)}]
   :initial-state (fn [_]
                    {::router (comp/get-initial-state Router _)
                     ::header (comp/get-initial-state ui/Header _)})}
  (comp/fragment
    (ui/ui-header header)
    (ui-router router)))

(fm/defmutation app.user/login
  [{:app.user/keys [_]}]
  (action [{:keys [state]}]
          (swap! state (fn [st]
                         (-> st))))
  (remote [{:keys [] :as env}]
          (fm/returning env Root)))

(fm/defmutation app.user/login
  [{:app.user/keys [_]}]
  (action [{:keys [state]}]
          (swap! state (fn [st]
                         (-> st))))
  (remote [{:keys [] :as env}]
          (fm/returning env Root)))

(defonce SPA (atom nil))
(defn main
  []
  (let [spa (app/fulcro-app {:remotes {:remote proxy/remote}})]
    #?(:cljs (app/mount! spa Root (gdom/getElement "app")))
    (reset! SPA spa)))

(defn after-load
  []
  (app/force-root-render! @SPA))
