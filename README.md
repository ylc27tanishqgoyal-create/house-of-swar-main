# 🎵 House of Swar

**House of Swar** is an immersive web application celebrating the rich heritage of Indian classical music and traditional instruments. This platform serves as a comprehensive hub for music enthusiasts, offering instrument exploration, raga learning, and instrument care management.

## 🌟 Features

### 🎼 Core Modules

1. **Landing Page (Sanctuary)**
   - Beautiful animated hero section with traditional Indian instrument (Sitar)
   - Smooth entrance experience with cultural aesthetics
   - Personalized welcome for logged-in users

2. **Instrument Store**
   - Browse curated collection of traditional Indian instruments
   - Detailed product pages with specifications
   - High-quality visuals and descriptions
   - Categories: String, Percussion, Wind instruments

3. **Raga Explorer**
   - Interactive raga learning system
   - Audio playback for each raga
   - Detailed information about:
     - Thaat (parent scale)
     - Timing (appropriate time of day)
     - Mood and emotional characteristics
     - Aroha (ascending notes) and Avaroha (descending notes)
   - Featured ragas: Yaman, Bhairav, Bhairavi, Darbari Kanada, and more

4. **Learning Center**
   - Comprehensive tutorials for various instruments
   - Structured lessons from beginner to advanced
   - Practical exercises and techniques
   - Video integration support

5. **Instrument Care (Maintenance)**
   - Personal instrument registry
   - Track maintenance schedules
   - Care reminders and best practices
   - User-specific instrument management with Supabase integration

6. **User Profile**
   - Secure authentication system
   - Profile management
   - Session handling

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Lucide React
- **Backend**: Supabase (Authentication & Database)
- **State Management**: React Hooks (useState)
- **Routing**: Custom state-based navigation

## 🎨 Design Philosophy

- **Rich Cultural Aesthetics**: Vibrant gradients and traditional color palettes
- **Smooth Animations**: Engaging micro-interactions and transitions
- **Premium UI/UX**: Modern, responsive design with glassmorphism effects
- **Accessibility**: Semantic HTML and proper heading structure

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/house-of-swar.git
   cd house-of-swar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Configure Supabase** (Optional, for instrument care feature)
   
   Update `src/lib/supabaseClient.ts` with your Supabase credentials:
   ```typescript
   const supabaseUrl = 'your-supabase-url'
   const supabaseAnonKey = 'your-supabase-anon-key'
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000/house-of-swar/
   ```

## 🏗️ Build for Production

```bash
npm run build
```

The optimized build will be generated in the `dist` folder.

## 🚀 Deployment

This app can be deployed on:
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## 📂 Project Structure

```
house-of-swar/
├── components/          # Reusable UI components
│   ├── Hero.tsx        # Landing page hero section
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Login.tsx       # Authentication component
│   └── Sitar.tsx       # Animated Sitar component
├── pages/              # Main application pages
│   ├── Care.tsx        # Instrument maintenance
│   ├── Learning.tsx    # Learning center
│   ├── ProductDetail.tsx
│   ├── Profile.tsx     # User profile
│   ├── RagaExplorer.tsx
│   └── Store.tsx       # Instrument marketplace
├── utils/              # Utility functions
├── constants.tsx       # App constants and data
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main app component
└── index.tsx          # Entry point
```

## 🎯 Key Features Explained

### Authentication Flow
- Secure login with validation
- Full name, email, and mobile number required
- Session persistence
- Profile management and logout

### Instrument Care System
- Add instruments to personal collection
- Track purchase date and maintenance schedule
- Set maintenance reminders (weekly, monthly, quarterly, yearly)
- Data persisted in Supabase database
- User-specific instrument management

### Raga Learning
- Curated collection of major ragas
- Audio playback integration
- Detailed theoretical information
- Time-based recommendations

## 🗄️ Backend Architecture

### Supabase Integration

This application uses **Supabase** as the backend-as-a-service platform, providing:

#### Database Tables

**instruments_care** table:
- `id` (UUID, Primary Key)
- `user_email` (Text) - Links to authenticated user
- `instrument_name` (Text)
- `instrument_type` (Text)
- `purchase_date` (Date)
- `maintenance_schedule` (Text) - weekly/monthly/quarterly/yearly
- `last_maintenance` (Timestamp)
- `notes` (Text)
- `created_at` (Timestamp)

#### Implemented CRUD Operations

1. **CREATE**: Add new instruments to user's collection
   ```typescript
   await supabase.from('instruments_care').insert([instrumentData])
   ```

2. **READ**: Fetch user-specific instruments
   ```typescript
   await supabase.from('instruments_care')
     .select('*')
     .eq('user_email', userEmail)
   ```

3. **UPDATE**: Update instrument maintenance records
   ```typescript
   await supabase.from('instruments_care')
     .update({ last_maintenance: new Date() })
     .eq('id', instrumentId)
   ```

4. **DELETE**: Remove instruments from collection
   ```typescript
   await supabase.from('instruments_care')
     .delete()
     .eq('id', instrumentId)
   ```

#### Security Features
- Row Level Security (RLS) policies implemented
- User-specific data isolation
- Secure API key management
- Public anon key for client-side operations

#### Real-time Capabilities
- Instant data synchronization
- Live updates when instruments are added/modified
- Persistent storage across sessions

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Optional |

## 🌐 Live Demo

🔗 **[View Live Application](YOUR-DEPLOYMENT-URL-HERE)**

## 👨‍💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Assignment Context

This project was created as part of a web development assignment to demonstrate:
- Modern React development practices
- TypeScript integration
- State management
- API integration (Supabase)
- Responsive design principles
- User authentication
- Database operations (CRUD)
- Component-based architecture

## 🎓 Learning Outcomes

Through this project, the following skills were demonstrated:
- Building complex React applications
- Managing application state effectively
- Implementing user authentication
- Database integration and management
- Creating responsive, accessible interfaces
- Working with modern build tools (Vite)
- TypeScript for type safety
- Component reusability and composition

## 🤝 Contributing

This is an educational project. Feedback and suggestions are welcome!

## 📄 License

This project is created for educational purposes.

## 🙏 Acknowledgments

- Indian classical music tradition
- Supabase for backend infrastructure
- React and Vite communities
- Lucide for beautiful icons

---

**Made with ❤️ and deep respect for Indian classical music tradition**
