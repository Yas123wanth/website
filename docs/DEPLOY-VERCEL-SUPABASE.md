# Deploy on Vercel + Supabase

## 1. Supabase — database

1. Create a project at [supabase.com](https://supabase.com).
2. **Settings → Database** → copy:
   - **Connection string → URI** (Transaction pooler, port **6543**) → `DATABASE_URL`
   - **Connection string → Direct** (port **5432**) → `DIRECT_URL`
3. Append `?pgbouncer=true` to the pooler URL if Supabase shows it in their docs for Prisma.

Push schema (from your machine, once):

```bash
npx prisma db push
npm run db:seed
```

## 2. Supabase — file uploads (required on Vercel)

Vercel cannot save uploads to disk. Use **Supabase Storage**:

1. **Storage → New bucket** → name: `uploads` → **Public bucket** (for product + reference image URLs).
2. **Settings → API** → copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` key (secret) → `SUPABASE_SERVICE_ROLE_KEY` (Vercel only, never expose to browser)

Uploads go to:

- `uploads/products/…` — admin product images  
- `uploads/custom-inquiries/…` — custom order reference photos  

## 3. Vercel — deploy

1. Push the repo to GitHub and **Import** in [vercel.com](https://vercel.com).
2. **Environment variables** (Production + Preview):

| Variable | Example |
|----------|---------|
| `DATABASE_URL` | Supabase pooler URI |
| `DIRECT_URL` | Supabase direct URI |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_URL` | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key |
| `ADMIN_EMAIL` | your admin login email |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | optional |
| `RAZORPAY_WEBHOOK_SECRET` | optional |

3. Deploy. Build command is already `prisma generate && next build`.

4. After first deploy, run seed against Supabase (locally with production `DATABASE_URL` in `.env`, or use Supabase SQL editor for a one-off admin user).

## 4. Custom design form — reference photos

On **/custom-order**, use **“Add reference images”** (up to 5). Files upload when the customer submits the form. View them in **Admin → Inquiries**.

## 5. Admin product images

**Admin → Products → Add/Edit** → **Upload image** (same Supabase `uploads` bucket).
