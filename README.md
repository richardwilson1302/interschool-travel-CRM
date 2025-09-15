# Interschool Travel CRM

A comprehensive Customer Relationship Management system for educational travel companies to manage schools, tours, bookings, and suppliers.

## Features

- **School Management**: Track school contacts and information
- **Tour Management**: Create and manage educational tours with detailed itineraries
- **Booking System**: Handle enquiries through to completed bookings
- **Supplier Network**: Manage accommodation, attraction, and activity providers
- **Activity Tracking**: Log communications and interactions
- **Dashboard Analytics**: View booking pipeline and key metrics

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd interschool-travel-crm
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

## Deployment

### Netlify Deployment

This project is configured for easy deployment to Netlify:

#### Option 1: Netlify Drop
1. Build the project: `npm run build`
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag and drop the `dist` folder

#### Option 2: Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`

#### Option 3: Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables for Production

In your Netlify dashboard, add these environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Database Setup

The application uses Supabase with the following main tables:
- `schools`: Educational institutions
- `trips`: Tour offerings
- `bookings`: Booking records with status tracking
- `suppliers`: Service providers
- `excursions`: Activities and attractions
- `booking_excursions`: Link between bookings and excursions
- `activities`: Communication and interaction logs

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for educational travel management.