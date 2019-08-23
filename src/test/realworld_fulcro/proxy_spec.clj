(ns realworld-fulcro.proxy-spec
  (:require
    [clojure.test :refer :all]
    [fulcro-spec.core :refer [specification behavior assertions provided component when-mocking]]
    [clojure.test :refer :all]))

;; source file
(defn my-function [x y] (launch-rockets!))
;; spec file
(specification "Thing"
               (behavior "Does something"
                         (when-mocking
                           (my-function arg1 arg2)
                           => (do (assertions
                                    arg1 => 3
                                    arg2 => 5)
                                  true)
                           ;;actual test
                           (assertions
                             (my-function 3 5) => true))))
