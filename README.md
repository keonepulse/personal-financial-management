# Personal Financial Management

A full-stack personal finance application that lets users securely connect their bank accounts and see their entire financial landscape in one place. The dashboard provides detailed visualizations of cash flows, transactions, account balances, and net worth, helping users understand their spending habits and make informed financial decisions.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Demo Mode](#demo-mode)
- [Testing](#testing)
- [Available Scripts](#available-scripts)
- [License](#license)

## Overview

The application consists of two independent packages:

- **Client** — a React single-page application (Create React App) styled with Tailwind CSS. It renders the dashboard pages — Accounts, Cash Flow, Overview, and Transactions — with interactive charts, skeleton loading states, and toast notifications.
- **Server** — a Node.js / Express REST API that integrates with the Plaid API to link financial institutions, fetch balances, and sync transactions. Linked accounts and transaction data are persisted in MongoDB through Mongoose, with request validation handled by Joi.

## Features

- **Bank Account Linking** — connect financial institutions securely through Plaid Link, including re-authentication flows for expired connections.
- **Account Balances** — view balances across all linked accounts with automatic refresh support.
- **Net Worth Summary** — an aggregated view of assets and liabilities across every linked account.
- **Cash Flow Analysis** — visual breakdowns of income and spending over time.
- **Transaction Management** — browse, search, and edit synced transactions in a sortable table.
- **Data Visualizations** — interactive charts for balances, cash flows, and spending patterns.
- **Demo Mode** — run the entire application against realistic mock data, with no MongoDB cluster or live bank connection required.
- **Robust UX** — skeleton loading states, toast notifications, and graceful network-error handling.

## Tech Stack

### Client

| Technology | Purpose |
|---|---|
| React 18 | UI library |
| Create React App | Build tooling |
| Tailwind CSS | Utility-first CSS framework |
| React Router | Client-side routing |
| React Google Charts | Data visualizations |
| React Plaid Link | Plaid Link integration |
| Axios | HTTP client |
| React Toastify | Notifications |
| React Loading Skeleton | Loading states |
| Jest / Testing Library | Testing |

### Server

| Technology | Purpose |
|---|---|
| Node.js / Express | HTTP server and REST API |
| MongoDB / Mongoose | Database and ODM |
| Plaid API | Bank connections, balances, transactions |
| Joi | Request validation |
| Axios | HTTP client for external calls |
| Jest / Supertest / Mockingoose | Testing |

## Architecture

```
┌────────────────┐       REST (JSON)       ┌────────────────┐        ┌────────────────┐
│     Client     │ ──────────────────────► │     Server     │ ─────► │    MongoDB     │
│  React (3000)  │ ◄────────────────────── │ Express (8080) │ ◄───── │   (Mongoose)   │
└───────┬────────┘                         └───────┬────────┘        └────────────────┘
        │                                          │
        │            Plaid Link token              ▼
        └───────────────────────────────► ┌────────────────┐
                                          │   Plaid API    │
                                          └────────────────┘
```

- The client requests a link token from the server, opens Plaid Link, and exchanges the resulting public token through the server for an access token.
- The server uses stored access tokens to fetch balances and transactions from Plaid, persisting them in MongoDB.
- In demo mode the server skips MongoDB and Plaid entirely, serving generated mock data through the same endpoints.

## Project Structure

```
.
├── client/
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Sidebar, tables, summaries, link buttons, UI, charts
│   │   ├── hooks/               # Custom React hooks
│   │   ├── pages/               # Accounts, CashFlow, Overview, Transactions
│   │   ├── store/               # Client-side state
│   │   └── utils/               # Shared helpers
│   └── tests/                   # Frontend tests
└── server/
    ├── db.js                    # MongoDB connection
    ├── index.js                 # App entry point
    ├── middleware/              # Route middleware (links, plaid, validation)
    ├── models/                  # Mongoose models (Link, Account, Transaction)
    ├── routes/                  # Express routers (/links, /plaid)
    ├── utils/                   # Helpers and mock-data generators
    └── tests/                   # Backend tests
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/links` | Get all linked accounts with balances and transactions |
| POST | `/links` | Create a new account link |
| PUT | `/links/:id/balance` | Refresh balances for a link |
| PUT | `/links/:id/...` | Update link details or transactions |
| DELETE | `/links/:id` | Remove a linked account |
| POST | `/plaid/link_token` | Create a Plaid Link token |
| POST | `/plaid/reauthentication_link_token` | Create a token for re-authentication |
| POST | `/plaid/access_token` | Exchange a public token for an access token |

## Getting Started

### Prerequisites

- Node.js 10 or later and npm (or Yarn)
- A MongoDB database (local instance or a cloud-hosted cluster) — optional if using demo mode
- Plaid API credentials (client ID and secret) — optional if using demo mode

### Installation

Install dependencies for both packages:

```bash
cd server
npm install

cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory (see `.env.sample` for reference):

| Variable | Description |
|---|---|
| `PLAID_CLIENT_ID` | Plaid client ID |
| `PLAID_SECRET` | Plaid secret for the chosen environment |
| `PLAID_ENV` | Plaid environment (`sandbox`, `development`, or `production`) |
| `PLAID_PRODUCTS` | Comma-separated Plaid products (e.g. `transactions`) |
| `PLAID_COUNTRY_CODES` | Comma-separated country codes (e.g. `US`) |
| `MONGODB_CLUSTER_URL` | MongoDB connection string |
| `PORT` | Server port (optional, defaults to `8080`) |

All user information is stored in the specified MongoDB cluster.

### Running the Application

Start the server:

```bash
cd server
npm run start
```

The API runs at `http://localhost:8080`.

In a separate terminal, start the client:

```bash
cd client
npm run start
```

Open `http://localhost:3000` in your browser, link your bank accounts, and start tracking your finances.

### Demo Mode

To explore the application without a MongoDB cluster or Plaid credentials, run the server in demo mode:

```bash
cd server
npm run start:demo
```

Demo mode serves realistic mock accounts, balances, and transactions through the same API, so the full dashboard works out of the box.

## Testing

Both packages use Jest:

```bash
# Server (uses Supertest and Mockingoose)
cd server
npm test

# Client (uses Testing Library)
cd client
npm test
```

## Available Scripts

### Server

| Script | Description |
|---|---|
| `npm run start` | Start the API server |
| `npm run start:demo` | Start the server in demo mode with mock data |
| `npm test` | Run backend tests in watch mode |

### Client

| Script | Description |
|---|---|
| `npm run start` | Run the app in development mode |
| `npm run build` | Build the app for production |
| `npm test` | Run frontend tests in watch mode |
| `npm run eject` | Eject the Create React App configuration |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
