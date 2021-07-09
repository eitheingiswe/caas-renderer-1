import { Document } from "@govtechsg/decentralized-renderer-react-components";

export interface Rating {
  name: string;
  limitations?: string;
  expiryDate: string;
  AFEValidityStartDate: string;
  AFEexpiryDate: string;
}

export interface CustomTemplateCertificate extends Document {
  id: string;
  name: string;
  issuanceDate: string;
  recipient: {
    name: string;
    email?: string;
    dob: string;
    photo: string;
  };
  ratings: Rating[];
}

export const customTemplateCertificate: CustomTemplateCertificate = {
  $template: {
    name: "UALP",
    type: "EMBEDDED_RENDERER",
    url: "https://www.caasdomain.com"
  },
  id: "U0034577K",
  name: "Unmanned Aircraft Pilot Licence",
  issuanceDate: "2019-11-06T00:00:00.000Z",
  recipient: {
    name: "Adam Marvek",
    dob: "1990-01-01T00:00:00.000Z",
    photo:
      "data:image/png;base64,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"
  },
  ratings: [
    {
      name: "Class A (Aeroplane)",
      expiryDate: "2020-05-03T00:00:00.000Z",  
      limitations: "Limited to UA up to 7kg only",
      AFEValidityStartDate: "",
      AFEexpiryDate: "",
    },
    {
      "name": "Class A (Aeroplane)",
      "expiryDate": "2021-08-03T00:00:00.000Z",
      "limitations": "Limited to UA up to 7kg only",
      "AFEValidityStartDate": "",
      "AFEexpiryDate": ""
    },
    {
      "name": "Class A (Aeroplane)",
      "expiryDate": "2025-05-03T00:00:00.000Z",
      "limitations": "Limited to UA up to 7kg only",
      "AFEValidityStartDate": "",
      "AFEexpiryDate": ""
    },
    {
      name: "Class A (Rotocraft)",
      expiryDate: "2023-09-21T00:00:00.000Z",
      limitations: "Limited to multi-rotor only",
      AFEValidityStartDate: "2020-08-20T00:00:00.000Z",
      AFEexpiryDate: "2021-09-30T00:00:00.000Z",
    }
  ]
};
