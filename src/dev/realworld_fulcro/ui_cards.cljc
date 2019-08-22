(ns realworld-fulcro.ui-cards
  (:require [realworld-fulcro.ui :as ui]
            [nubank.workspaces.card-types.fulcro3 :as ct.fulcro]
            [nubank.workspaces.core :as ws]
            [com.fulcrologic.fulcro.components :as comp]))

(ws/defcard Login
  (ct.fulcro/fulcro-card
    {::ct.fulcro/root          ui/Login
     ::ct.fulcro/initial-state (comp/get-initial-state ui/Login)}))
