"use server";

import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import type { CollegeFormValues, IndividualFormValues } from "./forms-config";

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const WEBHOOK_URL = process.env.WEBHOOK_URL;
if (!WEBHOOK_URL) throw new Error("WEBHOOK_URL not set");

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID ?? "",
  serviceAccountAuth,
);

export async function submitFormData(
  name: "individual" | "community",
  data: IndividualFormValues | CollegeFormValues,
) {
  try {
    if (!doc) throw new Error("Doc not found!");
    await doc.loadInfo();

    const sheetIndex = name === "individual" ? 0 : 1;
    const sheet = doc.sheetsByIndex[sheetIndex];
    if (!sheet) throw new Error("Invalid form name!");

    await sheet.addRow({
      ...data,
      responded: "no",
      accepted: "no",
      roleClaimed: "no",
    });

    let payload: {
      content: string;
    };

    if (name === "individual") {
      const d = data as IndividualFormValues;
      payload = {
        content:
          "🙋 *New Individual Entry Added*\n\n" +
          `👤 *Name:* ${d.firstName} ${d.lastName}\n` +
          `📧 *Email:* ${d.email}\n` +
          `📱 *Phone:* ${d.phone}\n\n` +
          `🏫 *College:* ${d.college}\n` +
          `📅 *Year:* ${d.year}\n` +
          `✨ *Interests:* ${d.interests}\n` +
          `💡 *Motivation:* ${d.motivation}\n\n` +
          "──────────────────────────────",
      };
    } else {
      const d = data as CollegeFormValues;
      payload = {
        content:
          "🎉 *New Community Entry Added*\n\n" +
          `🏫 *College:* ${d.collegeName}\n` +
          `👥 *Community:* ${d.communityName}\n` +
          `🙋 *Representative:* ${d.repName} (${d.repPosition})\n` +
          `📧 *Rep Email:* ${d.repEmail}\n` +
          `📱 *Rep Phone:* ${d.repPhone}\n\n` +
          `👨‍🏫 *Faculty:* ${d.facultyName}\n` +
          `📧 *Faculty Email:* ${d.facultyEmail}\n\n` +
          `📊 *Community Size:* ${d.communitySize}\n` +
          `🎯 *Activities:* ${d.communityActivities}\n` +
          `💡 *Expectations:* ${d.expectations}\n\n` +
          "──────────────────────────────",
      };
    }

    if (WEBHOOK_URL) {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    return true;
  } catch (error) {
    console.error("Error submitting to Google Sheet:", error);
    return false;
  }
}
