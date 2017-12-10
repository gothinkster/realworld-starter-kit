(ns conduit.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [goog.events :as events]
            [reagent.core :as reagent]
            [re-frame.core :refer [dispatch dispatch-sync]]
            [secretary.core :as secretary]
            [conduit.events]
            [conduit.subs]
            [conduit.views]
            [devtools.core :as devtools])
  (:import [goog History]
           [goog.history EventType]))

;; -- Debugging aids ----------------------------------------------------------
;;
(devtools/install!)       ;; we love https://github.com/binaryage/cljs-devtools
(enable-console-print!)   ;; so that println writes to `console.log`

;; -- Service Worker ----------------------------------------------------------
;;
(defn is-service-worker-supported?
  []
  (exists? js/navigator.serviceWorker))

(defn register-service-worker
  [path-to-sw]
  (when (is-service-worker-supported?)
    (-> js/navigator
        .-serviceWorker
        (.register path-to-sw))))

;; -- Routes and History ------------------------------------------------------
;;
(defn routes
  []
  (set! (.-hash js/location) "/")      ;; on app startup set location to "/"
  (secretary/set-config! :prefix "#")  ;; and don't forget about "#" prefix
  (defroute "/" [] (dispatch [:set-active-page {:page :home}]))
  (defroute "/login" [] (dispatch [:set-active-page {:page :login}]))
  (defroute "/register" [] (dispatch [:set-active-page {:page :register}]))
  (defroute "/settings" [] (dispatch [:set-active-page {:page :settings}]))
  (defroute "/editor" [] (dispatch [:set-active-page {:page :editor}]))
  (defroute "/editor/:slug" [slug] (dispatch [:set-active-page {:page :editor :slug slug}]))
  (defroute "/logout" [] (dispatch [:logout]))
  (defroute "/article/:slug" [slug] (dispatch [:set-active-page {:page :article :slug slug}]))
  (defroute "/:profile/favorites" [profile] (dispatch [:set-active-page {:page :favorited :favorited (subs profile 1)}]))
  (defroute "/:profile" [profile] (dispatch [:set-active-page {:page :profile :profile (subs profile 1)}])))

(def history
  (doto (History.)
    (events/listen EventType.NAVIGATE
                   (fn [event] (secretary/dispatch! (.-token event))))
    (.setEnabled true)))

;; -- Entry Point -------------------------------------------------------------
;; Within ../../resources/public/index.html you'll see this code:
;; window.onload = function() { conduit.core.main() }
;; So this is the entry function that kicks off the app once the HTML is loaded.
;;
(defn ^:export main
  []
  ;; Put an initial value into app-db.
  ;; The event handler for `:initialise-db` can be found in `events.cljs`
  ;; Using the sync version of dispatch means that value is in
  ;; place before we go onto the next step.
  (dispatch-sync [:initialise-db])

  ;; Hookup the router and history that we configured above.
  (routes)

  ;; Render the UI into the HTML's <div id="app" /> element
  ;; The view function `conduit.views/conduit-app` is the
  ;; root view for the entire UI.
  (reagent/render [conduit.views/conduit-app]
    (.getElementById js/document "app"))

  ;; Register Service Worker defined at the top
  (register-service-worker "js/service-worker.js"))
