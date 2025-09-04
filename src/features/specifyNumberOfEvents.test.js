// src/features/specifyNumberOfEvents.test.js
import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 events are shown by default", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;

    given("the user opens the app", () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    when("the events are displayed", async () => {
      // Wait for async fetch to populate the list
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const items = within(EventListDOM).queryAllByRole("listitem");
        expect(items.length).toBeGreaterThan(0);
      });
    });

    then(/^(\d+) events should be shown by default$/, async (nStr) => {
      const expected = Number(nStr);

      // Assert the textbox shows "32"
      const textbox = screen.getByRole("textbox", {
        name: /number of events/i,
      });
      expect(textbox).toHaveValue(String(expected));

      // Assert the list shows 32 items
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const items = within(EventListDOM).queryAllByRole("listitem");
        expect(items.length).toBe(expected);
      });
    });
  });

  test("User can change the number of events displayed", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;

    given("the user has opened the app", () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    when(/^the user sets the number of events to (\d+)$/, async (nStr) => {
      const user = userEvent.setup();
      const textbox = screen.getByRole("textbox", {
        name: /number of events/i,
      });

      // Clear existing "32" and type the new number, e.g. "10"
      await user.clear(textbox);
      await user.type(textbox, nStr);
      // Optional immediate assertion of the input value
      expect(textbox).toHaveValue(nStr);
    });

    then(/^(\d+) events should be displayed$/, async (nStr) => {
      const expected = Number(nStr);
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const items = within(EventListDOM).queryAllByRole("listitem");
        expect(items.length).toBe(expected);
      });
    });
  });
});
