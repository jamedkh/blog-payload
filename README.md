# Blog Payload

A modern, highly customizable blog template built with **Payload 3.0** (CMS) and **Next.js 15**. Designed for performance, scalability, and ease of use.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **CMS:** [Payload 3.0](https://payloadcms.com/)
- **Database:** MongoDB (via `@payloadcms/db-mongodb`)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Rich Text:** Payload Lexical Editor
- **Type Safety:** TypeScript

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- MongoDB connection string

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd blog-payload
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Environment Setup:**
    Copy the example environment file and fill in your details:

    ```bash
    cp .env.example .env
    ```

    Ensure you provide a valid `DATABASE_URI` (MongoDB connection string) and `PAYLOAD_SECRET`.

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The app will be available at `http://localhost:3000`.
    Payload Admin Panel: `http://localhost:3000/admin`.

## 🌱 Database Seeding

This project comes with scripts to populate your database with initial data (dummy posts, authors, media).

### Run Seeder

To seed the database with sample data:

```bash
pnpm seed
```

### Reset Database

To clear all data and reset the database:

```bash
pnpm seed:reset
```

> **Warning:** This will delete all entries in your database. Use with caution.

## 📜 Available Scripts

| Script                | Description                                         |
| :-------------------- | :-------------------------------------------------- |
| `pnpm dev`            | Starts the Next.js development server.              |
| `pnpm build`          | Builds the application for production.              |
| `pnpm start`          | Starts the production server.                       |
| `pnpm lint`           | Runs ESLint to check for code quality issues.       |
| `pnpm generate:types` | Generates TypeScript types for Payload collections. |
| `pnpm seed`           | Seeds the database with dummy content.              |
| `pnpm seed:reset`     | Resets the database (clears all data).              |

## 📂 Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── (frontend)/     # Frontend pages (blog, home, etc.)
│   └── (payload)/      # Payload admin pages
├── collections/        # Payload Collection definitions
│   ├── Posts/          # Blog posts logic, hooks, config
│   ├── Authors/        # Authors collection
│   └── Media/          # Media upload collection
├── components/         # React components (RichText, Cards, etc.)
├── scripts/            # Utility scripts (Seeding, migration)
└── payload.config.ts   # Main Payload configuration
```
