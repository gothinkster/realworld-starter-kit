(ns realworld-fulcro.client
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [com.fulcrologic.fulcro.application :as app]
            [realworld-fulcro.proxy :as proxy]
            [realworld-fulcro.ui :as ui]
            [com.fulcrologic.fulcro.routing.legacy-ui-routers :as fr]
            #?@(:cljs [[goog.dom :as gdom]
                       [goog.history.EventType :as event-type]
                       [goog.events :as gevt]])
            #?(:cljs    [com.fulcrologic.fulcro.dom :as dom]
               :default [com.fulcrologic.fulcro.dom-server :as dom])
            [com.fulcrologic.fulcro.mutations :as fm]
            [com.fulcrologic.fulcro.data-fetch :as df])
  #?(:cljs (:import (goog.history Html5History))))


(fr/defsc-router Router [this {:PAGE/keys [ident id]}]
  {:router-targets {:PAGE/home  ui/Home
                    :PAGE/login ui/Login}
   :ident          (fn []
                     [ident id])
   :router-id      ::ui/router
   :default-route  ui/Home}
  (dom/div "404"))

(def ui-router (comp/factory Router))

(defsc Root [this {::ui/keys [router header]}]
  {:query         [{::ui/router (comp/get-query Router)}
                   {::ui/header (comp/get-query ui/Header)}]
   :initial-state (fn [_]
                    {::ui/router (comp/get-initial-state Router _)
                     ::ui/header (comp/get-initial-state ui/Header _)})}
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
  (let [history #?(:cljs (new Html5History)
                   :default nil)
        client-did-mount #?(:cljs (fn [app]
                                    (doto history
                                      (gevt/listen event-type/NAVIGATE #(when-let [token (subs (.-token %) 1)]
                                                                          (df/load! app [::ui/path token] Root)))
                                      (.setUseFragment false)
                                      (.setPathPrefix "http://localhost:8080")
                                      (.setEnabled true))
                                    (js/addEventListener "click" (fn [e]
                                                                   (when-let [hash (-> e .-target .-hash)]
                                                                     (.preventDefault e)
                                                                     (.setToken history hash)))))
                            :default (constantly true))
        spa (app/fulcro-app {:client-did-mount client-did-mount
                             :remotes          {:remote proxy/remote}})]
    #?(:cljs (app/mount! spa Root (gdom/getElement "app")))
    (reset! SPA spa)))

(defn after-load
  []
  (app/force-root-render! @SPA))
