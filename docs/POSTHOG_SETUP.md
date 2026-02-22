# PostHog Setup Guide

Complete setup guide for PostHog analytics in the DK24 community website.

## Table of Contents

- [Environment Configuration](#environment-configuration)
- [GitHub Secrets Setup](#github-secrets-setup)
- [Dashboard Configuration](#dashboard-configuration)
  - [Overview Dashboard](#overview-dashboard)
  - [Calendar Engagement Dashboard](#calendar-engagement-dashboard)
  - [Showcase Page Dashboard](#showcase-page-dashboard)
- [Email Alert Configuration](#email-alert-configuration)
- [Custom Events Reference](#custom-events-reference)
- [Troubleshooting](#troubleshooting)

## Environment Configuration

### Required Environment Variables

Add these to your `.env.local` for development and to your hosting platform (Vercel/Netlify) for production:

```bash
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# For Email Reports (GitHub Actions)
POSTHOG_PROJECT_API_KEY=phc_your_project_api_key_here
POSTHOG_PERSONAL_API_KEY=phx_your_personal_api_key_here
POSTHOG_PROJECT_ID=12345

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
RECIPIENT_EMAIL=dk24consortium@gmail.com
```

### Getting Your API Keys

1. **Project Key** (`NEXT_PUBLIC_POSTHOG_KEY`):
   - Go to PostHog → Settings → Project Settings
   - Copy the "Project API Key"

2. **Personal API Key** (`POSTHOG_PERSONAL_API_KEY`):
   - Go to PostHog → Your Profile → Settings → Personal API Keys
   - Create a new Personal API Key
   - Copy the key (starts with `phx_`)

3. **Project ID** (`POSTHOG_PROJECT_ID`):
   - Visible in your PostHog URL: `app.posthog.com/project/{PROJECT_ID}`

## GitHub Secrets Setup

For automated email reports, add these secrets to your GitHub repository:

1. Go to **GitHub Repository → Settings → Secrets and variables → Actions**
2. Click **New repository secret** and add each of these:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `POSTHOG_PROJECT_API_KEY` | Project API key | `phc_abc123...` |
| `POSTHOG_PERSONAL_API_KEY` | Personal API key | `phx_xyz789...` |
| `POSTHOG_PROJECT_ID` | Project ID number | `12345` |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host URL | `https://app.posthog.com` |
| `EMAIL_USER` | Gmail address | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password | `abcd efgh ijkl mnop` |
| `RECIPIENT_EMAIL` | Report recipient | `dk24consortium@gmail.com` |

### Setting Up Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (required)
3. Go to **App passwords** under 2-Step Verification
4. Generate a new app password for "Mail"
5. Copy the 16-character password and use it as `EMAIL_PASSWORD`

## Dashboard Configuration

### Overview Dashboard

Create a dashboard with these insights:

#### 1. Total Page Views (Trend)
- **Type**: Trend
- **Event**: `$pageview`
- **Visualization**: Line chart
- **Date Range**: Last 30 days

#### 2. Form Submissions (Funnel)
- **Type**: Funnel
- **Steps**:
  1. `$pageview` (any page)
  2. `form_submitted`
- **Visualization**: Funnel chart

#### 3. Error Rate (Trend)
- **Type**: Trend
- **Events**: `error_occurred`
- **Breakdown**: By `error_message`
- **Visualization**: Bar chart

#### 4. User Engagement (Trend)
- **Type**: Trend
- **Events**: `$autocapture` (clicks)
- **Visualization**: Line chart

### Calendar Engagement Dashboard

Create a dedicated dashboard for calendar analytics:

#### 1. Calendar Page Funnel
- **Type**: Funnel
- **Steps**:
  1. `calendar_page_view`
  2. `calendar_month_changed`
  3. `calendar_event_clicked`
  4. `calendar_downloaded`
- **Visualization**: Funnel
- **Purpose**: Track how users progress through calendar interactions

#### 2. Event Click Heatmap
- **Type**: Trend
- **Event**: `calendar_event_clicked`
- **Breakdown**: By `event_date`
- **Visualization**: Heatmap/Table
- **Purpose**: See which events get the most clicks

#### 3. Month Navigation Pattern
- **Type**: Trend
- **Event**: `calendar_month_changed`
- **Breakdown**: By `month` and `year`
- **Visualization**: Bar chart
- **Purpose**: Understand which months users explore most

#### 4. View Type Preference
- **Type**: Pie Chart
- **Event**: `calendar_view_changed`
- **Breakdown**: By `view_type` (month vs agenda)
- **Purpose**: See which calendar view is more popular

#### 5. Download Conversion Rate
- **Type**: Trend
- **Formula**: `(calendar_downloaded / calendar_page_view) * 100`
- **Visualization**: Line chart
- **Purpose**: Track ICS download conversion rate

#### 6. Calendar Engagement Score
- **Type**: Trend
- **Events**: Sum of:
  - `calendar_event_clicked`
  - `calendar_month_changed`
  - `calendar_view_changed`
- **Visualization**: Line chart
- **Purpose**: Overall calendar engagement metric

### Showcase Page Dashboard

Create a dashboard for showcase event page analytics:

#### 1. Showcase Page Funnel
- **Type**: Funnel
- **Steps**:
  1. `showcase_page_view`
  2. `showcase_event_viewed` (card impression)
  3. `showcase_event_clicked` (card click)
  4. `form_submitted` (event submission)
- **Visualization**: Funnel
- **Purpose**: Track user journey from viewing to submitting events

#### 2. Scroll Depth Analysis
- **Type**: Trend
- **Event**: `showcase_scroll_depth`
- **Breakdown**: By `depth_percentage` (25%, 50%, 75%, 100%)
- **Visualization**: Bar chart
- **Purpose**: See how far users scroll

#### 3. Event Card Click-Through Rate
- **Type**: Trend
- **Formula**: `(showcase_event_clicked / showcase_event_viewed) * 100`
- **Visualization**: Line chart
- **Purpose**: Track engagement with event cards

#### 4. CTA Performance
- **Type**: Trend
- **Event**: `showcase_cta_clicked`
- **Breakdown**: By `cta_type`
- **Visualization**: Pie chart
- **Purpose**: See which CTAs are most effective

#### 5. Popular Events
- **Type**: Table
- **Event**: `showcase_event_clicked`
- **Breakdown**: By `event_name`
- **Order**: By count (descending)
- **Purpose**: Identify most popular events

#### 6. Average Events Viewed Per Session
- **Type**: Trend
- **Formula**: `showcase_event_viewed / unique_sessions`
- **Visualization**: Line chart
- **Purpose**: Track how many events users view per visit

## Email Alert Configuration

Set up these alerts in PostHog to stay informed:

### 1. High Error Rate Alert
- **Metric**: `error_occurred` count
- **Threshold**: More than 10 errors in 1 hour
- **Action**: Send email to team
- **Purpose**: Catch critical errors immediately

### 2. Low Form Submission Alert
- **Metric**: `form_submitted` count
- **Threshold**: Less than 1 submission in 24 hours
- **Action**: Send email
- **Purpose**: Alert if form submissions drop unexpectedly

### 3. Calendar Download Spike
- **Metric**: `calendar_downloaded` count
- **Threshold**: More than 50 downloads in 1 day
- **Action**: Send email (positive alert!)
- **Purpose**: Celebrate high engagement

### 4. Showcase Page Bounce Rate
- **Metric**: Users with only `showcase_page_view` (no other events)
- **Threshold**: More than 80% in 1 day
- **Action**: Send email
- **Purpose**: Alert if showcase page isn't engaging

### 5. Weekly Summary Alert
- **Metric**: Custom insight
- **Threshold**: Every Monday at 9 AM
- **Action**: Send weekly summary email
- **Purpose**: Regular team update

## Custom Events Reference

### Page View Events

| Event Name | Properties | Description |
|-----------|-----------|-------------|
| `$pageview` | `$current_url`, `$screen_width` | Auto-tracked page views |
| `calendar_page_view` | `current_month`, `current_year`, `events_count` | Calendar page load |
| `showcase_page_view` | `total_events`, `page_load_time` | Showcase page load |

### Calendar Events

| Event Name | Properties | Description |
|-----------|-----------|-------------|
| `calendar_month_changed` | `month`, `year`, `events_count` | User navigates to different month |
| `calendar_date_clicked` | `date`, `day_of_week`, `has_events` | User clicks on a specific date |
| `calendar_event_clicked` | `event_id`, `event_name`, `event_date`, `organization` | User clicks on event |
| `calendar_view_changed` | `view_type` (month/agenda) | User switches calendar view |
| `calendar_downloaded` | `format`, `events_count`, `download_mode` | User downloads ICS file |

### Showcase Events

| Event Name | Properties | Description |
|-----------|-----------|-------------|
| `showcase_event_viewed` | `event_id`, `event_name`, `position_in_list` | Event card enters viewport |
| `showcase_event_clicked` | `event_id`, `event_name`, `position_in_list` | User clicks event card |
| `showcase_scroll_depth` | `depth_percentage` (25/50/75/100) | User scrolls to milestone |
| `showcase_cta_clicked` | `cta_type` | User clicks CTA button |
| `showcase_filter_applied` | `filter_type`, `filter_value`, `results_count` | User filters events |
| `showcase_image_error` | `event_id`, `image_url` | Event image fails to load |

### Form Events

| Event Name | Properties | Description |
|-----------|-----------|-------------|
| `form_submitted` | `form_type`, `success`, user properties | Any form submission |

### Error Events

| Event Name | Properties | Description |
|-----------|-----------|-------------|
| `error_occurred` | `error_message`, `component`, `stack_trace` | JavaScript error |

## Troubleshooting

### Events Not Appearing in PostHog

**Check 1**: Verify PostHog is initialized
```javascript
// In browser console:
window.posthog
// Should return PostHog object
```

**Check 2**: Check browser console for errors
```
Look for: "PostHog not initialized" or network errors
```

**Check 3**: Verify environment variables
```bash
# In your app, check:
process.env.NEXT_PUBLIC_POSTHOG_KEY
process.env.NEXT_PUBLIC_POSTHOG_HOST
```

**Check 4**: Check PostHog Live Events
- Go to PostHog → Activity → Live Events
- Perform an action on your site
- Watch for events appearing in real-time

### Email Reports Not Sending

**Issue**: GitHub Actions workflow fails

**Solution 1**: Check GitHub Secrets
```
All required secrets must be set in repository settings
```

**Solution 2**: Check workflow logs
```
Go to Actions tab → Select workflow run → View logs
```

**Solution 3**: Test email credentials locally
```bash
npm install
node scripts/posthog-monthly-report.js
```

**Issue**: Emails going to spam

**Solution**: Add SPF/DKIM records or use a dedicated email service like SendGrid

### Low Event Counts

**Check 1**: Verify autocapture is enabled
```javascript
// In src/lib/posthog.ts:
autocapture: { dom_event_allowlist: ['click', 'submit', 'change'] }
```

**Check 2**: Check if events are being captured but not counted
```
PostHog → Activity → Live Events → Filter by event name
```

**Check 3**: Verify date ranges in queries
```javascript
// In report scripts:
const dateFrom = "-30d"; // Adjust as needed
```

### Session Recording Not Working

**Issue**: No recordings appear

**Solution 1**: Check recording is enabled
```javascript
// In src/lib/posthog.ts:
session_recording: { 
  maskAllInputs: true // Should be present
}
```

**Solution 2**: Check sampling rate
```javascript
session_recording: {
  maskAllInputs: true,
  sampleRate: 1.0 // 100% of sessions (use 0.1 for 10%)
}
```

## Best Practices

### 1. Property Naming Convention
- Use `snake_case` for property names
- Use clear, descriptive names
- Group related properties with prefixes (e.g., `calendar_*`, `showcase_*`)

### 2. Event Tracking Guidelines
- Track meaningful user actions, not every interaction
- Include context properties (IDs, names, dates)
- Use consistent property names across similar events

### 3. Performance Considerations
- PostHog autocapture is lightweight
- Session recording samples by default (configurable)
- Events are batched and sent asynchronously

### 4. Privacy Compliance
- All form inputs are masked in session recordings
- No PII is sent to PostHog by default
- User identification only happens on form submission (opt-in)

### 5. Dashboard Organization
- Create separate dashboards for different stakeholders
- Use descriptive names and descriptions
- Add text panels to explain metrics

## Support Resources

- **PostHog Docs**: https://posthog.com/docs
- **PostHog Community**: https://posthog.com/questions
- **DK24 Repository Issues**: https://github.com/your-org/dk24-community-website/issues

---

**Last Updated**: 2025-01-XX  
**Maintainer**: DK24 Core Team
