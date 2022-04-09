# Created by santunioni at 4/8/22
Feature: # I can comment on an article

  Background:
    Given I log in
    And Costello publishes an article

  Scenario: # I can comment on articles
    When I comment on Costello's article
    Then I can see my comment in Costello's article comments session

  Scenario: # I can see other people comments on article
    When Abbot comment on Costello's article
    Then I can see Costello's article has a comment from Abbot