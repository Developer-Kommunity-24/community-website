#!/usr/bin/env node

/**
 * PostHog Monthly Analytics Report Generator
 * Fetches analytics data from PostHog API for the last 30 days and sends via email
 *
 * Required environment variables:
 * - POSTHOG_PROJECT_API_KEY: PostHog API key (from Settings > Project API Key)
 * - POSTHOG_PROJECT_ID: PostHog project ID (from URL)
 * - NEXT_PUBLIC_POSTHOG_HOST: PostHog host URL
 * - EMAIL_USER: Gmail address to send from
 * - EMAIL_PASSWORD: Gmail app password (not your regular password)
 * - RECIPIENT_EMAIL: Email address to send the report to (default: dk24consortium@gmail.com)
 */

// Load environment variables from .env.local
require("dotenv").config({ path: ".env.local" });

const https = require("node:https");
const http = require("node:http");
const nodemailer = require("nodemailer");

// Configuration
const POSTHOG_API_KEY = process.env.POSTHOG_PROJECT_API_KEY;
const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY; // For Query API
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const RECIPIENT_EMAIL =
  process.env.RECIPIENT_EMAIL || "dk24consortium@gmail.com";

const REQUIRED_ENV_VARS = {
  POSTHOG_PROJECT_API_KEY: POSTHOG_API_KEY,
  POSTHOG_PERSONAL_API_KEY: POSTHOG_PERSONAL_API_KEY,
  POSTHOG_PROJECT_ID: POSTHOG_PROJECT_ID,
  EMAIL_USER: EMAIL_USER,
  EMAIL_PASSWORD: EMAIL_PASSWORD,
};

const missingEnvVars = Object.entries(REQUIRED_ENV_VARS)
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missingEnvVars.length > 0) {
  console.error(
    `Error: Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
  process.exit(1);
}

/**
 * Get event count using PostHog Query API
 */
function getEventCount(eventName, dateFrom) {
  return new Promise((resolve) => {
    // If no personal API key, return 0
    if (!POSTHOG_PERSONAL_API_KEY) {
      resolve(0);
      return;
    }

    const url = new URL(
      `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`,
    );
    const protocol = url.protocol === "https:" ? https : http;

    const query = {
      kind: "EventsQuery",
      select: ["*"],
      where: [`event = '${eventName}'`],
      after: dateFrom,
    };

    const postData = JSON.stringify({ query });

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = protocol.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          try {
            const parsed = JSON.parse(data);
            const count = parsed.results?.length || 0;
            resolve(count);
          } catch (e) {
            console.error("Parse error:", e);
            resolve(0);
          }
        } else {
          console.error(`Query API Error ${res.statusCode}:`, data);
          resolve(0);
        }
      });
    });

    req.on("error", (err) => {
      console.error("Request error:", err);
      resolve(0);
    });
    req.write(postData);
    req.end();
  });
}

/**
 * Get error details using PostHog Query API
 */
function getErrorDetails(dateFrom) {
  return new Promise((resolve) => {
    // If no personal API key, return empty array
    if (!POSTHOG_PERSONAL_API_KEY) {
      resolve([]);
      return;
    }

    const url = new URL(
      `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`,
    );
    const protocol = url.protocol === "https:" ? https : http;

    const query = {
      kind: "EventsQuery",
      select: ["*", "properties", "timestamp"],
      where: [`event = 'error_occurred'`],
      after: dateFrom,
      orderBy: ["timestamp DESC"],
    };

    const postData = JSON.stringify({ query });

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = protocol.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          try {
            const parsed = JSON.parse(data);
            const errors = parsed.results || [];

            // Extract error details
            const errorDetails = errors.map((err) => {
              // PostHog returns an array with [object, json_string, timestamp] format
              if (Array.isArray(err)) {
                const props =
                  typeof err[0] === "string"
                    ? JSON.parse(err[0])
                    : err[0].properties || {};
                return {
                  message:
                    props.error_message || props.message || "Unknown error",
                  url: props.$current_url || props.url || "Unknown page",
                  timestamp: err[2] || err[0].timestamp || "Unknown time",
                  component: props.component || null,
                  action: props.action || null,
                  stack: props.error_stack || null,
                };
              }
              // Fallback to object format
              return {
                message:
                  err.properties?.error_message ||
                  err.properties?.message ||
                  "Unknown error",
                url:
                  err.properties?.$current_url ||
                  err.properties?.url ||
                  "Unknown page",
                timestamp: err.timestamp || "Unknown time",
                component: err.properties?.component || null,
                action: err.properties?.action || null,
                stack: err.properties?.error_stack || null,
              };
            });

            resolve(errorDetails);
          } catch (e) {
            console.error("Parse error:", e);
            resolve([]);
          }
        } else {
          console.error(`Query API Error ${res.statusCode}:`, data);
          resolve([]);
        }
      });
    });

    req.on("error", (err) => {
      console.error("Request error:", err);
      resolve([]);
    });
    req.write(postData);
    req.end();
  });
}

/**
 * Get analytics data for the last 30 days
 */
async function getMonthlyAnalytics() {
  try {
    console.log("Fetching monthly analytics from PostHog...\n");

    const dateFrom = "-30d";

    // Fetch event counts
    console.log("Querying page views...");
    const pageViewCount = await getEventCount("$pageview", dateFrom);

    console.log("Querying form submissions...");
    const formSubmissionCount = await getEventCount("form_submitted", dateFrom);

    console.log("Querying errors...");
    const errorDetails = await getErrorDetails(dateFrom);
    const errorCount = errorDetails.length;

    console.log("Querying interactions...");
    const buttonClickCount = await getEventCount("$autocapture", dateFrom);

    // Calendar-specific analytics
    console.log("Querying calendar analytics...");
    const calendarPageViews = await getEventCount(
      "calendar_page_view",
      dateFrom,
    );
    const calendarMonthChanges = await getEventCount(
      "calendar_month_changed",
      dateFrom,
    );
    const calendarEventClicks = await getEventCount(
      "calendar_event_clicked",
      dateFrom,
    );
    const calendarViewChanges = await getEventCount(
      "calendar_view_changed",
      dateFrom,
    );
    const calendarDownloads = await getEventCount(
      "calendar_downloaded",
      dateFrom,
    );

    // Showcase-specific analytics
    console.log("Querying showcase analytics...");
    const showcasePageViews = await getEventCount(
      "showcase_page_view",
      dateFrom,
    );
    const showcaseEventViewed = await getEventCount(
      "showcase_event_viewed",
      dateFrom,
    );
    const showcaseEventClicked = await getEventCount(
      "showcase_event_clicked",
      dateFrom,
    );
    const showcaseCTAClicks = await getEventCount(
      "showcase_cta_clicked",
      dateFrom,
    );

    // Calculate metrics
    const daysCount = 30;
    const estimatedUniqueVisitors = Math.max(1, Math.ceil(pageViewCount / 4)); // Estimate: avg 4 pages per visitor

    const analytics = {
      pageViews: pageViewCount,
      uniqueVisitors: estimatedUniqueVisitors,
      formSubmissions: formSubmissionCount,
      errors: errorCount,
      errorDetails: errorDetails,
      buttonClicks: buttonClickCount,
      conversionRate:
        pageViewCount > 0
          ? ((formSubmissionCount / pageViewCount) * 100).toFixed(2)
          : 0,
      engagementRate:
        pageViewCount > 0
          ? ((buttonClickCount / pageViewCount) * 100).toFixed(2)
          : 0,
      // Calendar engagement metrics
      calendar: {
        pageViews: calendarPageViews,
        monthChanges: calendarMonthChanges,
        eventClicks: calendarEventClicks,
        viewChanges: calendarViewChanges,
        downloads: calendarDownloads,
        engagementRate:
          calendarPageViews > 0
            ? (
                ((calendarEventClicks +
                  calendarMonthChanges +
                  calendarViewChanges) /
                  calendarPageViews) *
                100
              ).toFixed(2)
            : 0,
      },
      // Showcase engagement metrics
      showcase: {
        pageViews: showcasePageViews,
        eventViewed: showcaseEventViewed,
        eventClicked: showcaseEventClicked,
        ctaClicks: showcaseCTAClicks,
        clickThroughRate:
          showcaseEventViewed > 0
            ? ((showcaseEventClicked / showcaseEventViewed) * 100).toFixed(2)
            : 0,
      },
      dailyAverage: {
        pageViews: Math.round(pageViewCount / daysCount),
        uniqueVisitors: Math.round(estimatedUniqueVisitors / daysCount),
        formSubmissions: Math.round(formSubmissionCount / daysCount),
      },
      monthStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      monthEnd: new Date().toISOString().split("T")[0],
    };

    console.log("Monthly analytics fetched successfully.");

    return analytics;
  } catch (error) {
    console.error("Error fetching monthly analytics:", error);
    throw error;
  }
}

/**
 * Generate HTML email report
 */
function generateEmailHTML(analytics) {
  const totalPageViews = analytics.pageViews || 0;
  const calendarPageViews = analytics.calendar?.pageViews || 0;
  const showcasePageViews = analytics.showcase?.pageViews || 0;

  const calendarShare =
    totalPageViews > 0
      ? ((calendarPageViews / totalPageViews) * 100).toFixed(1)
      : "0.0";
  const showcaseShare =
    totalPageViews > 0
      ? ((showcasePageViews / totalPageViews) * 100).toFixed(1)
      : "0.0";

  const calendarTotalInteractions =
    (analytics.calendar?.eventClicks || 0) +
    (analytics.calendar?.monthChanges || 0) +
    (analytics.calendar?.viewChanges || 0) +
    (analytics.calendar?.downloads || 0);

  const showcaseTotalInteractions =
    (analytics.showcase?.eventViewed || 0) +
    (analytics.showcase?.eventClicked || 0) +
    (analytics.showcase?.ctaClicks || 0);

  return `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>DK24 Monthly Analytics Report</title>
	<style>
		* {
			box-sizing: border-box;
		}
		body { 
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
			line-height: 1.6; 
			color: #0a0a0a; 
			margin: 0;
			padding: 0;
			background-color: #fafafa;
		}
		.container { 
			max-width: 600px; 
			margin: 0 auto; 
			padding: 20px; 
		}
		.logo-section {
			text-align: center;
			padding: 30px 20px 20px;
			background: #0E0E0E;
			border-radius: 10px 10px 0 0;
		}
		.logo-section h1 {
			color: #ffffff;
			font-size: 2.5em;
			font-weight: 700;
			margin: 0;
			letter-spacing: -0.5px;
		}
		.logo-section .dk24 {
			background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}
		.header { 
			background: #0E0E0E;
			color: white; 
			padding: 20px 30px 40px; 
			border-radius: 0 0 10px 10px;
			text-align: center; 
			margin-bottom: 20px;
			border-top: 3px solid #22c55e;
		}
		.header p {
			margin: 10px 0 0 0;
			opacity: 0.8;
			font-size: 1em;
			color: #e5e5e5;
		}
		.tagline {
			font-size: 0.95em;
			font-style: italic;
			color: #a3a3a3;
			margin-top: 5px;
		}
		.metric { 
			background: white; 
			padding: 25px; 
			margin: 15px 0; 
			border-radius: 10px; 
			border-left: 4px solid #22c55e; 
			box-shadow: 0 1px 3px rgba(0,0,0,0.05);
			border: 1px solid #f0f0f0;
		}
		.metric-value { 
			font-size: 2.5em; 
			font-weight: 700; 
			color: #0a0a0a; 
			margin: 10px 0;
		}
		.metric-label { 
			color: #737373; 
			font-size: 0.85em; 
			text-transform: uppercase; 
			letter-spacing: 1px;
			font-weight: 600;
		}
		.metric-sub { 
			color: #a3a3a3; 
			font-size: 0.85em; 
			margin-top: 8px; 
		}
		.grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 15px;
			margin: 15px 0;
		}
		.mini-metric {
			background: white;
			padding: 20px;
			border-radius: 10px;
			text-align: center;
			box-shadow: 0 1px 3px rgba(0,0,0,0.05);
			border: 1px solid #f0f0f0;
		}
		.mini-metric-value {
			font-size: 1.8em;
			font-weight: 700;
			color: #22c55e;
		}
		.mini-metric-label {
			color: #737373;
			font-size: 0.75em;
			text-transform: uppercase;
			margin-top: 5px;
			letter-spacing: 0.5px;
		}
		.footer { 
			text-align: center; 
			margin-top: 30px; 
			color: #737373; 
			font-size: 0.85em; 
			padding: 20px;
			background: white;
			border-radius: 10px;
		}
		.footer a {
			color: #22c55e;
			text-decoration: none;
			font-weight: 600;
		}
		.footer a:hover {
			text-decoration: underline;
		}
		.alert { 
			background: #fef2f2; 
			padding: 15px 20px; 
			border-radius: 10px; 
			margin: 15px 0; 
			border-left: 4px solid #ef4444; 
		}
		.success { 
			background: #f0fdf4; 
			padding: 15px 20px; 
			border-radius: 10px; 
			margin: 15px 0; 
			border-left: 4px solid #22c55e; 
		}
		.info {
			background: #eff6ff;
			padding: 15px 20px;
			border-radius: 10px;
			margin: 15px 0;
			border-left: 4px solid #3b82f6;
		}
		hr {
			border: none;
			border-top: 1px solid #e5e5e5;
			margin: 20px 0;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="logo-section">
			<h1><span class="dk24">DK24</span></h1>
		</div>
		<div class="header">
			<h2 style="margin: 0; font-size: 1.5em; font-weight: 600;">Monthly Analytics Report</h2>
			<p>${analytics.monthStart} to ${analytics.monthEnd}</p>
			<p class="tagline">Connecting college tech communities to learn and build together</p>
		</div>

		<div class="metric">
			<div class="metric-label">Total Unique Visitors</div>
			<div class="metric-value">${analytics.uniqueVisitors.toLocaleString()}</div>
			<div class="metric-sub">Daily Average: ${analytics.dailyAverage.uniqueVisitors.toLocaleString()} unique visitors</div>
		</div>

		<div class="metric">
			<div class="metric-label">Total Page Views</div>
			<div class="metric-value">${analytics.pageViews.toLocaleString()}</div>
			<div class="metric-sub">Daily Average: ${analytics.dailyAverage.pageViews.toLocaleString()} views</div>
		</div>

		<div class="metric">
			<div class="metric-label">Form Submissions</div>
			<div class="metric-value">${analytics.formSubmissions.toLocaleString()}</div>
			<div class="metric-sub">Daily Average: ${analytics.dailyAverage.formSubmissions.toLocaleString()} submissions</div>
		</div>

		${
      parseFloat(analytics.conversionRate) > 0 ||
      parseFloat(analytics.engagementRate) > 0
        ? `
		<div class="grid">
			${
        parseFloat(analytics.conversionRate) > 0
          ? `
			<div class="mini-metric">
				<div class="mini-metric-value">${analytics.conversionRate}%</div>
				<div class="mini-metric-label">Conversion Rate</div>
			</div>
			`
          : ""
      }
			${
        parseFloat(analytics.engagementRate) > 0
          ? `
			<div class="mini-metric">
				<div class="mini-metric-value">${analytics.engagementRate}%</div>
				<div class="mini-metric-label">Engagement Rate</div>
			</div>
			`
          : ""
      }
		</div>
		`
        : ""
    }

		<div class="metric">
			<div class="metric-label">User Interactions</div>
			<div class="metric-value">${analytics.buttonClicks.toLocaleString()}</div>
			<div class="metric-sub">Button clicks and other interactions</div>
		</div>

		<hr>
		<h3 style="margin: 30px 0 15px 0; color: #0a0a0a; font-size: 1.3em;">📊 Section Performance Snapshot</h3>
		<div class="grid">
			<div class="mini-metric">
				<div class="mini-metric-value">${calendarShare}%</div>
				<div class="mini-metric-label">Calendar Traffic Share</div>
			</div>
			<div class="mini-metric">
				<div class="mini-metric-value">${showcaseShare}%</div>
				<div class="mini-metric-label">Showcase Traffic Share</div>
			</div>
		</div>
		<div class="grid">
			<div class="mini-metric">
				<div class="mini-metric-value">${calendarTotalInteractions.toLocaleString()}</div>
				<div class="mini-metric-label">Calendar Interactions</div>
			</div>
			<div class="mini-metric">
				<div class="mini-metric-value">${showcaseTotalInteractions.toLocaleString()}</div>
				<div class="mini-metric-label">Showcase Interactions</div>
			</div>
		</div>

		${
      analytics.formSubmissions > 50
        ? `
		<div class="success">
			<strong>Outstanding Month!</strong> ${analytics.formSubmissions} new community members joined this month. Keep building together!
		</div>
		`
        : analytics.formSubmissions > 20
          ? `
		<div class="info">
			<strong>Good Progress!</strong> ${analytics.formSubmissions} new members joined this month.
		</div>
		`
          : ""
    }

		${
      analytics.errors > 0
        ? `
		<div class="alert">
			<strong>Attention Required:</strong> ${analytics.errors} error${analytics.errors > 1 ? "s" : ""} detected this month.
			${
        analytics.errorDetails && analytics.errorDetails.length > 0
          ? `
			<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #fecaca;">
				${(() => {
          // Group errors by message
          const errorGroups = analytics.errorDetails.reduce((acc, error) => {
            const key = error.message;
            if (!acc[key]) {
              acc[key] = { count: 0, pages: new Set(), message: error.message };
            }
            acc[key].count++;
            acc[key].pages.add(error.url);
            return acc;
          }, {});

          // Convert to array and sort by count
          const sortedErrors = Object.values(errorGroups).sort(
            (a, b) => b.count - a.count,
          );

          return sortedErrors
            .map(
              (errorGroup, index) => `
						<div style="margin-bottom: ${index < sortedErrors.length - 1 ? "12px" : "0"}; padding-bottom: ${index < sortedErrors.length - 1 ? "12px" : "0"}; ${index < sortedErrors.length - 1 ? "border-bottom: 1px solid #fee2e2;" : ""}">
							<p style="margin: 0; font-weight: 600; color: #991b1b;">
								${errorGroup.message} <span style="background: #fecaca; padding: 2px 8px; border-radius: 12px; font-size: 0.85em; font-weight: 700;">${errorGroup.count}×</span>
							</p>
							<p style="margin: 5px 0 0 0; font-size: 0.8em; color: #b91c1c;">
								${errorGroup.pages.size === 1 ? "Page:" : "Pages:"} ${Array.from(
                  errorGroup.pages,
                )
                  .map((page) => {
                    const path =
                      page.replace(/^https?:\/\/[^/]+/, "").split("?")[0] ||
                      "/";
                    return path;
                  })
                  .join(", ")}
							</p>
						</div>
					`,
            )
            .join("");
        })()}
			</div>
			`
          : ""
      }
			<p style="margin: 15px 0 0 0; font-size: 0.85em;">
				<a href="${POSTHOG_HOST}/project/${POSTHOG_PROJECT_ID}/events" style="color: #ef4444; font-weight: 600;">View in PostHog Dashboard →</a>
			</p>
		</div>
		`
        : `
		<div class="success">
			<strong>No Errors Detected!</strong> The website ran smoothly this month.
		</div>
		`
    }

		<hr>
		<h3 style="margin: 30px 0 15px 0; color: #0a0a0a; font-size: 1.3em;">📅 Calendar Engagement</h3>
		
		<div class="metric">
			<div class="metric-label">Calendar Page Views</div>
			<div class="metric-value">${calendarPageViews.toLocaleString()}</div>
			<div class="metric-sub">${calendarShare}% of total pageviews</div>
		</div>

		<div class="grid">
			<div class="mini-metric">
				<div class="mini-metric-value">${(analytics.calendar?.eventClicks || 0).toLocaleString()}</div>
				<div class="mini-metric-label">Event Clicks</div>
			</div>
			<div class="mini-metric">
				<div class="mini-metric-value">${(analytics.calendar?.monthChanges || 0).toLocaleString()}</div>
				<div class="mini-metric-label">Month Navigations</div>
			</div>
		</div>

		<div class="grid">
			<div class="mini-metric">
				<div class="mini-metric-value">${(analytics.calendar?.downloads || 0).toLocaleString()}</div>
				<div class="mini-metric-label">ICS Downloads</div>
			</div>
			<div class="mini-metric">
				<div class="mini-metric-value">${analytics.calendar?.engagementRate || "0.00"}%</div>
				<div class="mini-metric-label">Engagement Rate</div>
			</div>
		</div>

		<hr>
		<h3 style="margin: 30px 0 15px 0; color: #0a0a0a; font-size: 1.3em;">🎯 Showcase Page Engagement</h3>
		
		<div class="metric">
			<div class="metric-label">Showcase Page Views</div>
			<div class="metric-value">${showcasePageViews.toLocaleString()}</div>
			<div class="metric-sub">${showcaseShare}% of total pageviews</div>
		</div>

		<div class="grid">
			<div class="mini-metric">
				<div class="mini-metric-value">${(analytics.showcase?.eventViewed || 0).toLocaleString()}</div>
				<div class="mini-metric-label">Event Cards Viewed</div>
			</div>
			<div class="mini-metric">
				<div class="mini-metric-value">${(analytics.showcase?.eventClicked || 0).toLocaleString()}</div>
				<div class="mini-metric-label">Event Cards Clicked</div>
			</div>
		</div>

		<div class="grid">
			<div class="mini-metric">
				<div class="mini-metric-value">${(analytics.showcase?.ctaClicks || 0).toLocaleString()}</div>
				<div class="mini-metric-label">CTA Clicks</div>
			</div>
			<div class="mini-metric">
				<div class="mini-metric-value">${analytics.showcase?.clickThroughRate || "0.00"}%</div>
				<div class="mini-metric-label">Click-Through Rate</div>
			</div>
		</div>

		<div class="footer">
			<p style="font-weight: 600; color: #0a0a0a; margin: 0 0 10px 0;">View Detailed Analytics</p>
			<p style="margin: 0 0 15px 0;"><a href="${POSTHOG_HOST}/project/${POSTHOG_PROJECT_ID}">Open PostHog Dashboard →</a></p>
			<hr>
			<p style="font-size: 0.8em; color: #a3a3a3; margin: 15px 0 5px 0;">
				Automated monthly report from <strong style="color: #0a0a0a;">DK24</strong><br>
				Connecting college tech communities to learn and build together
			</p>
			<p style="font-size: 0.75em; color: #d4d4d4; margin: 5px 0 0 0;">
				Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
			</p>
		</div>
	</div>
</body>
</html>
	`.trim();
}

/**
 * Send email using nodemailer
 */
async function sendEmail(subject, htmlContent) {
  try {
    console.log(`\nSending email to ${RECIPIENT_EMAIL}...`);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: `DK24 Analytics <${EMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: subject,
      html: htmlContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(
      `[SUCCESS] Email sent successfully! Message ID: ${info.messageId}`,
    );
    return true;
  } catch (error) {
    console.error("[ERROR] Failed to send email:", error.message);
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log("[DK24] Starting monthly report generation...\n");

    const analytics = await getMonthlyAnalytics();
    const emailHTML = generateEmailHTML(analytics);

    const subject = `DK24 Monthly Report - ${analytics.uniqueVisitors.toLocaleString()} Visitors, ${analytics.formSubmissions} New Members`;

    // Send email
    const emailSent = await sendEmail(subject, emailHTML);

    if (!emailSent) {
      throw new Error("Report was generated, but email delivery failed.");
    }

    console.log("\n[COMPLETE] Monthly report generation complete!\n");
  } catch (error) {
    console.error("[ERROR] Failed to generate monthly report:", error);
    process.exit(1);
  }
}

main();
