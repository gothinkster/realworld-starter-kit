(ns realworld-fulcro.ui
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            #?(:cljs    [com.fulcrologic.fulcro.dom :as dom]
               :default [com.fulcrologic.fulcro.dom-server :as dom])
            [com.fulcrologic.fulcro.mutations :as fm]))

(defsc Header [this {::keys [authed?]}]
  {:query         [::authed?]
   :ident         (fn []
                    [::header ::header])
   :initial-state (fn [_]
                    {::authed? false})}
  (dom/nav
    {:className "navbar navbar-light"}
    (dom/div
      {:className "container"}
      (dom/a {:href      "#/"
              :className "navbar-brand"} "conduit")
      (dom/ul
        {:className "nav navbar-nav pull-xs-right"}
        (dom/li
          {:className "nav-item"}
          (dom/a {:href "#/"
                  :className "nav-link active"} "Home"))
        (when authed?
          (dom/li
            {:className "nav-item"}
            (dom/a
              {:href "" :className "nav-link"}
              (dom/i {:className "ion-compose"})
              "New Post")))
        (when authed?
          (dom/li
            {:className "nav-item"}
            (dom/a
              {:href      ""
               :className "nav-link"}
              (dom/i {:className "ion-gear-a"})
              "Settings")))
        (dom/li
          {:className "nav-item"}
          (dom/a {:href      "#/login"
                  :className "nav-link"} "Sign in"))
        (dom/li
          {:className "nav-item"}
          (dom/a {:href      "#/login?signup"
                  :className "nav-link"} "Sign up"))))))

(def ui-header (comp/factory Header))

(defsc Footer [this props]
  {:query []}
  (dom/footer
    (dom/div
      {:className "container"}
      (dom/a {:href      "/"
              :className "logo-font"} "conduit")
      (dom/span
        {:className "attribution"}
        "An interactive learning project from"
        (dom/a {:href "https://thinkster.io"} "Thinkster")
        ". Code &amp; design licensed under MIT."))))



(defsc Home [this {}]
  {:query         [:PAGE/ident
                   :PAGE/id]
   :ident         (fn []
                    [:PAGE/home :PAGE/home])
   :initial-state (fn [_]
                    {:PAGE/ident :PAGE/home
                     :PAGE/id    :PAGE/home})}
  (dom/div
    {:className "home-page"}
    (dom/div
      {:className "banner"}
      (dom/div
        {:className "container"}
        (dom/h1 {:className "logo-font"} "conduit")
        (dom/p {} "A place to share your knowledge.")))
    (dom/div
      {:className "container page"}
      (dom/div
        {:className "row"}
        (dom/div
          {:className "col-md-9"}
          (dom/div
            {:className "feed-toggle"})))
      (dom/ul
        {:className "nav nav-pills outline-active"}
        (dom/li
          {:className "nav-item"}
          (dom/a {:href "", :className "nav-link disabled"} "Your Feed"))
        (dom/li
          {:className "nav-item"}
          (dom/a
            {:href "", :className "nav-link active"}
            "Global Feed")))
      (dom/div
        {:className "article-preview"})
      (dom/div
        {:className "article-meta"})
      (dom/a
        {:href "profile.html"})
      (dom/img {:src "http://i.imgur.com/Qr71crq.jpg"})
      (dom/div
        {:className "info"})
      (dom/a {:href "", :className "author"} "Eric Simons")
      (dom/span {:className "date"} "January 20th")
      (dom/button
        {:className "btn btn-outline-primary btn-sm pull-xs-right"})
      (dom/i {:className "ion-heart"}
             "29")
      (dom/a
        {:href "", :className "preview-link"})
      (dom/h1 {} "How to build webapps that scale")
      (dom/p {} "This is the description for the post.")
      (dom/span {} "Read more...")
      (dom/div
        {:className "article-preview"})
      (dom/div
        {:className "article-meta"})
      (dom/a
        {:href "profile.html"})
      (dom/img {:src "http://i.imgur.com/N4VcUeJ.jpg"})
      (dom/div
        {:className "info"})
      (dom/a {:href "", :className "author"} "Albert Pai")
      (dom/span {:className "date"} "January 20th")
      (dom/button
        {:className "btn btn-outline-primary btn-sm pull-xs-right"})
      (dom/i {:className "ion-heart"})
      "32"
      (dom/a
        {:href "", :className "preview-link"})
      (dom/h1
        {})
      "The song you won&#39;t ever stop singing. No matter how hard you try."
      (dom/p {} "This is the description for the post.")
      (dom/span {} "Read more...")
      (dom/div
        {:className "col-md-3"})
      (dom/div
        {:className "sidebar"})
      (dom/p {} "Popular Tags")
      (dom/div
        {:className "tag-list"})
      (dom/a
        {:href "", :className "tag-pill tag-default"})
      "programming"
      (dom/a
        {:href "", :className "tag-pill tag-default"})
      "javascript"
      (dom/a {:href "", :className "tag-pill tag-default"} "emberjs")
      (dom/a {:href "", :className "tag-pill tag-default"} "angularjs")
      (dom/a {:href "", :className "tag-pill tag-default"} "react")
      (dom/a {:href "", :className "tag-pill tag-default"} "mean")
      (dom/a {:href "", :className "tag-pill tag-default"} "node")
      (dom/a
        {:href "", :className "tag-pill tag-default"})
      "rails")))

(defsc Login [this {:app.user/keys [username email password]}]
  {:query         [:PAGE/ident
                   :PAGE/id
                   :app.user/username
                   :app.user/email
                   :app.user/password]
   :ident         (fn []
                    [:PAGE/login :PAGE/login])
   :initial-state (fn [_]
                    {:app.user/username ""
                     :app.user/email    ""
                     :app.user/password ""
                     :PAGE/ident        :PAGE/login
                     :PAGE/id           :PAGE/login})}

  (dom/div
    {:className "auth-page"}
    (dom/div
      {:className "container page"}
      (dom/div
        {:className "row"}
        (dom/div
          {:className "col-md-6 offset-md-3 col-xs-12"}))
      (dom/h1 {:className "text-xs-center"} "Sign up")
      (dom/p
        {:className "text-xs-center"}
        (dom/a {:href ""} "Have an account?"))
      (dom/ul
        {:className "error-messages"}
        (dom/li {} "That email is already taken"))
      (dom/form
        {}
        (dom/fieldset
          {:className "form-group"}
          (dom/input
            {:type        "text",
             :value       username
             :onChange    #(fm/set-value! this :app.user/username (-> % .-target .-value))
             :placeholder "Your Name",
             :className   "form-control form-control-lg"}))
        (dom/fieldset
          {:className "form-group"}
          (dom/input
            {:type        "text",
             :value       email
             :onChange    #(fm/set-value! this :app.user/email (-> % .-target .-value))
             :placeholder "Email",
             :className   "form-control form-control-lg"}))
        (dom/fieldset
          {:className "form-group"}
          (dom/input
            {:type        "password",
             :value       password
             :onChange    #(fm/set-value! this :app.user/password (-> % .-target .-value))
             :placeholder "Password",
             :className   "form-control form-control-lg"})))
      (dom/button
        {:className "btn btn-lg btn-primary pull-xs-right"}
        "Sign up"))))

(def ui-login (comp/factory Login))

(defsc Profile [this props]
  {:query []}
  (dom/div
    {:className "profile-page"}
    (dom/div
      {:className "user-info"}
      (dom/div
        {:className "container"}
        (dom/div
          {:className "row"}
          (dom/div
            {:className "col-xs-12 col-md-10 offset-md-1"}
            (dom/img
              {:src "http://i.imgur.com/Qr71crq.jpg", :className "user-img"})
            (dom/h4 {} "Eric Simons")
            (dom/p
              {}
              "Cofounder @GoThinkster, lived in Aol&#39;s HQ for a few months, kinda looks like Peeta from the Hunger Games")
            (dom/button
              {:className "btn btn-sm btn-outline-secondary action-btn"}
              (dom/i {:className "ion-plus-round"})
              "Follow Eric Simons")))))
    (dom/div
      {:className "container"}
      (dom/div
        {:className "row"}
        (dom/div
          {:className "col-xs-12 col-md-10 offset-md-1"}
          (dom/div
            {:className "articles-toggle"}
            (dom/ul
              {:className "nav nav-pills outline-active"}
              (dom/li
                {:className "nav-item"}
                (dom/a {:href "", :className "nav-link active"} "My Articles"))
              (dom/li
                {:className "nav-item"}
                (dom/a
                  {:href "", :className "nav-link"}
                  "Favorited Articles"))))
          (dom/div
            {:className "article-preview"}
            (dom/div
              {:className "article-meta"}
              (dom/a
                {:href ""}
                (dom/img {:src "http://i.imgur.com/Qr71crq.jpg"}))
              (dom/div
                {:className "info"}
                (dom/a {:href "", :className "author"} "Eric Simons")
                (dom/span {:className "date"} "January 20th"))
              (dom/button
                {:className "btn btn-outline-primary btn-sm pull-xs-right"}
                (dom/i {:className "ion-heart"})
                "29"))
            (dom/a
              {:href "", :className "preview-link"}
              (dom/h1 {} "How to build webapps that scale")
              (dom/p {} "This is the description for the post.")
              (dom/span {} "Read more...")))
          (dom/div
            {:className "article-preview"}
            (dom/div
              {:className "article-meta"}
              (dom/a
                {:href ""}
                (dom/img {:src "http://i.imgur.com/N4VcUeJ.jpg"}))
              (dom/div
                {:className "info"}
                (dom/a {:href "", :className "author"} "Albert Pai")
                (dom/span {:className "date"} "January 20th"))
              (dom/button
                {:className "btn btn-outline-primary btn-sm pull-xs-right"}
                (dom/i {:className "ion-heart"})
                "32"))
            (dom/a
              {:href "", :className "preview-link"}
              (dom/h1
                {}
                "The song you won&#39;t ever stop singing. No matter how hard you try.")
              (dom/p {} "This is the description for the post.")
              (dom/span {} "Read more...")
              (dom/ul
                {:className "tag-list"}
                (dom/li {:className "tag-default tag-pill tag-outline"} "Music")
                (dom/li
                  {:className "tag-default tag-pill tag-outline"}
                  "Song")))))))))

(defsc Settings [this props]
  {:query []}
  (dom/div
    {:className "settings-page"}
    (dom/div
      {:className "container page"}
      (dom/div
        {:className "row"}
        (dom/div
          {:className "col-md-6 offset-md-3 col-xs-12"}
          (dom/h1 {:className "text-xs-center"} "Your Settings")
          (dom/form
            {}
            (dom/fieldset
              {}
              (dom/fieldset
                {:className "form-group"}
                (dom/input
                  {:type        "text",
                   :placeholder "URL of profile picture",
                   :className   "form-control"}))
              (dom/fieldset
                {:className "form-group"}
                (dom/input
                  {:type        "text",
                   :placeholder "Your Name",
                   :className   "form-control form-control-lg"}))
              (dom/fieldset
                {:className "form-group"}
                (dom/textarea
                  {:rows        "8",
                   :placeholder "Short bio about you",
                   :className   "form-control form-control-lg"}))
              (dom/fieldset
                {:className "form-group"}
                (dom/input
                  {:type        "text",
                   :placeholder "Email",
                   :className   "form-control form-control-lg"}))
              (dom/fieldset
                {:className "form-group"}
                (dom/input
                  {:type        "password",
                   :placeholder "Password",
                   :className   "form-control form-control-lg"}))
              (dom/button
                {:className "btn btn-lg btn-primary pull-xs-right"}
                "Update Settings"))))))))

(defsc EditArticle [this props]
  {:query []}
  (dom/div
    {:className "editor-page"}
    (dom/div
      {:className "container page"}
      (dom/div
        {:className "row"}
        (dom/div
          {:className "col-md-10 offset-md-1 col-xs-12"}))
      (dom/form
        {}
        (dom/fieldset
          {})
        (dom/fieldset
          {:className "form-group"})
        (dom/input
          {:type        "text",
           :placeholder "Article Title",
           :className   "form-control form-control-lg"}))
      (dom/fieldset
        {:className "form-group"}
        (dom/input
          {:type        "text",
           :placeholder "What's this article about?",
           :className   "form-control"}))
      (dom/fieldset
        {:className "form-group"}
        (dom/textarea
          {:rows        "8",
           :placeholder "Write your article (in markdown)",
           :className   "form-control"}))
      (dom/fieldset
        {:className "form-group"}
        (dom/input
          {:type        "text",
           :placeholder "Enter tags",
           :className   "form-control"}))
      (dom/div {:className "tag-list"})
      (dom/button
        {:type      "button",
         :className "btn btn-lg pull-xs-right btn-primary"}
        "Publish Article"))))

(defsc Article [this props]
  {:query []}
  (dom/div
    {:className "article-page"}
    (dom/div
      {:className "banner"}
      (dom/div
        {:className "container"}
        (dom/h1 {} "How to build webapps that scale")
        (dom/div
          {:className "article-meta"}
          (dom/a
            {:href ""}
            (dom/img {:src "http://i.imgur.com/Qr71crq.jpg"}))
          (dom/div
            {:className "info"}
            (dom/a {:href "", :className "author"} "Eric Simons")
            (dom/span {:className "date"} "January 20th"))
          (dom/button
            {:className "btn btn-sm btn-outline-secondary"}
            (dom/i {:className "ion-plus-round"})
            "Follow Eric Simons"
            (dom/span {:className "counter"} "(10)"))
          (dom/button
            {:className "btn btn-sm btn-outline-primary"}
            (dom/i {:className "ion-heart"})
            "Favorite Post"
            (dom/span {:className "counter"} "(29)")))))
    (dom/div
      {:className "container page"}
      (dom/div
        {:className "row article-content"}
        (dom/div
          {:className "col-md-12"}
          (dom/p
            {}
            "Web development technologies have evolved at an incredible clip over the past few years.")
          (dom/h2 {:id "introducing-ionic"} "Introducing RealWorld.")
          (dom/p
            {}
            "It&#39;s a great solution for learning how other frameworks work.")))
      (dom/hr {})
      (dom/div
        {:className "article-actions"}
        (dom/div
          {:className "article-meta"}
          (dom/a
            {:href "profile.html"}
            (dom/img {:src "http://i.imgur.com/Qr71crq.jpg"}))
          (dom/div
            {:className "info"}
            (dom/a {:href "", :className "author"} "Eric Simons")
            (dom/span {:className "date"} "January 20th"))
          (dom/button
            {:className "btn btn-sm btn-outline-secondary"}
            (dom/i {:className "ion-plus-round"})
            "Follow Eric Simons"
            (dom/span {:className "counter"} "(10)"))
          (dom/button
            {:className "btn btn-sm btn-outline-primary"}
            (dom/i {:className "ion-heart"})
            "Favorite Post"
            (dom/span {:className "counter"} "(29)"))))
      (dom/div
        {:className "row"}
        (dom/div
          {:className "col-xs-12 col-md-8 offset-md-2"}
          (dom/form
            {:className "card comment-form"}
            (dom/div
              {:className "card-block"}
              (dom/textarea
                {:placeholder "Write a comment...",
                 :rows        "3",
                 :className   "form-control"}))
            (dom/div
              {:className "card-footer"}
              (dom/img
                {:src       "http://i.imgur.com/Qr71crq.jpg",
                 :className "comment-author-img"})
              (dom/button
                {:className "btn btn-sm btn-primary"}
                "Post Comment")))
          (dom/div
            {:className "card"}
            (dom/div
              {:className "card-block"}
              (dom/p
                {:className "card-text"}
                "With supporting text below as a natural lead-in to additional content."))
            (dom/div
              {:className "card-footer"}
              (dom/a
                {:href "", :className "comment-author"}
                (dom/img
                  {:src       "http://i.imgur.com/Qr71crq.jpg",
                   :className "comment-author-img"}))
              (dom/a {:href "", :className "comment-author"} "Jacob Schmidt")
              (dom/span {:className "date-posted"} "Dec 29th")))
          (dom/div
            {:className "card"}
            (dom/div
              {:className "card-block"}
              (dom/p
                {:className "card-text"}
                "With supporting text below as a natural lead-in to additional content."))
            (dom/div
              {:className "card-footer"}
              (dom/a
                {:href "", :className "comment-author"}
                (dom/img
                  {:src       "http://i.imgur.com/Qr71crq.jpg",
                   :className "comment-author-img"}))
              (dom/a {:href "", :className "comment-author"} "Jacob Schmidt")
              (dom/span {:className "date-posted"} "Dec 29th")
              (dom/span
                {:className "mod-options"}

                (dom/i {:className "ion-edit"})
                (dom/i {:className "ion-trash-a"})))))))))
