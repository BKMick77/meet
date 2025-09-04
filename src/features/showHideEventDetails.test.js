// src/features/showHideEventDetails.test.js
import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/showHideEventDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({
    given,
    when,
    then,
    and,
  }) => {
    let AppComponent;
    let AppDOM;
    let EventListDOM;
    let firstEventItem;

    given("the user opens the app", () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    when("the list of events is displayed", async () => {
      EventListDOM = AppDOM.querySelector("#event-list");

      // Wait for async fetch to populate events
      await waitFor(() => {
        const items = within(EventListDOM).queryAllByRole("listitem");
        expect(items.length).toBeGreaterThan(0);
      });

      firstEventItem = within(EventListDOM).getAllByRole("listitem")[0];
    });

    then("each event should be collapsed by default", () => {
      const showBtn = within(firstEventItem).getByRole("button", {
        name: /show details/i,
      });
      expect(showBtn).toBeInTheDocument();
      expect(showBtn).toHaveAttribute("aria-expanded", "false");
    });

    and("the event details should not be visible", () => {
      // Don’t require an accessible name for the region
      const detailsRegion = within(firstEventItem).queryByRole("region");
      expect(detailsRegion).not.toBeInTheDocument();
      // (equivalently) expect(firstEventItem.querySelector(".event__details")).toBeNull();
    });
  });

  test("User can expand an event to see details", ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    let EventListDOM;
    let firstEventItem;

    given("the user sees a list of events", async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const items = within(EventListDOM).queryAllByRole("listitem");
        expect(items.length).toBeGreaterThan(0);
      });

      firstEventItem = within(EventListDOM).getAllByRole("listitem")[0];
    });

    when(
      /^the user clicks on the "(.*)" button of an event$/,
      async (btnText) => {
        const user = userEvent.setup();
        const showBtn = within(firstEventItem).getByRole("button", {
          name: new RegExp(btnText, "i"),
        });
        await user.click(showBtn);
      },
    );

    then("the event’s details should be visible", () => {
      // Find the region without requiring a name
      const detailsRegion = within(firstEventItem).getByRole("region");
      expect(detailsRegion).toBeInTheDocument();

      const hideBtn = within(firstEventItem).getByRole("button", {
        name: /hide details/i,
      });
      expect(hideBtn).toBeInTheDocument();
      expect(hideBtn).toHaveAttribute("aria-expanded", "true");
    });
  });

  test("User can collapse an event to hide details", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let EventListDOM;
    let firstEventItem;

    given("an event is expanded with its details visible", async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const items = within(EventListDOM).queryAllByRole("listitem");
        expect(items.length).toBeGreaterThan(0);
      });

      firstEventItem = within(EventListDOM).getAllByRole("listitem")[0];

      // Expand first
      const user = userEvent.setup();
      const showBtn = within(firstEventItem).getByRole("button", {
        name: /show details/i,
      });
      await user.click(showBtn);

      // Sanity: details are visible
      expect(within(firstEventItem).getByRole("region")).toBeInTheDocument();
    });

    when(/^the user clicks on the "(.*)" button$/, async (btnText) => {
      const user = userEvent.setup();
      const hideBtn = within(firstEventItem).getByRole("button", {
        name: new RegExp(btnText, "i"),
      });
      await user.click(hideBtn);
    });

    then("the event’s details should be hidden again", () => {
      expect(
        within(firstEventItem).queryByRole("region"),
      ).not.toBeInTheDocument();

      const showBtn = within(firstEventItem).getByRole("button", {
        name: /show details/i,
      });
      expect(showBtn).toBeInTheDocument();
      expect(showBtn).toHaveAttribute("aria-expanded", "false");
    });
  });
});
