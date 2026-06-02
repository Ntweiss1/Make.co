# Make.co Development Setup Guide

## Prerequisites

Before starting, ensure you have:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))
- API Keys from:
  - [OpenAI](https://platform.openai.com/api-keys)
  - [Stability AI](https://platform.stability.ai/) (or DALL-E)
  - [Stripe](https://dashboard.stripe.com/)
  - [Google Cloud Console](https://console.cloud.google.com/) (OAuth)
  - [SendGrid](https://sendgrid.com/)
  - [AWS](https://aws.amazon.com/) (S3 for file uploads)

## Step 1: Clone the Repository

```bash
git clone https://github.com/Ntweiss1/Make.co.git
cd Make.co
```

## Step 2: Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Fill in all required API keys and secrets in `.env.local`

## Step 3: Database Setup

### Option A: Using Docker (Recommended)

1. Ensure Docker is installed
2. Start PostgreSQL:
```bash
docker-compose up -d
```

### Option B: Local PostgreSQL

1. Create a new database:
```sql
CREATE DATABASE makeco;
```

2. Update `DATABASE_URL` in `.env.local`

## Step 4: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

Backend runs at: `http://localhost:3001`

## Step 5: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:5173`

## Step 6: Database Exploration (Optional)

```bash
cd backend

# Open Prisma Studio to view database
npx prisma studio
```

Visit `http://localhost:5555` to manage data visually.

## API Keys Setup Details

### OpenAI API
1. Go to https://platform.openai.com/api-keys
2. Create new API key
3. Copy to `OPENAI_API_KEY` in `.env.local`

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:3001/api/auth/google/callback`
4. Copy Client ID and Secret

### Stripe
1. Go to https://dashboard.stripe.com/
2. Get test keys from Developers > API keys
3. Copy Publishable and Secret keys
4. Setup webhook: `http://localhost:3001/api/webhooks/stripe`

### SendGrid
1. Go to https://sendgrid.com/ and create account
2. Create API key from Settings > API Keys
3. Copy to `SENDGRID_API_KEY`

### AWS S3
1. Create AWS account and IAM user
2. Create S3 bucket
3. Copy Access Key ID and Secret Access Key
4. Create bucket policy for uploads

## Development Commands

### Backend
```bash
cd backend

# Start dev server
npm run dev

# Run tests
npm run test

# Lint code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Frontend
```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Lint code
npm run lint
```

## Troubleshooting

### Port Already in Use
- Backend (3001): `lsof -i :3001` then `kill -9 <PID>`
- Frontend (5173): `lsof -i :5173` then `kill -9 <PID>`

### Database Connection Error
- Verify PostgreSQL is running
- Check `DATABASE_URL` format
- Ensure database exists

### API Key Issues
- Double-check all keys in `.env.local`
- Ensure no extra spaces or quotes
- Verify API keys are active/not expired

### Migration Issues
```bash
cd backend
npx prisma migrate reset  # Resets database (dev only)
npx prisma db push       # Push schema without migration
```

## Next Steps

1. Explore `/frontend/src` for React components
2. Check `/backend/src/routes` for API endpoints
3. Review `/backend/prisma/schema.prisma` for database schema
4. Read API documentation at `/api/docs` (when backend running)

## Need Help?

- 📖 Check [README.md](README.md)
- 🐛 Open an [Issue](https://github.com/Ntweiss1/Make.co/issues)
- 💬 Start a [Discussion](https://github.com/Ntweiss1/Make.co/discussions)

---

Happy coding! 🚀
