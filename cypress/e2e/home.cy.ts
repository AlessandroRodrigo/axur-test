describe("Home", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.intercept("POST", "/crawl").as("crawlRequest");
    cy.intercept("GET", "/crawl/*").as("crawlResultRequest");
  });

  it("should create a new requisition", () => {
    cy.get("[role=new-requisition-input]").type("New Requisition");
    cy.get("[role=new-requisition-button]").click();

    cy.wait("@crawlRequest").then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.equal(200);
      }
    });

    cy.wait("@crawlResultRequest").then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.equal(200);
      }
    });

    cy.get("[role=toast]").should("be.visible");
    cy.get("[role=toast]").should("contain", "Solicitação criada com sucesso");
  });

  it("should remove a requisition", () => {
    cy.get("[role=new-requisition-input]").type("New Requisition");
    cy.get("[role=new-requisition-button]").click();

    cy.get("[role=remove-requisition]").first().click();

    cy.get("[role=toast]").should("be.visible");
    cy.get("[role=toast]").should(
      "contain",
      "Solicitação removida com sucesso"
    );
  });

  it("should show requisition details", () => {
    cy.get("[role=new-requisition-input]").type("New Requisition");
    cy.get("[role=new-requisition-button]").click();

    cy.wait(["@crawlRequest", "@crawlResultRequest"]);

    cy.get("[role=details-requisition]").first().click();

    cy.get("[role=side-modal-content]").should("be.visible");
  });
});
