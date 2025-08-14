## Meetup App - Gherkin Scenarios

```gherkin
Feature: Meetup App Core Features

  Scenario: Toggle event details
    Given the events list is displayed
    When the user clicks "Show details" on an event
    Then the event’s details are displayed

  Scenario: Set number of events to display
    Given the events list is displayed
    When the user sets the number of events to 10
    Then exactly 10 events are shown

  Scenario: View cached events offline
    Given the device is offline
    When the user opens the events list
    Then previously cached events are displayed

  Scenario: Install app shortcut
    Given the app meets PWA installation criteria
    When the user selects "Add to Home Screen"
    Then the app shortcut appears on the home screen

  Scenario: View events-by-city chart
    Given events are loaded
    When the user opens the analytics view
    Then a chart showing events per city is displayed
```
