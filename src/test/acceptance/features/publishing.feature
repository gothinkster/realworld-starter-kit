# Created by santunioni at 4/8/22
Feature: # Articles can be published and unpublished
  # Users should be able to write articles and not publish them. They can use this as an editor, which they
  # can save their article current state, deciding to publish them only after finishing and polishing.

  Background:
    Given I log in

  Scenario: # My article is only public when I decide to publish it
    When I create an article
    Then my article can not be found by other users

  Scenario: # My article shows in my feed after I publish it
    Given I create an article
    When I publish the article
    Then my article appears in the global list

  Scenario: # I can decide to unpublish my article and it shoudn't appear in my feed
    Given I have a published article
    When I unpublish the article
    Then I should see my article in my private list
    But my article can not be found by other users