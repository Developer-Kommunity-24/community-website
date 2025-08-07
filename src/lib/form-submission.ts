"use server";
import type { CollegeFormValues, IndividualFormValues } from "./forms-config";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID ?? "",
  serviceAccountAuth,
);

export async function submitFormData(
  name: "individual" | "community",
  data: IndividualFormValues | CollegeFormValues,
) {
  try {
    if (!doc) throw new Error("Invalid form name");
    await doc.loadInfo();
    const sheet =
      doc.sheetsByIndex[
        name === "individual" ? 0 : name === "community" ? 1 : -1
      ];
    if (!sheet) throw new Error("Sheet not found or invalid name");
    await sheet.addRow(data);
    return true;
  } catch (error) {
    console.error("Error submitting to Google Sheet:", error);
    return false;
  }
}
