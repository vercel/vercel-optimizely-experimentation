## Building Fast & Safe Experimentation with Vercel & Optimizely

This is a [Next.js](https://nextjs.org/) project that demonstrates how teams can incorporate feature flags and experimentation into their development workflow. This project uses a simple ecommerce website as an example.

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

[![Deploy with Vercel](https://vercel.com/button)](<https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel-experimentation-workshop%2Ftree%2Fworkshop&env=OPTIMIZELY_API_KEY,OPTIMIZELY_SDK_KEY,OPTIMIZELY_PROJECT_ID,FLAGS_SECRET&envDescription=Execute%20the%20following%20command%20to%20create%20a%20secret%3A%20node%20-e%20%22console.log(crypto.randomBytes(32).toString('base64url'))%22&project-name=vercel-experimentation-workshop&repository-name=vercel-experimentation-workshop&demo-title=Vercel%20Experimentation%20Workshop&demo-description=A%20Next.js%20project%20using%20Optimizely%20for%20experimentation&demo-url=https%3A%2F%2Fvercel.com%2Fvercel-experimentation-workshop.vercel.app>)

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

## Deciding a feature with the Optimizely JavaScript SDK

The following code snippet demonstrates how to create a user context and then execute `context.decide` to determine whether a feature should be enabled and what variation should be shown.

```typescript
const client = optimizely.createInstance({
  sdkKey: process.env.OPTIMIZELY_SDK_KEY!,
});

if (!client) {
  throw new Error("Failed to create client");
}

await client.onReady();

const context = client.createUserContext("user-1");

if (!context) {
  throw new Error("Failed to create user context");
}

const decision = context.decide("buynow");
```

## Integration with Vercel Web Analytics and Runtime Logs

You can filter and break down your site's page views and custom analytics events by feature flags, helping you gain a deeper understanding of how your flags will impact your users. This granular level of analysis in Web Analytics empowers data-driven decisions, allowing you to optimize your experiments for maximum impact.

`reportValue` lets you report the value of a resolved flag, which will make it available when viewing Monitoring, Logs, Analytics and Speed Insights on Vercel. Refer to the Vercel [resources](https://vercel.com/blog/introducing-platform-wide-understanding-and-experimental-nextjs-design-pattern) for more information.

```typescript
const decision = context.decide("buynow");
const flag = {
  enabled: decision.enabled,
  buttonText: decision.variables.buynow_text as string,
};
reportValue("buynow", flag);
```

## Integrating feature flags with the Vercel Toolbar

The Vercel Toolbar is a tool that assists in the iteration and development process. Through the toolbar, you can leave feedback on deployments with Comments, navigate through important dashboard pages, share deployments, utilize Draft Mode for previewing unpublished content, and Visual Editing for editing content in real-time.

1. Add a `FLAGS_SECRET` environment variable to your project.
   This must be defined in the environment variables of your Vercel project.
   The value should be a base64url-encoded string of 32 random bytes. You can generate this value by running the command: `node -e "console.log(crypto.randomBytes(32).toString('base64url'))"`.
2. Expose the flags to the toolbar via an API route.
   This route should be defined in the `.well-known/vercel/flags` directory. The route should return an object with the flags that you want to expose to the toolbar.

   ```ts
   export async function GET(request: NextRequest) {
     const access = await verifyAccess(request.headers.get("Authorization"));
     if (!access) return NextResponse.json(null, { status: 401 });
     return NextResponse.json<ApiData>(getProviderData(flags));
   }
   ```

3. Tell the toolbar the value of your flags by including the `<FlagValues />` component when using a flag.

   ```tsx
   // Flag, imported from lib/flags.ts
    const showGetStarted = await showGetStartedFlag();
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          {/* Optional: Tells the toolbar about the values of your flags */}
          <FlagValues values={{ [showGetStartedFlag.key]: showGetStarted }} />

          {showGetStarted ? (
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
              Get started by editing&nbsp;
              <code className="font-mono font-bold">app/page.tsx</code>
            </p>
          ) : null}
    ...
   ```

Refer to the [Vercel Toolbar documentation](https://vercel.com/docs/workflow-collaboration/vercel-toolbar) for more information on configuring and including the Vercel Toolbar in your application.

## Learn More

Take a look at the following resources to learn more:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [The Vercel Toolbar](https://vercel.com/docs/workflow-collaboration/vercel-toolbar)
- [Feature Flags Ship Announcement](https://vercel.com/blog/feature-flags)
- [Feature Flags with Vercel](https://vercel.com/docs/workflow-collaboration/feature-flags)
- [Optimizely Experimentation](https://www.optimizely.com/products/feature-experimentation/)
