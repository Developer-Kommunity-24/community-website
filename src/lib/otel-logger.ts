import { type LogRecord, SeverityNumber, logs } from "@opentelemetry/api-logs";

import { flushOtelLogs } from "../../instrumentation";

const loggerName = process.env.OTEL_SERVICE_NAME ?? "dk24-community-website";
const logger = logs.getLogger(loggerName);

type EmitServerLogInput = {
  body: LogRecord["body"];
  severityNumber?: SeverityNumber;
  severityText?: LogRecord["severityText"];
  attributes?: LogRecord["attributes"];
};

export function emitServerLog({
  body,
  severityNumber = SeverityNumber.INFO,
  severityText,
  attributes,
}: EmitServerLogInput) {
  logger.emit({
    body,
    severityNumber,
    severityText,
    attributes,
  });
}

export { flushOtelLogs };
