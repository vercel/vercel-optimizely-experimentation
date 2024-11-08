## Fast & Safe Experimentation with Vercel & Optimizely

This is a [Next.js](https://nextjs.org/) template that demonstrates how teams can integrate feature experimentation into their development workflow. This project uses a simple ecommerce website as an example.

This project uses:

- Next.js
- App Router
- RSC (React Server Components) and Suspense
- Server Actions
- Edge Middleware
- Tailwind CSS & shadcn/ui
- The Vercel Toolbar
- Flags
- Experimentation with Optimizely

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](<https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel-optimizely-experimentation%2Ftree%2Fguide&env=OPTIMIZELY_API_KEY,OPTIMIZELY_SDK_KEY,OPTIMIZELY_PROJECT_ID,FLAGS_SECRET&envDescription=Execute%20the%20following%20command%20to%20create%20a%20secret%3A%20node%20-e%20%22console.log(crypto.randomBytes(32).toString('base64url'))%22&project-name=vercel-optimizely-experimentation&repository-name=vercel-optimizely-experimentation&demo-title=Vercel%20Experimentation&demo-description=A%20Next.js%20project%20using%20Optimizely%20for%20experimentation&demo-url=https%3A%2F%2Fvercel.com%2Fvercel-optimizely-experimentation.vercel.app>)

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.

## Getting started

Sign up for a free [Optimizely Feature Flags account](https://www.optimizely.com/enhancements/free-feature-flagging) and create a new project.

The following environment variables are required for running this project. Optimizely environment variables values can be retrieved from [app.optimizely.com](https://app.optimizely.com/):

- `OPTIMIZELY_API_KEY`
- `OPTIMIZELY_SDK_KEY`
- `OPTIMIZELY_PROJECT_ID`
- `FLAGS_SECRET`
  Create via: `node -e "console.log(crypto.randomBytes(32).toString('base64url'))"`

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

| File(s)                                  | Description                                                  |
| ---------------------------------------- | ------------------------------------------------------------ |
| `/app/[code]/page.tsx`                   | Static homepage with dynamic segment for multiple variations |
| `/app/product/[slug]/page.tsx`           | Product detail page                                          |
| `/app/cart/page.tsx`                     | Cart page                                                    |
| `/app/.well-known/vercel/flags/route.ts` | API route exposing flags to toolbar                          |
| `/lib/actions.ts`                        | File containing server actions (e.g. track purchase event)   |
| `/lib/flags.ts`                          | Contains declared flags and precomputed flags                |
| `/middleware.ts`                         | Evaluates precomputed flags, set new shopper cookie          |
| `/lib/products.ts`                       | A hardcoded set of products                                  |

## Learn More

Take a look at the following resources to learn more:

- [Guide - How to Integrate Optimizely Feature Experimentation with Next.js and Vercel](https://vercel.com/guides/how-to-integrate-optimizely-feature-experimentation-next-vercel)
- [Workshop - Fast & Safe Experimentation with Next.js and Optimizely](https://vercel.com/resources/workshop-fast-and-safe-experimentation)
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [The Vercel Toolbar](https://vercel.com/docs/workflow-collaboration/vercel-toolbar)
- [Feature Flags Announcement](https://vercel.com/blog/feature-flags)
- [Feature Flags with Vercel](https://vercel.com/docs/workflow-collaboration/feature-flags)
- [Optimizely Feature Experimentation](https://www.optimizely.com/products/feature-experimentation/)
