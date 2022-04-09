# Created by santunioni at 4/8/22
Feature: # Users interacting with articles by favoriting them
  # Users should be able to favorite and unfavorite articles.

  Background:
    Given I log in

  Scenario: # I am included in the list of favoriters
    Given I can see an article is published
    When I favorite the article
    Then I can see myself in the list of favoriters

  Scenario: # I can unfavorite an article
    Given I favorited an article
    When I undo the favoriting
    Then I can see I am not in the favoriters list
