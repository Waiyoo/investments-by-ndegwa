# Ndegwa Investments

Ndegwa Investments is a professional, secure, full-stack wealth management and investment opportunity platform designed to showcase high-value investment portfolios, real estate, private equity, and fixed-income ventures. It enables institutional and retail investors to explore vetted opportunities, inspect financial metrics and legal documentation, and securely submit investment inquiries.

## Project Purpose
The platform bridges the gap between high-yield investment opportunities and prospective investors in Kenya and globally. It provides a transparent, responsive, and secure digital storefront for browsing investment assets while offering administrators a robust content management and CRM interface.

## What Ndegwa Investments Does Through the Website
- **Public Discovery:** Displays curated investment opportunities complete with financial targets, risk profiles, asset classifications, minimum commitments, projected returns, and progress indicators.
- **Investor Engagement:** Allows prospective investors to submit structured inquiries regarding specific opportunities or general portfolio allocation.
- **Secure Administration:** Provides a private admin portal for managing investment listings, asset metadata, investor inquiries, document attachments, and system configurations.

## Public Website Functionality
- **Dynamic Homepage:** Hero section, featured investments ticker, value proposition, and quick links.
- **Investment Directory (`/investments`):** Comprehensive listing with keyword search, category filters (Real Estate, Private Equity, Fixed Income, Agriculture, Energy, etc.), risk level filters, and sorting by return rate or minimum investment.
- **Investment Detail Pages (`/investments/[slug]`):** Detailed breakdown featuring financial highlights, lifecycle status, photo galleries, downloadable offering memorandums/documents, and an integrated inquiry form.
- **Inquiry Submission:** Modal and page-level forms capturing investor details, investment capacity, and custom messages with instant validation.
- **Theme Customization:** Seamless toggle between Light, Dark, and System preference themes.

## Admin Functionality
- **Secure Authentication:** Protected `/admin` gateway with rate limiting, password hashing, and secure session management.
- **Dashboard Overview:** High-level metrics showing total active investments, pending inquiries, total capital sought, and recent system activity.
- **Investment CRUD:** Full lifecycle management (Create, Read, Update, Delete, Archive, Publish/Unpublish) for investment assets.
- **Inquiry Management:** Centralized CRM view to review, filter, update status (Pending, Contacted, Converted, Archived), and add private internal notes.
- **Document & Media Management:** Upload, organize, and attach PDFs, prospectuses, and image galleries.
- **Global Settings:** Configure company profile information, contact numbers, and SEO metadata.

## Technology Stack
- **Framework:** Next.js (App Router, Server Actions, TypeScript)
- **Styling:** TailwindCSS, Lucide Icons, Radix UI primitives
- **Database & ORM:** PostgreSQL (via Supabase), Prisma ORM
- **Authentication:** Custom JWT-based secure session cookies with bcrypt password hashing
- **File Storage:** Supabase Storage
- **Email Delivery:** Resend API

## Architecture
The application follows a monolithic Next.js App Router architecture combining server-rendered public pages with secure Server Actions and API route handlers. Database interactions are handled exclusively server-side via Prisma Client, ensuring zero database credentials or secret keys leak to the client bundle.