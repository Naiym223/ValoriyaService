// Instructions: Create comprehensive README for the Valoriya Service project

# Valoriya Service - Premium Roblox Ranking Platform

A comprehensive Roblox ranking service platform built with Next.js, TypeScript, Firebase, and Tailwind CSS. Valoriya Service provides automated ranking tools, activity tracking, and group management for Roblox communities.

## 🌟 Features

### 🔐 Authentication System
- **Firebase Authentication** with email/password
- **Secure Registration** with email verification
- **Password Reset** functionality
- **Protected Routes** with role-based access

### 📊 Dashboard
- **Real-time Statistics** showing successful ranks, invalid requests, and failed requests
- **Game Key Management** with copy and regenerate functionality
- **Subscription Management** with expiration tracking
- **Activity Monitoring** and analytics

### 🎮 Roblox Integration
- **Application Center Module** - Automatically rank players when they apply
- **Ranking Center Module** - Rank players based on gamepass purchases
- **Activity Tracker Module** - Monitor player and staff activity
- **Downloadable Scripts** for easy integration

### 👑 Admin Panel
- **User Management** with search and filtering
- **Auth Key Generation** for distribution and management
- **System Analytics** and revenue tracking
- **Service Health Monitoring**

### 🎨 Design
- **Light Blue Gradient Theme** inspired by ranking.services
- **Responsive Design** for all device sizes
- **Smooth Animations** using Framer Motion
- **Modern UI Components** with shadcn/ui

## 🚀 Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Gradients
- **UI Components:** shadcn/ui + Radix UI
- **Authentication:** Firebase Auth
- **Database:** Firestore
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts
- **Package Manager:** Bun

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/naiym223/valoriya-service.git
   cd valoriya-service
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCjPifC8njhnEGiUrYKo5HiuiQd4dTny0k
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=valoriyaservice.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=valoriyaservice
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=valoriyaservice.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=973884239952
   NEXT_PUBLIC_FIREBASE_APP_ID=1:973884239952:web:valoriyaservice
   ```

4. **Run the development server:**
   ```bash
   bun run dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project with the provided credentials
2. Enable Authentication with Email/Password
3. Set up Firestore database
4. Configure security rules for your collections

### Roblox Integration
1. Create a Roblox group (if not already done)
2. Generate a Roblox API key for group management
3. Configure group permissions for the bot account

## 📁 Project Structure

```
valoriya-service/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Main dashboard
│   │   ├── admin/             # Admin panel
│   │   ├── modules/           # Roblox modules page
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   └── ui/                # shadcn/ui components
│   ├── contexts/              # React contexts
│   ├── lib/                   # Utility functions
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
└── README.md                  # This file
```

## 🎮 Roblox Modules

### Application Center Module
```lua
-- Place in ServerScriptService
local GAME_KEY = "YOUR_GAME_KEY_HERE"
-- Automatically ranks players when they apply
```

### Ranking Center Module
```lua
-- Place in ServerScriptService
local GAME_KEY = "YOUR_GAME_KEY_HERE"
-- Ranks players based on gamepass purchases
```

### Activity Tracker Module
```lua
-- Place in ServerScriptService
local GAME_KEY = "YOUR_GAME_KEY_HERE"
-- Monitors player activity and staff performance
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset

### User Management
- `GET /api/user` - Get user data
- `POST /api/user` - Create user
- `PUT /api/user` - Update user

### Ranking System
- `POST /api/ranking` - Process ranking request
- `GET /api/ranking` - Get ranking history

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `POST /api/admin/keys` - Generate auth keys (admin only)

## 🎨 Customization

### Theme Colors
The project uses a light blue gradient theme. You can customize colors in `tailwind.config.ts`:

```typescript
'valoriya-blue': {
  50: '#f0f9ff',
  100: '#e0f2fe',
  // ... more shades
}
```

### Animations
Custom animations are defined in `globals.css`:

```css
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.gradient-text {
  background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 🔐 Security Features

- **Firebase Authentication** for secure user management
- **Protected API Routes** with authentication middleware
- **Role-based Access Control** for admin features
- **Input Validation** and sanitization
- **Secure Game Key Generation** with cryptographic randomness
- **Rate Limiting** on API endpoints

## 📊 Analytics & Monitoring

- **Real-time Statistics** dashboard
- **User Activity Tracking** with detailed logs
- **Error Monitoring** and logging
- **Performance Metrics** for API endpoints
- **Revenue Analytics** for subscription tracking

## 🚀 Deployment

### Netlify Deployment
1. **Build the project:**
   ```bash
   bun run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository
   - Set build command: `bun run build`
   - Set publish directory: `out` (if using static export)

3. **Configure environment variables** in Netlify dashboard

### Environment Variables for Production
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_production_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=valoriyaservice.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=valoriyaservice
# ... other Firebase config

STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

ADMIN_EMAILS=admin@valoriya.service,your-email@example.com
```

## 🧪 Testing

Run the test suite:
```bash
bun run test
```

Run linting:
```bash
bun run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Discord Server:** [Join our community](https://discord.gg/valoriya)
- **Email Support:** support@valoriya.service
- **Documentation:** [docs.valoriya.service](https://docs.valoriya.service)

## 🙏 Acknowledgments

- **ranking.services** for design inspiration
- **Firebase** for authentication and database
- **shadcn/ui** for beautiful UI components
- **Vercel** for Next.js framework
- **Roblox** for the platform that makes this all possible

---

**Made with ❤️ by the Valoriya Team**

*Empowering Roblox communities with automated ranking solutions*