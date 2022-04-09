# Created by santunioni at 4/8/22
Feature: # The feed should show me published articles from authors I follow
  Background:
    Given I log in
    And I follow Costello

  Scenario: # I can confirm I follow an author
    Then I can see I am at Costello followers list

  Scenario: # I can confirm I unfollowed an author
    When I unfollow Costello
    Then I can see I am not at Costello followers list

  Scenario: # My feed contains only articles from authors I follow
    When Costello publishes an article
    Then I can see Costello's article in my feed

  Scenario: # I can only see published articles
    When Costello publishes an article
    When Costello unpublishes his article
    Then I can not see Costello's article in my feed

  Scenario: # Articles from authors I don't follow doesn't show in my feed
    When Costello publishes an article
    But I unfollow Costello
    Then I can not see Costello's article in my feed