let data = [];
function crawlFromOne(one) {
  cy.get(one).scrollIntoView().click({ force: true });
  cy.wait(8000);
  cy.contains("BẤM ĐỂ HIỆN SỐ").click({ force: true });
  cy.wait(10000);
  cy.get('p[itemprop = "description"]')
    .invoke("text")
    .then((info) => {
      cy.get(
        "#app > div:nth-child(2) > main > article > div.container._1OmYs5J4aYBAERDzg-6W8a > div.row.no-gutter-sm-down > div.col-md-4.visible-md.visible-lg.visible-xl._1E45evYilkAmIgtle77ZQk > div > div:nth-child(2) > div > div._1NPt6YwpCxTsRRk89MWcQe > div:nth-child(1) > div > div > div > span"
      )
        .scrollIntoView()
        .invoke("text")
        .then((number) => {
          cy.get(
            "#app > div:nth-child(2) > main > article > div.container._1OmYs5J4aYBAERDzg-6W8a > div.row.no-gutter-sm-down > div.col-md-4.visible-md.visible-lg.visible-xl._1E45evYilkAmIgtle77ZQk > div > div:nth-child(2) > div > div.sc-kUaPvJ.jXLwmK > a > div.sc-fONwsr.eoImWH > div.sc-bmyXtO.edXsBf > div > b"
          ).as("name");
          cy.get("@name")
            .invoke("text")
            .then((name) => {
              if (isLegit({ name, number, info })) {
                data.push({
                  name: name,
                  number: number,
                  info: info,
                });
              }
            });
        });
    });
  cy.go(-1);
  cy.reload();
}
function isLegit(userData) {
  data.forEach((elem) => {
    if (elem.name == userData.name) {
      return false;
    }
  });
  return true;
}
function getAll(i) {
  cy.wait(3000);
  cy.get("._3qr34_XMQROJG0YnuXtt9c div div h3").then((list) => {
    crawlFromOne(list[i]);
  });
}
describe("main", () => {
  it("main", () => {
    cy.visit(
      "https://nha.chotot.com/ha-noi/quan-cau-giay/mua-ban-bat-dong-san?f=p&sp=0&st=s"
    ).then(() => {
      for (let i = 0; i < 22; i++) {
        getAll(i);
        cy.log(data);
        cy.readFile("C:\\Users\\ADMIN\\Desktop\\result.txt").then(
          (fileContent) => {
            fileContent = fileContent.concat(data);
            cy.writeFile("C:\\Users\\ADMIN\\Desktop\\result.txt", data);
          }
        );
      }
    });
  });
});
