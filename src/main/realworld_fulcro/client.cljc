(ns realworld-fulcro.client
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [com.fulcrologic.fulcro.application :as app]
            [realworld-fulcro.proxy :as proxy]
            #?@(:cljs [[goog.dom :as gdom]])
            #?(:cljs    [com.fulcrologic.fulcro.dom :as dom]
               :default [com.fulcrologic.fulcro.dom-server :as dom])
            [com.fulcrologic.fulcro.mutations :as fm]
            [com.fulcrologic.fulcro.data-fetch :as df]))


(defsc Root [this {:app.user/keys [password email]
                   ::proxy/keys   [hello]}]
  {:query [:app.user/email
           :app.user/password
           :app.user/username
           ::proxy/hello]
   :ident (fn []
            [::root ::root])}
  (dom/div
    (dom/input {:value    (or email "")
                :onChange #(fm/set-value! this :app.user/email (-> % .-target .-value))})
    (dom/input {:value    (or password "")
                :onChange #(fm/set-value! this :app.user/password (-> % .-target .-value))})
    (dom/button
      {:onClick #(comp/transact! this `[(app.user/login ~{:app.user/password password
                                                          :app.user/email    email})])}
      "load")
    (dom/code (str hello))))


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
