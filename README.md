# AFCON 2027 Tanzania Football Tourism Blog (React + Firebase)

Modern travel blog for football tourism in Tanzania, focused on AFCON 2027.

## Features

- **Frontend**: Home (`/`), Blog list (`/blog`), Single post (`/blog/:slug`) via React Router
- **Admin**: `/admin` dashboard with Firebase Auth login + CRUD editor using `react-quill`
- **Database**: Firebase Firestore collection `posts`
- **Public access**: read-only; admin can create/update/delete via Firestore rules
- **Seed content**: 50 ready-to-import posts in `seed/` (5 JSON files × 10 posts)

## Project structure (high level)

- `src/pages/`: public pages
- `src/pages/admin/`: admin dashboard pages
- `src/lib/firebase.ts`: Firebase initialization
- `src/lib/posts.ts`: Firestore CRUD helpers
- `seed/`: 50 blog posts JSON (ready for import)
- `firebase/firestore.rules`: sample security rules

## Quick start

```bash
npm install
npm run dev
```

## Firebase setup

1. Create a Firebase project in the Firebase console.
2. Enable **Authentication → Email/Password**.
3. Create a Firestore database (production or test mode is fine while prototyping).
4. Add a Web App in Firebase to get your config values.
5. Create `.env` from `.env.example` and paste your Firebase values:

```bash
cp .env.example .env
```

6. For UI gating, set one of these in `.env`:

- `VITE_ADMIN_UIDS` (recommended), comma-separated UIDs
- `VITE_ADMIN_EMAILS` (easy for quick demos)

## Firestore data model

Collection: `posts`

Fields:
- `title`: string
- `slug`: string
- `meta_description`: string (optional but included for SEO/snippets)
- `content`: string (HTML from `react-quill`)
- `cover_image`: string (URL)
- `category`: string
- `tags`: array of strings
- `created_at`: timestamp

## Firestore rules (public read, admin write)

Use `firebase/firestore.rules` as a starting point.

- **Option A (recommended)**: allow writes only if user has custom claim `admin: true`
- **Option B (quick start)**: hardcode admin UIDs in the rules file

## Seed 50 posts into Firestore

Seed files:
- `seed/posts-01.json` … `seed/posts-05.json`

### Option 1: Node seed script (recommended)

1. Create a Firebase **service account** JSON:
   Firebase Console → Project settings → Service accounts → “Generate new private key”
2. Export credentials path:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/serviceAccount.json"
```

3. Run:

```bash
npm run seed
```

This writes documents to `posts/{slug}` and converts `created_at` to a Firestore Timestamp.

## Admin usage

- Visit `/admin/login`
- Sign in with your Firebase email/password user
- Manage posts at `/admin/posts`

