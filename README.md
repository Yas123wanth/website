# SLT Embroidery Designs

Full-stack embroidery design shop — Next.js, Prisma (SQLite dev), Auth.js, Razorpay, S3 downloads.

## Setup

```bash
npm install --legacy-peer-deps
cp .env.example .env
# Set Supabase DATABASE_URL + DIRECT_URL in .env
npx prisma db push
npm run db:seed
npm run dev
```

**Deploy:** see [docs/DEPLOY-VERCEL-SUPABASE.md](docs/DEPLOY-VERCEL-SUPABASE.md).

**Seed accounts**

- Admin: `admin@sltembroidery.com` / `Admin@123`
- Demo: `demo@sltembroidery.com` / `Demo@123`

Without Razorpay keys, checkout runs in **demo mode** (instant paid orders for testing).

## Admin — product images

On **Add product** / **Edit product**, use **Upload image** (saved under `public/uploads/products/` locally) or paste an external image URL. Design **ZIP** files are uploaded on the **edit product** page per format (needs S3 env vars).

## Production

Set `DATABASE_URL` to PostgreSQL (update `provider` in `prisma/schema.prisma`), configure Razorpay and S3 env vars (`S3_PUBLIC_URL_BASE` for CDN URLs on uploaded images), and set a strong `AUTH_SECRET`.
