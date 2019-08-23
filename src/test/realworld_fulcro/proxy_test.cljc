(ns realworld-fulcro.proxy-test
  (:require #?@(:cljs    [[nubank.workspaces.core :refer [deftest]]
                          [clojure.test :refer [is testing]]]
                :default [[clojure.test :refer [deftest is testing]]])
            [realworld-fulcro.proxy :as proxy]))

(deftest qualify
  (is (= {:foo/bar 42}
         (proxy/qualify {:bar 42} :foo))))
