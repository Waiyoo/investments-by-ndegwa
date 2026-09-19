---

## REQUIREMENTS.md

```markdown
# Software Requirements Specification (SRS)
## Ndegwa Investments Platform

---

### 1. Project Overview
Ndegwa Investments is a professional wealth management and investment opportunity portal built for the Kenyan and international investor market. Headquartered in Nairobi, Kenya, the firm connects capital with vetted high-yield opportunities across real estate, private equity, fixed income, agriculture, and energy.

### 2. Objectives
- Provide a transparent, high-performance digital catalog of investment opportunities.
- Streamline investor onboarding and inquiry submissions.
- Deliver an intuitive, secure administrative control panel for managing assets, inquiries, and content.
- Ensure strict compliance with security standards, data integrity, and responsive design guidelines.

### 3. Scope
The platform encompasses a public-facing web application for discovery and inquiries, a secure embedded administrative portal for content and CRM management, a PostgreSQL database managed via Prisma ORM, Supabase Storage integration, and Resend email communication workflows.

### 4. Users
- **Public Visitors / Prospective Investors:** Individuals and institutions browsing investment opportunities and submitting inquiries.
- **Administrators:** Internal staff managing investments, reviewing inquiries, uploading documents, and configuring platform settings.

### 5. User Roles
- **SUPER_ADMIN:** Full access to all system modules, administrator account management, global settings, and data exports.
- **ADMIN:** Operational access to create/edit investments, manage inquiries, and upload media/documents.

---

### 6. Functional Requirements

#### 6.1 Public Website Requirements
- **FR-PUB-01:** The system shall display a responsive homepage featuring hero messaging, featured investments, and value propositions.
- **FR-PUB-02:** The system shall provide an investment directory at `/investments` listing all published opportunities.
- **FR-PUB-03:** The system shall provide dedicated detail pages at `/investments/[slug]` showing complete investment metrics, descriptions, galleries, and documents.

#### 6.2 Investment Opportunity Requirements
- **FR-INV-01:** Each investment must record title, slug, summary, description, category, risk level, target raise, minimum investment, expected return rate, start date, and status.
- **FR-INV-02:** Investment statuses shall support `DRAFT`, `PUBLISHED`, `FULLY_FUNDED`, and `ARCHIVED`.

#### 6.3 Search & Filter Requirements
- **FR-SRCH-01:** Users shall be able to filter investments by category, risk level, and minimum investment threshold.
- **FR-SRCH-02:** Users shall be able to perform keyword searches across investment titles and summaries.

#### 6.4 Inquiry Requirements
- **FR-INQ-01:** Users shall be able to submit inquiries providing name, email, phone number (`+254 799 357 038`), intended investment amount, and message.
- **FR-INQ-02:** Inquiries must be validated on both client and server sides before persistence.

#### 6.5 Email Requirements
- **FR-MAIL-01:** The system shall send instant confirmation emails to investors upon inquiry submission.
- **FR-MAIL-02:** The system shall send notification alerts to administrators for new inquiries.
- **FR-MAIL-03:** Email failures shall not block or roll back successful database inquiry persistence.

#### 6.6 Admin Requirements
- **FR-ADM-01:** The admin portal shall reside at `/ndegwainvestments.com/admin` (or `/admin`).
- **FR-ADM-02:** The dashboard shall display summary metrics including total investments, active listings, and inquiry counts.

#### 6.7 Authentication Requirements
- **FR-AUTH-01:** Administrators must authenticate using email and password.
- **FR-AUTH-02:** Passwords must be hashed using bcrypt.
- **FR-AUTH-03:** Sessions must be maintained securely via HTTP-only encrypted cookies.

#### 6.8 Content & Media Management Requirements
- **FR-CMS-01:** Administrators shall be able to create, update, and delete investment records and categories.
- **FR-MED-01:** Administrators shall be able to upload images and PDF documents via Supabase Storage.

#### 6.9 Visibility Requirements
- **FR-VIS-01:** Only investments marked as `PUBLISHED` shall be visible on the public directory.
- **FR-VIS-02:** Unauthenticated requests to administrative API endpoints or pages must be rejected and redirected to login.

#### 6.10 Theme & Accessibility Requirements
- **FR-THEME-01:** The application shall support Light, Dark, and System theme preferences with persistent state.
- **FR-ACC-01:** Interactive elements must include accessible labels, keyboard navigation support, and high contrast ratios.

---

### 7. Non-Functional Requirements
- **NFR-01 (Performance):** Public pages shall load within 2 seconds under standard network conditions.
- **NFR-02 (Security):** All data in transit must be encrypted via TLS/HTTPS. Inputs must be sanitized and validated via Zod schemas.
- **NFR-03 (Reliability):** The database connection pool must handle concurrent connections gracefully via Prisma and Supabase.
- **NFR-04 (Scalability):** The stateless Next.js server architecture on Vercel must scale horizontally with traffic demand.

---

### 8. Acceptance Criteria
- Successful completion of the Prisma migration script (`npx prisma migrate deploy`).
- Successful execution of the Next.js production build (`npm run build`) with zero TypeScript or ESLint errors.
- Successful verification of public opportunity browsing, inquiry submission, admin authentication, and CRUD workflows.

---

### 9. Explicit Exclusions
This system explicitly **DOES NOT**:
- process investment payments
- hold investor funds
- provide investor accounts
- execute trades
- connect to forex brokers
- copy trades
- manage brokerage accounts
- provide forex functionality
- guarantee investment returns

---

### 10. Company Information
- **Company Name:** Ndegwa Investments
- **Contact Numbers:** 0799357038, +254 799 357 038
- **Location:** Nairobi, Kenya
- **Currency:** KSh
- **Company Email:** None supplied (intentionally omitted; not invented).
