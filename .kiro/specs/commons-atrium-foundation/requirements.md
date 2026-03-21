# Requirements Document

## Introduction

Commons Atrium is a member-only self-improvement web platform. The website serves as the entry point, account/membership layer, control center, tool access hub, download/setup hub, and lightweight bridge to internal subsystems. Core product experiences (workout system, reading system) live in the mobile app. This document covers the foundational backend infrastructure: database schema, authentication, route protection, real session state, and the membership-first signup flow.

## Glossary

- **System**: The Commons Atrium web platform (Next.js application)
- **User**: A person with a registered account in the System
- **Guest**: An unauthenticated visitor with no active session
- **Member**: A User with an active paid Membership record
- **Membership**: A record linking a User to a paid subscription status (inactive or active)
- **Session**: A server-side or token-based auth state that persists a User's identity across requests
- **Access_Key**: A one-time-use, paid-only generated key used to activate browser extensions
- **Activation_Record**: A record binding an Access_Key to a User and device after first use
- **DB**: The MariaDB relational database accessed via Prisma ORM
- **Prisma**: The ORM layer used to define schema and query the DB
- **Password_Hash**: A bcrypt-hashed representation of a User's password, never stored in plaintext
- **Protected_Route**: An internal page that requires an authenticated session to access
- **Public_Route**: A page accessible without authentication (/login, /signup, /start-membership)

---

## Requirements

### Requirement 1: Database Foundation

**User Story:** As a developer, I want a Prisma schema connected to MariaDB, so that the application has a structured, type-safe data layer to build all features on.

#### Acceptance Criteria

1. THE System SHALL include Prisma configured with the `mysql` provider targeting a MariaDB database.
2. THE DB SHALL contain a `User` model with fields: `id` (auto-increment integer), `email` (unique string), `passwordHash` (string), `displayName` (string), `createdAt` (DateTime), `updatedAt` (DateTime).
3. THE DB SHALL contain a `Membership` model with fields: `id` (auto-increment integer), `userId` (foreign key to User), `status` (enum: `inactive`, `active`), `createdAt` (DateTime), `updatedAt` (DateTime).
4. THE Prisma schema SHALL include commented-out placeholder model stubs for: `AccessKey`, `ActivationRecord`, `Announcement`, `BuildersGroup`, `VentPost` to signal future architecture.
5. WHEN the Prisma schema is migrated, THE DB SHALL reflect the `User` and `Membership` tables with correct constraints and indexes.
6. THE System SHALL expose a singleton Prisma client instance for use across server-side code.

---

### Requirement 2: Email/Password Authentication

**User Story:** As a visitor, I want to create an account with an email and password, so that I can access the internal member environment.

#### Acceptance Criteria

1. WHEN a signup request is submitted with a valid email and password, THE System SHALL create a `User` record with the password stored as a `passwordHash` using bcrypt.
2. WHEN a signup request is submitted with an email that already exists in the DB, THE System SHALL return a descriptive error without creating a duplicate record.
3. WHEN a login request is submitted with a valid email and matching password, THE System SHALL verify the credentials against the stored `passwordHash` and establish a Session.
4. IF a login request is submitted with an invalid email or non-matching password, THEN THE System SHALL return an authentication error without revealing which field is incorrect.
5. THE System SHALL persist Session state in a secure, httpOnly cookie so that authenticated status survives page navigation and browser refresh.
6. WHEN a User logs out, THE System SHALL invalidate the Session and clear the auth cookie.

---

### Requirement 3: Route Protection

**User Story:** As a platform operator, I want internal pages to require authentication, so that only registered users can access the member environment.

#### Acceptance Criteria

1. THE System SHALL classify `/login`, `/signup`, and `/start-membership` as Public_Routes accessible without a Session.
2. THE System SHALL classify `/dashboard`, `/tools`, `/access-key`, `/announcements`, `/groups`, and `/vent` as Protected_Routes.
3. WHEN a Guest navigates to a Protected_Route, THE System SHALL redirect the Guest to `/login`.
4. WHEN an authenticated User navigates to a Public_Route such as `/login` or `/signup`, THE System SHALL redirect the User to `/dashboard`.
5. WHILE a User is authenticated but has no active Membership, THE System SHALL allow access to Protected_Routes but SHALL keep paid-only actions locked within those pages.
6. THE System SHALL NOT fully hide internal pages from authenticated non-paying users; only paid-only actions within those pages SHALL be restricted.

---

### Requirement 4: Real Session and Membership State

**User Story:** As a developer, I want the application to derive UI state from real session and membership data, so that fake boolean flags are replaced with accurate, data-driven state.

#### Acceptance Criteria

1. THE System SHALL remove all hardcoded `isLoggedIn` and `isPaid` boolean flags from page components.
2. THE System SHALL provide a server-side mechanism to resolve the current User and Membership status from the active Session on each request.
3. WHEN a page component requires auth state, THE System SHALL supply `isLoggedIn` and `isPaid` values derived from the Session and Membership record in the DB.
4. THE System SHALL preserve existing UI behavior and layout after replacing fake state with real state.
5. IF no active Session exists when a server-side auth check runs, THEN THE System SHALL treat the request as unauthenticated without throwing an unhandled error.

---

### Requirement 5: Membership-First Signup Flow

**User Story:** As a new visitor, I want the signup process to guide me toward membership, so that the platform's member-first model is reflected in the onboarding UX.

#### Acceptance Criteria

1. WHEN a User completes account creation via `/signup`, THE System SHALL redirect the User to `/start-membership` before granting access to the internal environment.
2. THE System SHALL create a `Membership` record with `status: inactive` at the time of User account creation.
3. WHEN a User's Membership is manually activated (placeholder for future Stripe integration), THE System SHALL update the `Membership` record `status` to `active`.
4. THE `/start-membership` page SHALL present a clear call-to-action for membership activation and SHALL function as a placeholder for future Stripe checkout integration.
5. WHEN an authenticated User with `status: active` navigates to `/start-membership`, THE System SHALL redirect the User to `/dashboard`.
6. THE System SHALL NOT implement Stripe or payment processing in this phase; membership activation SHALL be achievable via a manual DB update or a placeholder admin action.
