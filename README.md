# Make.co - AI-Powered E-Commerce Product Creator

A free, open-source platform for creating, launching, and selling products with pre-orders. No monthly subscriptions, no hidden fees.

## Features

- 🤖 **AI Product Generation** - Auto-generate descriptions, images, and mockups
- 🎨 **Customizable Storefronts** - No-code storefront builder with templates
- 📋 **Pre-Order Management** - Multi-tier pricing, inventory tracking
- 💳 **Payment Processing** - Integrated Stripe for seamless transactions
- 📊 **Analytics Dashboard** - Real-time sales, traffic, and conversion tracking
- 📧 **Email Notifications** - Automated customer communications
- 🔗 **Social Sharing** - Built-in social media integration
- 🏭 **Supplier Integration** - Connect with print-on-demand and dropshipping partners
- 🔐 **Secure Auth** - Email/password and Google OAuth authentication
- 📱 **PWA Ready** - Progressive web app for mobile and desktop

## Supported Product Types

- Physical Products
- Digital Products (downloads, courses)
- Services

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- React Router v6
- Axios

### Backend
- Node.js + Express
- PostgreSQL
- Prisma ORM
- OpenAI API (ChatGPT)
- Stability AI / DALL-E (image generation)
- Stripe API
- SendGrid (email)
- JWT + OAuth 2.0

### Deployment
- Vercel (frontend)
- Railway/Render (backend)
- PostgreSQL (managed)

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- API Keys:
  - OpenAI API
  - Stripe (test & live)
  - Google OAuth credentials
  - SendGrid API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/Ntweiss1/Make.co.git
cd Make.co
```

2. Setup environment variables
```bash
cp .env.example .env.local
# Fill in your API keys and database URL
```

3. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

4. Setup database
```bash
cd backend
npx prisma migrate dev
```

5. Start development servers
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3001

## Project Structure

```
Make.co/
├── frontend/                 # React PWA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   └── package.json
├── backend/                  # Node.js Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── services/
│   ├── prisma/
│   └── package.json
├── docker-compose.yml
├── .env.example
└── SETUP.md
```

## Revenue Model

**Forever Free Core Features:**
- Product creation
- Storefront building
- Pre-order campaigns
- Order management

**Revenue Streams:**
- **Transaction fees** (2-3% per completed sale)
- **Premium add-ons:**
  - Advanced AI features
  - Premium templates
  - Priority support
  - API access
- **Affiliate commissions** from supplier partnerships
- **Optional sponsored marketplace listings**

## License

MIT License

## Support

- 📚 [Documentation](SETUP.md)
- 🐛 [Report Issues](https://github.com/Ntweiss1/Make.co/issues)
- 💬 [Discussions](https://github.com/Ntweiss1/Make.co/discussions)

---

Built with ❤️ for creators and entrepreneurs
