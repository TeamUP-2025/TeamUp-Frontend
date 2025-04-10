# TEAM UP Front End

# Installation Guide

## Prerequisites

- Node.js 22+ 
- pnpm 9.7.0+
- PostgreSQL 15+

## Environment Setup

1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```
2. Install dependencies
```bash
pnpm install
```
3. config a `.env` file in the root directory.

## Development

Start the development server:
```bash
pnpm dev
```
The application will be available at `http://localhost:3000`

### Configuration

Set the following environment variables:
- `JWT_SECRET`: JWT token secret for encrypting token
- `BACKEND_URL`: Project service's url for talking with project service
- `SOCKET_URL`: Chat service's url for talking with chat service

## Project Structure

- `/src` - Application source code
  - `/app` - Next.js app router pages and layouts
  - `/components` - React components
  - `/action` Server action
  - `/libs` - Utility functions and helpers
  - `/context` - Share context between component
- `/public` - Static assets
