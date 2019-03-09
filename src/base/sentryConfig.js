import Vue from 'vue'

export default function ({ dsn }) {
  return {
    dsn,
    integrations: [new Sentry.Integrations.Vue({ Vue })],
    release: __ENV.GIT_SHA1,
    beforeSend: event => {
      const { values } = event.exception
      const firstValue = values && values.length > 0 && values[0].value
      if (firstValue && firstValue.includes('ResizeObserver loop limit exceeded')) {
        return null
      }
      return event
    },
  }
}