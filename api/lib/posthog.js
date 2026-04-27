import { PostHog } from 'posthog-node'

export function createPostHogClient() {
  return new PostHog(process.env.POSTHOG_API_KEY, {
    host: process.env.POSTHOG_HOST,
  })
}
