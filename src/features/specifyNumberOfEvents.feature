Feature: Specify Number of Events
  As a user
  I want to set the number of events displayed
  So that I can control how many events I see at once

  Scenario: When user hasn’t specified a number, 32 events are shown by default
    Given the user opens the app
    When the events are displayed
    Then 32 events should be shown by default

  Scenario: User can change the number of events displayed
    Given the user has opened the app
    When the user sets the number of events to 10
    Then 10 events should be displayed
