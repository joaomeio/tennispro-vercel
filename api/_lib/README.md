# Why the underscore

Vercel turns **every** file under `api/` into its own Serverless Function —
including shared helpers that are never meant to be HTTP endpoints. This
directory used to be `api/lib/`, which meant `posthog.js` and `meta-capi.js`
were each deployed as a function, burning two slots for code nothing ever
requests.

The Hobby plan allows 12 functions per deployment. With those two wasted the
project sat at exactly 12, and adding `api/pricing-config.js` failed the
deploy outright:

    exceeded_serverless_functions_per_deployment
    No more than 12 Serverless Functions can be added to a Deployment on the
    Hobby plan.

Vercel skips files and directories inside `api/` whose names begin with `_`,
so renaming the folder takes the count from 13 back to 11.

**Keep the underscore.** Anything in here is a shared module, imported as
`./_lib/<name>.js` by the real endpoints one level up. If you add a genuine
endpoint, put it in `api/` — and remember there are only 12 slots.
