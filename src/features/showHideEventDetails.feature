Feature: Show/Hide Event Details
  As a user
  I want to expand or collapse events
  So that I can see event details only when I need them

  Scenario: An event element is collapsed by default
    Given the user opens the app
    When the list of events is displayed
    Then each event should be collapsed by default
    And the event details should not be visible

  Scenario: User can expand an event to see details
    Given the user sees a list of events
    When the user clicks on the "Show details" button of an event
    Then the event’s details should be visible

  Scenario: User can collapse an event to hide details
    Given an event is expanded with its details visible
    When the user clicks on the "Hide details" button
    Then the event’s details should be hidden again
