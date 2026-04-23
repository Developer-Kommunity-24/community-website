import { logs } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from "@opentelemetry/sdk-logs";

const posthogApiKey =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ?? process.env.POSTHOG_PROJECT_API_KEY;
const posthogEndpoint =
  process.env.POSTHOG_OTEL_LOGS_ENDPOINT ??
  "https://us.i.posthog.com/i/v1/logs";
const serviceName = process.env.OTEL_SERVICE_NAME ?? "dk24-community-website";
let shutdownHooksRegistered = false;

export const loggerProvider = new LoggerProvider({
  resource: resourceFromAttributes({
    "service.name": serviceName,
  }),
  processors: posthogApiKey
    ? [
        new BatchLogRecordProcessor(
          new OTLPLogExporter({
            url: posthogEndpoint,
            headers: {
              Authorization: `Bearer ${posthogApiKey}`,
              "Content-Type": "application/json",
            },
          }),
        ),
      ]
    : [],
});

export async function flushOtelLogs() {
  await loggerProvider.forceFlush();
}

function registerShutdownFlushHooks() {
  if (shutdownHooksRegistered) {
    return;
  }

  shutdownHooksRegistered = true;

  process.once("beforeExit", () => {
    void flushOtelLogs();
  });
  process.once("SIGTERM", () => {
    void flushOtelLogs();
  });
  process.once("SIGINT", () => {
    void flushOtelLogs();
  });
}

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    logs.setGlobalLoggerProvider(loggerProvider);
    registerShutdownFlushHooks();
  }
}
