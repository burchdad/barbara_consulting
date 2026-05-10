# Ghost Enterprise Authority Platform

A reusable, dark enterprise authority website + protected admin dashboard built with Next.js App Router, TypeScript, TailwindCSS, Prisma, and PostgreSQL.

## Stack

- Next.js 16 App Router (compatible with 14+ architecture requirements)
- TypeScript
- TailwindCSS
- Framer Motion
- Prisma ORM
- PostgreSQL
- Zod validation
- React Hook Form-ready structure (contact form uses server actions + state)
- Simple protected admin auth with secure HTTP-only cookie sessions

## Implemented Features

### Public website

- Home page with long-scroll sections:
	- Hero with CTA
	- KPI stats with animated counters
	- Global footprint visual block
	- We Are section
	- Journey timeline
	- Leadership preview
	- Services (anchor target `#services`)
	- Mission partners
	- Contracts preview
	- Case studies preview
	- Testimonials preview
	- Careers preview
	- Contact CTA
	- Enterprise footer
- About page
- Case Studies page
- Dynamic case study detail route: `/case-studies/[slug]`
- Contracts page
- Careers page with dynamic filters (job type, location, search)
- Contact page with validated form writing to database
- Privacy page
- Responsive navigation with mobile overlay menu

### Admin dashboard

Protected routes under `/admin` with login at `/admin/login`.

Modules implemented:

- Dashboard Overview
- Jobs / Careers
- Case Studies
- Contracts
- Leadership
- Testimonials
- Services
- Mission Partners
- Contact Submissions
- Global Settings

Each core content module supports create, edit, delete, and publish/unpublish via form actions.

## Data Model

Prisma models implemented:

- `User`
- `Job`
- `CaseStudy`
- `Contract`
- `LeadershipMember`
- `Testimonial`
- `ServiceItem`
- `MissionPartner`
- `ContactSubmission`
- `GlobalSetting`

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/consult_prototype?schema=public"
NEXTAUTH_SECRET="replace-with-strong-random-string"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@company.com"
ADMIN_PASSWORD="ChangeMe123!"
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npm run db:generate
```

3. Push schema to database:

```bash
npm run db:push
```

4. Seed starter content and admin user:

```bash
npm run db:seed
```

5. Start dev server:

```bash
npm run dev
```

## Deployment Notes

### Vercel (frontend)

- Connect repository to Vercel.
- Set environment variables from `.env.example`.
- Ensure `DATABASE_URL` points to managed Postgres.
- Prisma Client is generated automatically during install/build via `postinstall` and the `build` script.
- Build command: `npm run build`
- Start command: `npm run start`

### PostgreSQL (Railway/Supabase/Neon/etc.)

- Provision database.
- Set `DATABASE_URL` in deployment environment.
- Run schema push/migration in CI or deployment hook.
- Run seed once for initial content if desired.

## Validation and Quality

- Zod validation implemented in server actions for all admin/public mutations.
- Admin mutations are protected with server-side auth checks.
- Lint passes:

```bash
npm run lint
```

## Important Notes

- This implementation intentionally uses original content and placeholder media.
- Public pages are data-driven and render from database-seeded content.
- Admin login credentials are seeded from `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
