"use server";
import type {
  CollegeFormValues,
  EventSubmissionFormValues,
  IndividualFormValues,
} from "@/lib/forms-config";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { emitServerLog, flushOtelLogs } from "@/lib/otel-logger";

const WEBHOOK_URL = process.env.WEBHOOK_URL;

export async function submitFormData(
  name: "individual" | "community" | "event",
  data: IndividualFormValues | CollegeFormValues | EventSubmissionFormValues,
) {
  try {
    if (!WEBHOOK_URL || !process.env.WEBHOOK_SECRET_KEY)
      throw new Error("WEBHOOK_URL not set");
    // if (!doc) throw new Error("Doc not found!");
    // await doc.loadInfo();

    // const sheetIndex = name === "individual" ? 0 : name === "community" ? 1 : -1;
    // const sheet = doc.sheetsByIndex[sheetIndex];
    // if (!sheet) throw new Error("Invalid form name!");

    // await sheet.addRow({
    //   ...data,
    //   responded: "no",
    //   accepted: "no",
    //   roleClaimed: "no",
    // });

    if (name === "individual") {
      // payload = {
      //   content:
      //     "🙋 *New Individual Entry Added*\n\n" +
      //     `👤 *Name:* ${d.firstName} ${d.lastName}\n` +
      //     `📧 *Email:* ${d.email}\n` +
      //     `📱 *Phone:* ${d.phone}\n\n` +
      //     `🏫 *College:* ${d.college}\n` +
      //     `📅 *Year:* ${d.year}\n` +
      //     `✨ *Interests:* ${d.interests}\n` +
      //     `💡 *Motivation:* ${d.motivation}\n\n` +
      //     "──────────────────────────────",
      // };

      const res = await fetch(`${WEBHOOK_URL}new-applicant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Secret-Key": process.env.WEBHOOK_SECRET_KEY,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error(res);
        throw new Error("Error submitting to webhook");
      }
    } else if (name === "community") {
      // payload = {
      //   content:
      //     "🎉 *New Community Entry Added*\n\n" +
      //     `🏫 *College:* ${d.collegeName}\n` +
      //     `👥 *Community:* ${d.communityName}\n` +
      //     `🙋 *Representative:* ${d.repName} (${d.repPosition})\n` +
      //     `📧 *Rep Email:* ${d.repEmail}\n` +
      //     `📱 *Rep Phone:* ${d.repPhone}\n\n` +
      //     `👨‍🏫 *Faculty:* ${d.facultyName}\n` +
      //     `📧 *Faculty Email:* ${d.facultyEmail}\n\n` +
      //     `📊 *Community Size:* ${d.communitySize}\n` +
      //     `🎯 *Activities:* ${d.communityActivities}\n` +
      //     `💡 *Expectations:* ${d.expectations}\n\n` +
      //     "──────────────────────────────",
      // };

      const res = await fetch(`${WEBHOOK_URL}new-college-applicant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Secret-Key": process.env.WEBHOOK_SECRET_KEY,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error(res);
        throw new Error("Error submitting to webhook");
      }
    } else if (name === "event") {
      const res = await fetch(`${WEBHOOK_URL}new-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Secret-Key": process.env.WEBHOOK_SECRET_KEY,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error(res);
        throw new Error("Error submitting to webhook");
      }
    }

    emitServerLog({
      body: "Form submission webhook sent",
      severityNumber: SeverityNumber.INFO,
      attributes: {
        formType: name,
        success: true,
      },
    });
    await flushOtelLogs();

    return true;
  } catch (error) {
    console.error("Error submitting to Google Sheet:", error);
    emitServerLog({
      body: "Form submission failed",
      severityNumber: SeverityNumber.ERROR,
      attributes: {
        formType: name,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
    await flushOtelLogs();
    return false;
  }
}
