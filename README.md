## Fast & Safe Experimentation with Next.js, Vercel, and Optimizely

This is a [Next.js](https://nextjs.org/) template that demonstrates how to integrate Optimizely Feature Experimentation with Vercel Feature Flags.

This project uses Next.js App Router with Partial Prerendering (PPR) to deliver a fast static shell to users immediately, then stream in dynamic content and experiments. Optimizely experimentation data is synced to Vercel Edge Config via webhooks. This enables experiments for both static and dynamic pages with decisions executed in Edge Middleware and React Server Components (RSC). For more information on these patterns please refer to [Using flags in Next.js](https://vercel.com/docs/workflow-collaboration/feature-flags/flags-pattern-nextjs) and [Precomputed Flags](https://vercel.com/docs/workflow-collaboration/feature-flags/flags-pattern-nextjs#precomputing-flags) documentation.

This project uses:

- Next.js App Router
- Partial Prerendering (PPR)
- Vercel Edge Config
- Edge Middleware
- Tailwind CSS & shadcn/ui
- Vercel Toolbar
- Vercel Feature Flags
- Optimizely Feature Experimentation

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel-optimizely-experimentation&env=OPTIMIZELY_API_KEY,OPTIMIZELY_SDK_KEY,OPTIMIZELY_PROJECT_ID,OPTIMIZELY_WEBHOOK_SECRET,VERCEL_API_TOKEN,VERCEL_TEAM_ID,VERCEL_EDGE_CONFIG_ID,FLAGS_SECRET&project-name=vercel-optimizely-experimentation&repository-name=vercel-optimizely-experimentation&demo-title=Vercel%20Optimizely%20Experimentation&demo-description=Fast%20%26%20safe%20experimentation%20with%20Vercel%2C%20Next.js%20and%20Optimizely&demo-url=https%3A%2F%2Fvercel-optimizely-experimentation.vercel.app%2F&edge-config-stores=%7B%22EDGE_CONFIG%22:%7B%22optimizely_fx_data%22:true%7D%7D&env=EDGE_CONFIG)

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.

## Getting started

Sign up for a free [Optimizely Feature Flags account](https://www.optimizely.com/enhancements/free-feature-flagging) and create a new project.

The following environment variables are required:

- `OPTIMIZELY_API_KEY`
- `OPTIMIZELY_SDK_KEY`
- `OPTIMIZELY_PROJECT_ID`
- `OPTIMIZELY_WEBHOOK_SECRET`
- `VERCEL_API_TOKEN`
- `VERCEL_TEAM_ID`
- `VERCEL_EDGE_CONFIG_ID`
- `FLAGS_SECRET`
  Create via: `node -e "console.log(crypto.randomBytes(32).toString('base64url'))"`

Optimizely environment variables values can be retrieved from [app.optimizely.com](https://app.optimizely.com/) and Optimizely webhooks can be created by following the steps outlined in the [Create Webhooks](https://docs.developers.optimizely.com/feature-experimentation/docs/configure-webhooks) documentation.

A Vercel API Token, Team ID, and Edge Config ID are required for storing experiment data in Vercel Edge Config. Please refer to the [Vercel REST API](https://vercel.com/docs/rest-api) and [Edge Config](https://vercel.com/docs/storage/edge-config) documentation for more information.

Run the development server locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Important files and folders

| File(s)                                                | Description                                                                        |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `/app/[code]/page.tsx`                                 | Static homepage with dynamic segment for multiple variations                       |
| `/app/product/[slug]/page.tsx`                         | Product detail page                                                                |
| `/app/cart/page.tsx`                                   | Cart page                                                                          |
| `/app/.well-known/vercel/flags/route.ts`               | API route exposing flags to toolbar                                                |
| `/app/.well-known/vercel/webhooks/optimizely/route.ts` | API route called by optimizely to store experimentation data in Vercel Edge Config |
| `/lib/actions.ts`                                      | File containing server actions (e.g. track purchase event)                         |
| `/lib/flags.ts`                                        | Contains declared flags and precomputed flags                                      |
| `/middleware.ts`                                       | Evaluates precomputed flags, set new shopper cookie                                |
| `/lib/products.ts`                                     | A hardcoded set of products                                                        |

## Learn More

Take a look at the following resources to learn more:

- [Guide - How to Integrate Optimizely Feature Experimentation with Next.js and Vercel](https://vercel.com/guides/how-to-integrate-optimizely-feature-experimentation-next-vercel)
- [Workshop - Fast & Safe Experimentation with Next.js and Optimizely](https://vercel.com/resources/workshop-fast-and-safe-experimentation)
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [The Vercel Toolbar](https://vercel.com/docs/workflow-collaboration/vercel-toolbar)
- [Feature Flags Ship Announcement](https://vercel.com/blog/feature-flags)
- [Feature Flags with Vercel](https://vercel.com/docs/workflow-collaboration/feature-flags)
- [Optimizely Feature Experimentation](https://www.optimizely.com/products/feature-experimentation/)
