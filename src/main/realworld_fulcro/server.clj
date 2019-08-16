(ns realworld-fulcro.server
  (:require [io.pedestal.http :as http]
            [com.fulcrologic.fulcro.dom-server :as dom]
            [com.fulcrologic.fulcro.components :as comp]
            [clojure.string :as string]
            [ring.util.mime-type :as mime]))

(comp/defsc Footer [this props]
  {:query []}
  (dom/footer
    (dom/div {:class "container"}
             (dom/a {:class "logo-font" :href "/"}
                    "conduit")
             (dom/span {:class "attribution"}
                       "An interactive learning project from"
                       (dom/a {:href "https://thinkster.io"} "Thinkster")
                       ". Code &amp; design licensed under MIT."))))

(comp/defsc Index [this props]
  {:query []}
  (dom/html
    (dom/head
      (dom/meta {:charset "utf-8"})
      (dom/title "Conduit")
      (dom/link {:href "//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
                 :rel  "stylesheet"
                 :type "text/css"})
      (dom/link {:href "//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
                 :rel= "stylesheet"
                 :type "text/css"})
      (dom/link {:rel  "stylesheet"
                 :href "//demo.productionready.io/main.css"}))
    (dom/body
      {:data-target-id  "app"
       :data-remote-url "/api"
       :onload          "realworld_fulcro.client.main()"}
      (dom/div
        {:id "app"})
      (dom/script {:src "/js/main/main.js"}))))

(def ui-index (comp/factory Index))

(defn index
  [req]
  {:body    (string/join "\n"
                         ["<!DOCTYPE html>"
                          (dom/render-to-str (ui-index {}))])
   :headers {"Content-Security-Policy" ""
             "Cache-Control"           "no-store"
             "Content-Type"            (mime/default-mime-types "html")}
   :status  200})

(def routes
  `#{["/" :get index]})

(def service
  {::http/port      8080
   ::http/join?     false
   ::http/routes    routes
   ::http/type      :jetty
   ::http/file-path "target/public"})

(defonce server (atom nil))

(defn -main
  []
  (swap! server (fn [srv]
                  (when srv
                    (http/stop srv))
                  (-> service
                      http/default-interceptors
                      http/dev-interceptors
                      http/create-server
                      http/start))))
