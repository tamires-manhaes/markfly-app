import * as Sentry from "@sentry/react";

interface CaptureEventProps {
  message: string;
  level?: Sentry.SeverityLevel;
  tags?: {
    feature: string;
    button: string;
  };
}

export function useSentry() {
  function captureEvent({ message, level, tags }: CaptureEventProps) {
    Sentry.captureEvent({
      message: message,
      fingerprint: [message],
      level: level,
      extra: {
        time: new Date().toISOString(),
        page: window.location.pathname,
      },
      tags: tags,
    });
  }

  return { captureEvent };
}
