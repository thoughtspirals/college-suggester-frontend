# College Suggester Frontend

An Angular-based web application that helps students find suitable colleges based on their preferences and criteria. This frontend interfaces with the college suggester backend API to provide intelligent college recommendations.

## 🚀 Features

- **Interactive Landing Page** with hero section and features overview
- **Advanced Filtering System** for colleges based on various criteria
- **College Search & Discovery** with detailed information display
- **Responsive Design** optimized for desktop and mobile devices
- **User Authentication** with login and registration pages
- **Results Visualization** with paginated college listings
- **Modern UI/UX** with Angular Material components

## 🛠️ Tech Stack

- **Angular 18+** - Frontend framework
- **TypeScript** - Programming language
- **Angular Material** - UI component library
- **SCSS** - Styling
- **RxJS** - Reactive programming
- **Angular Router** - Navigation
- **HTTP Client** - API communication

## 📦 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── colleges-table/          # College listing table
│   │   ├── filter-panel/            # Search and filter controls
│   │   ├── common-components/       # Reusable components
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── navbar/
│   │   │   └── pagination/
│   │   └── landing-components/      # Landing page sections
│   │       ├── hero-section/
│   │       ├── features-section/
│   │       ├── input-form-section/
│   │       └── results-preview-section/
│   ├── pages/
│   │   ├── landing-page/           # Home page
│   │   ├── explore-colleges-page/  # Main search page
│   │   ├── about-us/              # About page
│   │   ├── login-page/            # User authentication
│   │   └── register-page/         # User registration
│   ├── services/
│   │   └── college.service.ts      # API service layer
│   └── assets/
│       ├── images/                 # Static images
│       └── logo.jpeg              # Application logo
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/thoughtspirals/college-suggester-frontend.git
   cd college-suggester-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Update the API base URL in the service files to point to your backend:
   ```typescript
   // src/app/services/college.service.ts
   private apiUrl = 'http://localhost:8000/api'; // Update this URL
   ```

4. **Start the development server**
   ```bash
   ng serve
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

## 🔧 Available Scripts

- `ng serve` - Start development server
- `ng build` - Build the project for production
- `ng test` - Run unit tests
- `ng lint` - Run linting
- `ng e2e` - Run end-to-end tests

## 🌐 API Integration

This frontend communicates with the College Suggester Backend API. Make sure to:

1. Start the backend server (FastAPI)
2. Update API endpoints in service files
3. Handle CORS configuration if needed

### Key API Endpoints Used

- `GET /colleges` - Fetch college listings
- `POST /suggest` - Get college recommendations
- `GET /filters` - Retrieve filter options
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration

## 📱 Components Overview

### Landing Components
- **Hero Section**: Main banner with call-to-action
- **Features Section**: Highlights key application features
- **Input Form Section**: Quick search form
- **Results Preview**: Sample college recommendations

### Core Components
- **Colleges Table**: Displays college data in tabular format
- **Filter Panel**: Advanced search and filtering options
- **Pagination**: Navigate through large datasets

### Common Components
- **Header/Footer**: Consistent navigation and branding
- **Navbar**: Primary navigation menu

## 🎨 Styling

The application uses:
- **SCSS** for component styling
- **Angular Material** for consistent UI components
- **Responsive Design** principles
- **Modern CSS Grid/Flexbox** layouts

## 🚀 Deployment

### Build for Production
```bash
ng build --prod
```

### Deploy to GitHub Pages
```bash
ng add angular-cli-ghpages
ng deploy --base-href=https://yourusername.github.io/college-suggester-frontend/
```

### Other Deployment Options
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **Firebase Hosting**: Use Firebase CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow Angular style guide
- Use TypeScript strict mode
- Write unit tests for components
- Use meaningful commit messages
- Keep components small and focused

## 🐛 Known Issues

- [ ] Mobile responsiveness needs improvement
- [ ] Loading states for API calls
- [ ] Error handling for network failures

## 🔮 Future Enhancements

- [ ] Progressive Web App (PWA) features
- [ ] Dark mode theme
- [ ] Advanced search filters
- [ ] College comparison feature
- [ ] User favorites/bookmarks
- [ ] Real-time notifications

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Team** - Initial work - [thoughtspirals](https://github.com/thoughtspirals)

## 🙏 Acknowledgments

- Angular team for the excellent framework
- Material Design team for UI components
- College data providers and APIs

## 📞 Support

For support, email your-email@domain.com or create an issue in this repository.

---

**Made with ❤️ for students seeking their perfect college match**
