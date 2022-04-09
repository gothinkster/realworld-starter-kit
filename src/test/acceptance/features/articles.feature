# Created by santunioni at 4/8/22
Feature: # Users should be able to edit and delete articles.
  # The article list is global and should return all articles, filtered by tags, authors and who favorited them.
  # However, unpublished articles should be acessible only to the owner.

  Scenario: # I can delete my articles
    Given I log in
    And I publish an article
    When I delete the article
    Then I can not see the article in my list
    And the article also doesn't apper in my feed

  Scenario: # I can update my published articles
    Given I log in
    Given I publish an article
    When I edit the article
    Then I can see the published version is the one I last wrote

  Scenario: # The global list contains all articles
    Given Costello publishes an article
    Then I can see Costello's article in the global list

  Scenario: # I can filter the global list by tag
    Given Costello publishes an article about physics and programming
    Then I can find Costello's article when filtering tags by physics

  Scenario: # I can filter the global list by tag
    Given Costello publishes an article about physics and programming
    Then I can not find Costello's article when filtering tags by drinks

  Scenario: # I can filter the global list by author
    Given Costello publishes an article about physics and programming
    Then I can not find Costello's article when filtering author by Abbot
