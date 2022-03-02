//requiring path and fs modules
const fs = require("fs");
const fileExtension = ".db";

const createDocument = (documentName: string) => {
  try {
    require(buildDocumentUrl(documentName));
  } catch (e: any) {
    if (e.message.includes("Cannot find module")) {
      console.log(
        `Error: Document ${documentName} does not exists. Try creating it first with db.createDocument()`
      );
      fs.writeFile(
        buildDocumentUrl(documentName),
        JSON.stringify([]),
        (error: any, file: string) => {
          if (error) {
            return console.log(
              "Error: Failed to create document " + documentName
            );
          }
        }
      );
    }
  }
};

const getDocument = (documentName: string) => {
  const url = buildDocumentUrl(documentName);
  let data = [];
  try {
    data = require(url);
  } catch (e: any) {
    if (e.message.includes("Cannot find module")) {
      console.log(
        `Error: Document ${documentName} does not exists. Try creating it first with db.createDocument()`
      );
    }
  }
  return new DocumentReference(documentName, data);
};

const buildDocumentUrl = (documentName: string) => {
  return __dirname + "/" + documentName + fileExtension + ".json";
};

export class DocumentReference {
  documentName: string;
  private data: any[];

  constructor(documentName: string, data: any[]) {
    this.documentName = documentName;
    this.data = data;
  }

  getOneById = (id: number | string) => {
    return this.data.find((record) => {
      record.id == id;
    });
  };

  getData = () => {
    return this.data;
  };

  getAllFilter = (condition: any) => {
    return this.data.filter(condition);
  };

  save = (record: any) => {
    this.data.push(record);
    this.setDocument(this.data);
  };

  private setDocument = (data: any[]) => {
    fs.writeFile(
      buildDocumentUrl(this.documentName),
      JSON.stringify(data),
      (error: any, file: string) => {
        if (error) {
          return console.log(
            "Error: Failed to set document " + this.documentName
          );
        }
      }
    );
  };
}

export default { createDocument, getDocument };
