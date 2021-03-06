const email1 = "tripsTest1@globetrotte.com";
const password1 = "hunter2";

const email2 = "tripsTest2@globetrotte.com";
const password2 = "hunter3";

const tripName = "Test Trip";
const tripDescription =
  "This is a test trip. If you see this, it means " +
  "someone is testing in prod.";

let newTripURL: string;
describe("Trips", () => {
  it("create new trip", () => {
    cy.register(email1, password1);
    cy.contains("li", "Trip").trigger("mouseenter");
    cy.contains("li", "New").click();
    cy.url().should("include", "/trip/new");
    cy.get(".editTripName").type(tripName);
    cy.get(".editTripDescription").type(tripDescription);
    cy.get(".editCity").find(".editInput").click();
    cy.get(".editTripSingleCity").first().click();
    cy.get(".editTripDescription").click();
    cy.get(".day1").find(".removeDay").click();
    cy.get(".day1").should("not.exist");
    cy.get(".addDay").click();
    cy.get(".day1").should("exist");
    cy.get(".addDay").click();
    cy.get(".day2").should("exist");
    cy.get(".day1")
      .find(".place0")
      .find(".inputPlaceLabel")
      .type("SFO");
    cy.get(".day1")
      .find(".place0")
      .find(".inputPlaceLink")
      .type("https://goo.gl/maps/4j7jZ4Ekhx8aC8AF7");
    cy.get(".day1")
      .find(".place0")
      .find(".inputPlaceDesc")
      .type("San Francisco International Airport");
    cy.get(".saveEditTrip").click();
    cy.url().should("include", "/trip/view");
    cy.get(".tripPrivateAlertBar")
      .find(".el-alert__title")
      .should("contain.text", "Trip is private");
    cy.get(".tripPrivateAlertBar")
      .find(".el-alert__description")
      .should(
        "contain.text",
        "Only you can see this trip.",
      );
    cy.url().then((url) => {
      newTripURL = url;
    });
    cy.logout();
  });

  it("user 2 can't see private trip", () => {
    cy.register(email2, password2);
    cy.then(() => {
      return cy.visit(newTripURL);
    });
    cy.get(".el-notification__content").should(
      "contain.text",
      "Trip not found.",
    );
    cy.logout();
  });

  it("set trip to public", () => {
    cy.login(email1, password1);
    cy.then(() => {
      return cy.visit(newTripURL);
    });
    cy.get(".enableTripEdit").click();
    cy.get(".editTripPrivacy").find(".editInput").click();
    cy.get(".saveEditTrip").click();
    cy.get(".tripPrivateAlertBar").should("not.exist");
    cy.logout();
  });

  it("user 2 can see public trip", () => {
    cy.login(email2, password2);
    cy.then(() => {
      return cy.visit(newTripURL);
    });
    cy.get(".view_trip").contains("h2", tripName);
    cy.get(".view_trip").contains(
      ".tripDescription",
      tripDescription,
    );
    cy.get(".enableTripEdit").should("not.exist");
    cy.logout();
  });

  it("deletes trip", () => {
    cy.login(email1, password1);
    cy.then(() => {
      return cy.visit(newTripURL);
    });
    cy.get(".enableTripEdit").click();
    cy.get(".deleteTrip").click();
    cy.get(".el-notification__content").contains(
      "p",
      "Trip is successfully deleted!",
    );
    cy.get(".el-notification__title").contains(
      "h2",
      "Trip Deletion",
    );
    cy.url().should("include", "/");
    cy.logout();
  });

  it("cleanup", () => {
    cy.login(email1, password1);
    cy.deleteAccount();
    cy.login(email2, password2);
    cy.deleteAccount();
  });
});
