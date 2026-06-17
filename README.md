# Bimble

> **Be Smart, Be Humble** — A modern full-stack e-learning platform.

Bimble is a complete rewrite of the original Bimble platform, built with the latest web technologies. Users can browse, purchase, and watch courses; admins can manage all content through a dedicated dashboard.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [YouTube Video Integration](#youtube-video-integration)
  - [Server Setup](#server-setup)
  - [Client Setup](#client-setup)
- [Environment Variables](#environment-variables)
  - [Server (.env)](#server-env)
  - [Client (.env)](#client-env)
- [Database](#database)
  - [Schema Overview](#schema-overview)
  - [Relationships](#relationships)
  - [Migration Commands](#migration-commands)
- [API Reference](#api-reference)
  - [Public Endpoints](#public-endpoints)
  - [Protected User Endpoints](#protected-user-endpoints)
  - [Admin Endpoints](#admin-endpoints)
  - [Payment Endpoints](#payment-endpoints)
- [Client Pages & Routes](#client-pages--routes)
- [Authentication](#authentication)
- [Payment Flow (OVO via Xendit)](#payment-flow-ovo-via-xendit)
- [Design System](#design-system)
- [Improvements Over Original](#improvements-over-original)

---

## Tech Stack

### Client
| Technology | Version | Purpose |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.4 | UI framework (Composition API + `<script setup>`) |
| [Vite](https://vitejs.dev/) | ^5.0 | Build tool & dev server |
| [Vue Router 4](https://router.vuejs.org/) | ^4.2 | Client-side routing with lazy loading |
| [Pinia](https://pinia.vuejs.org/) | ^2.1 | State management (replaces Vuex) |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4 | Utility-first CSS framework |
| [Axios](https://axios-http.com/) | ^1.6 | HTTP client with interceptors |
| [VueUse](https://vueuse.org/) | ^10.7 | Composition utilities (debounce, click-outside) |
| [vue-toastification](https://github.com/Maronato/vue-toastification) | ^2.0 | Toast notifications |

### Server
| Technology | Version | Purpose |
|---|---|---|
| [Express 5](https://expressjs.com/) | ^5.0 | Web framework with native async error handling |
| [Sequelize](https://sequelize.org/) | ^6.35 | ORM for PostgreSQL |
| [PostgreSQL](https://www.postgresql.org/) | — | Relational database |
| [JWT](https://jwt.io/) | ^9.0 | Stateless authentication tokens |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | ^2.4 | Password hashing |
| [Helmet](https://helmetjs.github.io/) | ^7.1 | HTTP security headers |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | ^7.1 | Rate limiting (200 req / 15 min) |
| [Morgan](https://github.com/expressjs/morgan) | ^1.10 | HTTP request logging |
| [Multer](https://github.com/expressjs/multer) | ^1.4.5 | Multipart file uploads |
| [Nodemailer](https://nodemailer.com/) | ^6.9 | Transactional emails via Gmail |
| [google-auth-library](https://github.com/googleapis/google-auth-library-nodejs) | ^9.4 | Google OAuth verification |
| [Xendit (via axios)](https://xendit.github.io/apireference/) | — | OVO e-wallet payment processing |

---

## Project Structure

```
bimble-revamp/
├── client/                         # Vue 3 frontend
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js            # Axios instance with token interceptor
│   │   ├── components/
│   │   │   ├── AppNavbar.vue       # Sticky top nav with dropdown menu
│   │   │   ├── AppFooter.vue       # Site footer with links
│   │   │   ├── CourseCard.vue      # Public course listing card
│   │   │   ├── MyCourseCard.vue    # Enrolled course card
│   │   │   ├── StarRating.vue      # Interactive 1-10 star rating
│   │   │   └── LoadingSpinner.vue  # Centered spinner component
│   │   ├── router/
│   │   │   └── index.js            # Routes with lazy loading & meta guards
│   │   ├── stores/
│   │   │   └── auth.js             # Pinia auth store
│   │   ├── views/
│   │   │   ├── HomeView.vue        # Landing page with hero & features
│   │   │   ├── AboutView.vue       # About page
│   │   │   ├── LoginView.vue       # Login with email/password + Google
│   │   │   ├── RegisterView.vue    # Registration form
│   │   │   ├── CoursesView.vue     # Course catalog with sidebar filters
│   │   │   ├── CourseDetailView.vue# Course preview with video & comments
│   │   │   ├── BuyView.vue         # OVO payment form
│   │   │   ├── MyCoursesView.vue   # User's enrolled courses grid
│   │   │   ├── user/
│   │   │   │   ├── MyCourseDetailView.vue  # Video player + comments + rating
│   │   │   │   └── UpdateProfileView.vue   # Edit name/email
│   │   │   └── admin/
│   │   │       ├── AdminLayout.vue          # Dark sidebar layout
│   │   │       ├── AdminDashboardView.vue   # Stats & quick actions
│   │   │       ├── AdminCoursesView.vue     # Course table with status toggle
│   │   │       ├── AdminCategoriesView.vue  # Add/delete categories
│   │   │       ├── AdminUsersView.vue       # User list with search
│   │   │       ├── CourseDetailAdminView.vue# Course detail + video management
│   │   │       ├── AddCourseView.vue        # Create course with video upload
│   │   │       ├── UpdateCourseView.vue     # Edit course details
│   │   │       ├── AddVideoView.vue         # Upload single video to course
│   │   │       └── UpdateVideoView.vue      # Rename a video
│   │   ├── App.vue                 # Root component with fade transitions
│   │   ├── main.js                 # App bootstrap
│   │   └── style.css               # Tailwind directives + component classes
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── server/                         # Express 5 backend
    ├── migrations/                 # 7 Sequelize migrations
    ├── seeders/                    # (place seeders here)
    ├── src/
    │   ├── app.js                  # Express setup (middleware stack)
    │   ├── server.js               # Entry point — DB auth + listen
    │   ├── config/
    │   │   └── config.json         # DB config for dev/test/production
    │   ├── models/                 # Sequelize models
    │   │   ├── index.js
    │   │   ├── user.js
    │   │   ├── category.js
    │   │   ├── course.js
    │   │   ├── video.js
    │   │   ├── usercourse.js
    │   │   ├── comment.js
    │   │   └── rating.js
    │   ├── routes/
    │   │   ├── index.js            # Root router + error handler
    │   │   ├── publicRouter.js     # /public/* routes
    │   │   └── adminRouter.js      # /admin/* routes
    │   ├── controllers/
    │   │   ├── public/             # UserController, CourseController, etc.
    │   │   └── admin/              # AdminCourseController, etc.
    │   ├── middlewares/
    │   │   ├── authentication.js   # JWT verification → req.user
    │   │   ├── authorization.js    # Admin role check
    │   │   ├── ratingAuthorization.js # isPaid check before rating
    │   │   ├── uploadImages.js     # ImageKit video upload
    │   │   └── errorHandler.js     # Centralized error → HTTP response
    │   └── helpers/
    │       ├── jwt.js              # signToken / verifyToken
    │       ├── bcrypt.js           # hashPassword / comparePassword
    │       ├── nodemailer.js       # sendEmail helper
    │       ├── multer.js           # Memory storage config
    │       └── xendit.js           # ovoCharge / ovoStatus handlers
    ├── .env.example
    ├── .gitignore
    ├── .sequelizerc                # Points CLI to src/ paths
    └── package.json
```

---

## Features

### For Users
- **Browse Courses** — Filter by category, difficulty, and price; search by name; paginated (12 per page)
- **Course Preview** — Watch the first video for free before purchasing
- **Purchase with OVO** — Pay via OVO e-wallet (Xendit integration)
- **My Courses** — Access all paid courses in one place
- **Video Player** — Watch all course videos with a clickable playlist sidebar
- **Comments** — Leave comments on individual videos (paid users only)
- **Star Rating** — Rate a course 1–10 after purchase (one rating per user)
- **Google Login** — Sign in with Google OAuth in one click
- **Profile Update** — Change name and email

### For Admins
- **Dashboard** — Live counts for courses, users, categories, active courses
- **Course Management** — Create, edit, toggle active/inactive status
- **Video Management** — Upload MP4 videos (≤25MB) to ImageKit, rename, delete
- **Category Management** — Add/delete categories (cascades to courses)
- **User Management** — View all registered users with search

---

## Getting Started

### Prerequisites

- **Node.js** v18+ and npm v9+
- **PostgreSQL** v14+ running locally (default: `localhost:5433`)
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) for Nodemailer
- A [Google Cloud](https://console.cloud.google.com/) project with OAuth 2.0 credentials
- A [Xendit](https://dashboard.xendit.co/) account for OVO payments
- An [ImageKit](https://imagekit.io/) account for video storage

---

### Server Setup

```bash
# 1. Navigate to server directory
cd bimble-revamp/server

# 2. Install dependencies
npm install

# 3. Copy and fill environment variables
cp .env.example .env
# → edit .env with your actual values (see Environment Variables section)

# 4. Create database and run all migrations
npm run db:reset
# This runs: db:drop → db:create → db:migrate → db:seed:all

# 5. Start development server
npm run dev
# Server starts at http://localhost:3000
```

---

### Client Setup

```bash
# 1. Navigate to client directory
cd bimble-revamp/client

# 2. Install dependencies
npm install

# 3. Copy and fill environment variables
cp .env.example .env
# → set VITE_API_URL and VITE_GOOGLE_CLIENT_ID

# 4. Start development server
npm run dev
# App starts at http://localhost:5173
```

---

## Environment Variables

### Server (.env)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `3000` |
| `NODE_ENV` | Environment (`development` / `production`) | `development` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `supersecretkey123` |
| `GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID | `123456.apps.googleusercontent.com` |
| `XENDIT_API_KEY` | Xendit API secret key | `xnd_development_...` |
| `XENDIT_VERIFICATION_TOKEN` | Xendit webhook verification token | `abc123` |
| `GMAIL_USER` | Gmail address for sending emails | `yourapp@gmail.com` |
| `GMAIL_PASS` | Gmail App Password (not account password) | `xxxx xxxx xxxx xxxx` |
| `IMAGE_KIT_KEY` | ImageKit private API key | `private_...` |

### Client (.env)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend server | `http://localhost:3000` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID (same as server) | `123456.apps.googleusercontent.com` |

---

## Database

### Database Config (`src/config/config.json`)

```json
{
  "development": {
    "username": "postgres",
    "password": "root",
    "database": "bimble_revamp",
    "host": "localhost",
    "dialect": "postgres",
    "port": 5433
  }
}
```

### Schema Overview

| Table | Description |
|---|---|
| `Users` | Registered users with `name`, `email`, `password` (hashed), `role` (`User`/`Admin`) |
| `Categories` | Course categories (unique name) |
| `Courses` | Courses with `name`, `description`, `price`, `thumbnailUrl`, `difficulty` (enum), `status` (enum), `CategoryId` |
| `Videos` | Videos belonging to a course — `name`, `videoUrl`, `CourseId` |
| `UserCourses` | Enrollment join table — `UserId`, `CourseId`, `isPaid`, `chargeId`, `referenceId` |
| `Comments` | Video comments — `comment`, `UserId`, `VideoId` |
| `Ratings` | Course ratings — `rating` (1–10), `UserId`, `CourseId` |

### Relationships

```
User ─────────┬── M:M ──── Course  (through UserCourses)
              ├── 1:N ──── Comment
              └── 1:N ──── Rating

Category ─────── 1:N ──── Course

Course ────────┬── 1:N ──── Video
               └── 1:N ──── Rating

Video ─────────── 1:N ──── Comment
```

### Migration Commands

```bash
# Run all pending migrations
npm run db:migrate

# Full reset (drop → create → migrate → seed)
npm run db:reset

# Migrations only (no seed)
npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate
```

---

## API Reference

All requests to protected routes must include the header:
```
access_token: <your_jwt_token>
```

---

### Public Endpoints

> No authentication required

| Method | URL | Description |
|---|---|---|
| `POST` | `/public/register` | Register a new user |
| `POST` | `/public/login` | Login with email and password |
| `POST` | `/public/google-login` | Login with Google ID token |
| `GET` | `/public/courses` | List active courses (with filters & pagination) |
| `GET` | `/public/courses/:courseId` | Get course detail (first video unlocked) |
| `GET` | `/public/categories` | List all categories |
| `GET` | `/public/ratings/:courseId` | Get average rating for a course |

**Query parameters for `GET /public/courses`:**

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (12 courses per page) |
| `search` | string | Filter by course name (case-insensitive) |
| `categoryId` | number | Filter by category ID |
| `difficulty` | string | `easy` / `medium` / `hard` |
| `price` | string | `asc` (low→high) / `desc` (high→low) |

**Example response — `GET /public/courses`:**
```json
{
  "courses": [...],
  "totalCourses": 42,
  "totalPages": 4,
  "currentPage": 1
}
```

---

### Protected User Endpoints

> Requires valid JWT (`access_token` header)

| Method | URL | Description |
|---|---|---|
| `GET` | `/public/me` | Get current user profile |
| `PUT` | `/public/me` | Update name and email |
| `GET` | `/public/my-courses` | List all paid enrolled courses |
| `GET` | `/public/my-courses/:courseId` | Get enrolled course with all videos |
| `POST` | `/public/my-courses/:courseId` | Enroll in a course (creates UserCourse, isPaid=false) |
| `POST` | `/public/comments/:videoId` | Add a comment to a video (must be paid) |
| `GET` | `/public/ratings/user/:courseId` | Get the current user's rating for a course |
| `POST` | `/public/ratings/:courseId` | Submit a rating 1–10 (must be paid, one per user) |

---

### Admin Endpoints

> Requires JWT + `role: "Admin"`

| Method | URL | Description |
|---|---|---|
| `GET` | `/admin/users` | List all users (passwords excluded) |
| `GET` | `/admin/courses` | List all courses (paginated, searchable) |
| `GET` | `/admin/courses/:courseId` | Get course with videos |
| `POST` | `/admin/courses` | Create course + upload videos (multipart/form-data) |
| `PUT` | `/admin/courses/:courseId` | Update course details |
| `PATCH` | `/admin/courses/:courseId/status` | Toggle active/inactive |
| `GET` | `/admin/categories` | List all categories |
| `POST` | `/admin/categories` | Create a category |
| `DELETE` | `/admin/categories/:categoryId` | Delete category + all its courses |
| `POST` | `/admin/videos/:courseId` | Upload a video to a course (multipart/form-data) |
| `GET` | `/admin/videos/:videoId` | Get video details |
| `PATCH` | `/admin/videos/:videoId` | Rename a video |
| `DELETE` | `/admin/videos/:videoId` | Delete a video |
| `DELETE` | `/admin/comments/:commentId` | Delete a user comment |

---

### Payment Endpoints

| Method | URL | Auth | Description |
|---|---|---|---|
| `POST` | `/ovo/charge` | JWT required | Initiate OVO charge via Xendit |
| `POST` | `/ovo/status` | Xendit token | Xendit webhook — marks `isPaid: true` on success |

**`POST /ovo/charge` body:**
```json
{
  "phoneNumber": "+628123456789",
  "userCourseId": 5
}
```

---

## Client Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/about` | About | Public |
| `/courses` | Course catalog | Public (non-admin) |
| `/courses/:courseId` | Course detail & preview | Public (non-admin) |
| `/login` | Login | Guests only |
| `/register` | Register | Guests only |
| `/buy/:courseId` | OVO payment | Users only |
| `/my-courses` | My enrolled courses | Users only |
| `/my-courses/:courseId` | Video player | Users only |
| `/profile` | Edit profile | Users only |
| `/admin` | Admin dashboard | Admins only |
| `/admin/courses` | Course table | Admins only |
| `/admin/courses/add` | Create course | Admins only |
| `/admin/courses/:id` | Course detail & video list | Admins only |
| `/admin/courses/:id/edit` | Edit course | Admins only |
| `/admin/courses/:id/add-video` | Upload video | Admins only |
| `/admin/videos/:id/edit` | Rename video | Admins only |
| `/admin/categories` | Manage categories | Admins only |
| `/admin/users` | User list | Admins only |

---

## Authentication

Bimble uses **JWT (JSON Web Tokens)** for stateless authentication.

**Flow:**
1. User logs in via `POST /public/login` or `POST /public/google-login`
2. Server returns `{ access_token, role, name }`
3. Client stores token in `localStorage` and in the Pinia `auth` store
4. Axios interceptor automatically attaches `access_token` header to every request
5. On 401 response, interceptor clears localStorage and redirects to `/login`
6. Token expires in **7 days**

**Route guards** (client-side):
- `meta: { requiresAuth: true }` — redirects to `/login` if not authenticated
- `meta: { requiresAdmin: true }` — redirects to `/` if role is not `Admin`
- `meta: { requiresUser: true }` — redirects to `/` if role is not `User`
- `/login`, `/register` — redirect to `/` if already logged in

---

## Payment Flow (OVO via Xendit)

```
User clicks "Purchase Course"
         ↓
Client POSTs to /public/my-courses/:courseId
  → Creates UserCourse record (isPaid = false)
         ↓
Client POSTs to /ovo/charge with phone number + userCourseId
  → Server calls Xendit API → Xendit pushes payment request to OVO app
  → Server saves chargeId + referenceId to UserCourse
         ↓
User approves payment in OVO app
         ↓
Xendit sends POST webhook to /ovo/status
  → Server verifies x-callback-token header
  → Server sets UserCourse.isPaid = true
         ↓
User can now access full course content
```

> **Note:** The `/ovo/status` webhook URL must be registered in the Xendit dashboard and must be publicly accessible (use [ngrok](https://ngrok.com/) for local development).

---

## Design System

The client uses a custom Tailwind design system defined in `src/style.css`.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `primary-600` | `#4F46E5` | Buttons, links, active states |
| `primary-50` | `#EEF2FF` | Hover backgrounds, badges |
| `brand-500` | `#F97316` | CTA buttons, logo, accent |
| `brand-600` | `#EA580C` | Hover on brand buttons |

### Reusable Component Classes

```css
/* Buttons */
.btn-primary   /* Indigo filled button */
.btn-brand     /* Orange filled button (main CTA) */
.btn-outline   /* Gray bordered button */
.btn-danger    /* Red filled button */

/* Form */
.input-field   /* Consistent input/select/textarea style */

/* Layout */
.card          /* White rounded card with shadow */

/* Badges */
.badge-easy      /* Green pill */
.badge-medium    /* Yellow pill */
.badge-hard      /* Red pill */
.badge-active    /* Green pill */
.badge-inactive  /* Gray pill */
```

### Typography

| Font | Usage |
|---|---|
| **Inter** | Body text, UI elements |
| **Poppins** | Headings (`font-heading` class) |

---

## YouTube Video Integration

Bimble supports two video source types for every course video — admins can choose per-video.

### How it works

| Source | Storage | Use case |
|---|---|---|
| **YouTube URL** | Stored as embed URL in `youtubeUrl` column | Free videos already on YouTube; no storage cost |
| **MP4 Upload** | Uploaded to ImageKit; stored in `videoUrl` column | Proprietary content, unlisted recordings |

A video record must have **at least one** of `videoUrl` or `youtubeUrl` — enforced at the model level.

### YouTube URL formats accepted

The server normalises any of these to the embed format before saving:

```
https://www.youtube.com/watch?v=VIDEO_ID   →  https://www.youtube.com/embed/VIDEO_ID
https://youtu.be/VIDEO_ID                  →  https://www.youtube.com/embed/VIDEO_ID
https://www.youtube.com/embed/VIDEO_ID     →  (unchanged)
```

### Admin flow

1. **Add Course** — each video slot has a **YouTube URL / Upload MP4** toggle
2. **Add Video** — same toggle, with live thumbnail preview while typing the YouTube URL
3. **Edit Video** — if the video uses YouTube, the URL field is editable; if MP4, only the name is editable
4. **Course Detail (admin)** — each video row shows a `YT` (red) or `MP4` (blue) badge

### Client rendering

The `videoSrc()` composable (`src/composables/useYoutube.js`) resolves the correct src for the iframe:

```js
// Prefers youtubeUrl, falls back to videoUrl
export function videoSrc(video) {
  if (video?.youtubeUrl) return video.youtubeUrl  // already embed format
  if (video?.videoUrl)   return video.videoUrl
  return null
}
```

The `<iframe>` in both `CourseDetailView` and `MyCourseDetailView` uses this helper, so it plays YouTube videos and ImageKit uploads identically.

### Migration

Run the migration to add the `youtubeUrl` column and make `videoUrl` nullable:

```bash
cd bimble-revamp/server
npx sequelize-cli db:migrate
# Runs: 20240101000008-add-youtube-url-to-videos.js
```

To roll back:
```bash
npx sequelize-cli db:migrate:undo
```

---

## Improvements Over Original

| Area | Original (bimble-client/server) | Revamp |
|---|---|---|
| **Vue version** | Vue 2.6 (Options API) | Vue 3.4 (`<script setup>`) |
| **Build tool** | Vue CLI (Webpack) | Vite 5 (ESBuild — 10-100× faster) |
| **State management** | Vuex (boilerplate-heavy) | Pinia (lightweight, devtools-friendly) |
| **Styling** | Bootstrap + per-component CSS | Tailwind CSS (consistent design system) |
| **Routing** | Vue Router 3 | Vue Router 4 (lazy loaded routes) |
| **Notifications** | SweetAlert2 loading modals | Toast notifications (non-blocking) |
| **API layer** | Token attached per-request in Vuex | Axios interceptor (automatic, global) |
| **Express version** | Express 4.17 | Express 5.0 (native async errors) |
| **Security** | CORS only | CORS + Helmet + Rate Limiting |
| **Logging** | None | Morgan HTTP request logger |
| **DB config** | Root-level config + models | `src/` structured with `.sequelizerc` |
| **Error handling** | if/else chain | Map-based lookup (O(1)) |
| **Admin status toggle** | Full PATCH via status field | Dedicated `PATCH /courses/:id/status` endpoint |
| **Course ratings** | Separate API call for average | Computed inline in course detail response |
| **Token expiry** | Never expires | 7-day expiry |
| **File upload UX** | Basic file input | Drag-area with file name + size preview |
| **Search** | Manual submit button | Debounced auto-search (400ms) |
| **Pagination** | Jump-to-page numbers | Prev / page numbers / Next with scroll-to-top |
