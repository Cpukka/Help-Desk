# 🎫 Enterprise Help Desk & IT Service Management System

[![.NET](https://img.shields.io/badge/.NET-9.0-blue)](https://dotnet.microsoft.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed)](https://www.docker.com/)

A comprehensive, enterprise-grade Help Desk and IT Service Management System built with modern best practices, Clean Architecture, and full-stack development.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Database Setup](#-database-setup)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Overview

This Help Desk System provides a complete solution for managing IT support tickets, tracking performance metrics, and delivering real-time updates. Built with Clean Architecture and modern technologies, it's designed for scalability, maintainability, and enterprise-grade security.

### Live Demo

- **Frontend:** [https://helpdesk.example.com](https://helpdesk.example.com)
- **API Swagger:** [https://helpdesk-api.example.com/swagger](https://helpdesk-api.example.com/swagger)
- **Demo Credentials:** `admin@helpdesk.com` / `Admin@123`

## ✨ Features

### Core Features

- 🎫 **Ticket Management**
  - Create, assign, reassign, and escalate tickets
  - Priority and status tracking
  - Comments and attachments
  - SLA management
  - Due date tracking

- 📊 **Analytics Dashboard**
  - Real-time metrics and statistics
  - Interactive charts (Chart.js)
  - Trend analysis
  - Performance monitoring
  - Custom date ranges

- 📚 **Knowledge Base**
  - Article creation and management
  - Category organization
  - Full-text search
  - Rich text editing
  - Helpfulness tracking

- 👥 **User Management**
  - Role-based access control
  - Department management
  - User activity tracking
  - Profile management

- 🔔 **Real-time Notifications**
  - SignalR integration
  - Instant ticket updates
  - In-app notifications
  - Email notifications

- 📈 **Reports**
  - Custom report generation
  - PDF, Excel, and CSV export
  - SLA compliance reports
  - Team productivity metrics
  - Customer satisfaction analysis

- 🔐 **Security**
  - JWT authentication with refresh tokens
  - Role-based authorization
  - Password hashing with salt
  - Email verification
  - Audit logging

- 🎨 **UI/UX**
  - Dark mode support
  - Fully responsive design
  - Mobile-first approach
  - Smooth animations
  - Accessibility ready

### User Roles

- **Super Admin** - Full system access
- **Administrator** - Elevated privileges
- **Manager** - Department management
- **Support Agent** - Ticket handling
- **Employee** - Basic access

## 🛠️ Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| ASP.NET Core | 9.0 | Web API Framework |
| C# | 12.0 | Programming Language |
| Entity Framework Core | 9.0 | ORM |
| SQL Server | 2022 | Database |
| JWT | - | Authentication |
| SignalR | - | Real-time Communication |
| FluentValidation | 11.0 | Validation |
| AutoMapper | 12.0 | Object Mapping |
| Serilog | 8.0 | Logging |
| Swagger/OpenAPI | 7.0 | API Documentation |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.0 | React Framework |
| TypeScript | 5.0 | Programming Language |
| Tailwind CSS | 3.0 | Styling |
| React Hook Form | 7.0 | Form Handling |
| Zod | 3.0 | Schema Validation |
| TanStack Query | 5.0 | State Management |
| Chart.js | 4.0 | Data Visualization |
| Axios | 1.0 | HTTP Client |

### DevOps

- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Cloud:** Azure (Deployment Ready)

## 🏗️ Architecture

### Clean Architecture Layers


### SOLID Principles Applied

- **Single Responsibility**: Each class has one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Derived classes substitute base classes
- **Interface Segregation**: Interfaces are client-specific
- **Dependency Inversion**: Depend on abstractions, not concretions

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/helpdesk-system.git
cd helpdesk-system

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# API: http://localhost:5252/swagger

# Navigate to the API project
cd src/HelpDesk.API

# Restore dependencies
dotnet restore

# Apply migrations
dotnet ef database update

# Run the application
dotnet run

# Navigate to the frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev


# Git Repository - Complete README and Description

## 📝 GitHub Repository Description

```
🚀 Enterprise-Grade Help Desk & IT Service Management System

A comprehensive, production-ready help desk solution built with ASP.NET Core 9 and Next.js 15. Features real-time notifications, advanced analytics, role-based access control, and full mobile responsiveness.

✨ Key Features: Ticket Management • Real-time Analytics • Knowledge Base • JWT Authentication • Dark Mode • SignalR Notifications • Report Generation • Audit Logging

🛠️ Tech Stack: ASP.NET Core 9 • Next.js 15 • TypeScript • Tailwind CSS • SQL Server • Entity Framework Core • SignalR • JWT • Docker

🏗️ Architecture: Clean Architecture • SOLID Principles • Repository Pattern • CQRS Ready

📊 Perfect for: IT Teams • Support Departments • Service Desks • Enterprise Organizations

🔒 Security: JWT with Refresh Tokens • Role-Based Authorization • Audit Logs • Password Hashing • Email Verification
```

---

## 📄 Complete README.md

```markdown
# 🎫 Enterprise Help Desk & IT Service Management System

[![.NET](https://img.shields.io/badge/.NET-9.0-blue)](https://dotnet.microsoft.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed)](https://www.docker.com/)

A comprehensive, enterprise-grade Help Desk and IT Service Management System built with modern best practices, Clean Architecture, and full-stack development.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Database Setup](#-database-setup)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Overview

This Help Desk System provides a complete solution for managing IT support tickets, tracking performance metrics, and delivering real-time updates. Built with Clean Architecture and modern technologies, it's designed for scalability, maintainability, and enterprise-grade security.

### Live Demo

- **Frontend:** [https://helpdesk.example.com](https://helpdesk.example.com)
- **API Swagger:** [https://helpdesk-api.example.com/swagger](https://helpdesk-api.example.com/swagger)
- **Demo Credentials:** `admin@helpdesk.com` / `Admin@123`

## ✨ Features

### Core Features

- 🎫 **Ticket Management**
  - Create, assign, reassign, and escalate tickets
  - Priority and status tracking
  - Comments and attachments
  - SLA management
  - Due date tracking

- 📊 **Analytics Dashboard**
  - Real-time metrics and statistics
  - Interactive charts (Chart.js)
  - Trend analysis
  - Performance monitoring
  - Custom date ranges

- 📚 **Knowledge Base**
  - Article creation and management
  - Category organization
  - Full-text search
  - Rich text editing
  - Helpfulness tracking

- 👥 **User Management**
  - Role-based access control
  - Department management
  - User activity tracking
  - Profile management

- 🔔 **Real-time Notifications**
  - SignalR integration
  - Instant ticket updates
  - In-app notifications
  - Email notifications

- 📈 **Reports**
  - Custom report generation
  - PDF, Excel, and CSV export
  - SLA compliance reports
  - Team productivity metrics
  - Customer satisfaction analysis

- 🔐 **Security**
  - JWT authentication with refresh tokens
  - Role-based authorization
  - Password hashing with salt
  - Email verification
  - Audit logging

- 🎨 **UI/UX**
  - Dark mode support
  - Fully responsive design
  - Mobile-first approach
  - Smooth animations
  - Accessibility ready

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js 20+](https://nodejs.org/)
- [SQL Server 2022](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Docker](https://www.docker.com/) (optional)

### Environment Variables

#### Backend (.env)

```env
ASPNETCORE_ENVIRONMENT=Development
Jwt__Secret=your-super-secret-key-min-32-characters
Jwt__Issuer=helpdesk-api
Jwt__Audience=helpdesk-frontend
ConnectionStrings__DefaultConnection=Server=localhost;Database=HelpDeskDB;User=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True
Smtp__Host=smtp.gmail.com
Smtp__Port=587
Smtp__Username=your-email@gmail.com
Smtp__Password=your-app-password
```

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5252/api
NEXT_PUBLIC_SIGNALR_URL=http://localhost:5252/hubs
```

## 🗄️ Database Setup

### SQL Server Script

```sql
-- Create database
CREATE DATABASE HelpDeskDB;
GO

USE HelpDeskDB;
GO

-- Run migrations
-- Or use EF Core migrations
dotnet ef database update
```

### Seed Data

```bash
# Run the seed data (automatically runs on first start)
dotnet run --seed
```

## 📁 Project Structure

```
HelpDeskSystem/
├── src/
│   ├── HelpDesk.Domain/
│   │   ├── Entities/
│   │   ├── Enums/
│   │   ├── Interfaces/
│   │   └── Common/
│   ├── HelpDesk.Application/
│   │   ├── Features/
│   │   ├── DTOs/
│   │   ├── Services/
│   │   ├── Validators/
│   │   └── Interfaces/
│   ├── HelpDesk.Infrastructure/
│   │   ├── Data/
│   │   ├── Repositories/
│   │   ├── Services/
│   │   └── Middleware/
│   └── HelpDesk.API/
│       ├── Controllers/
│       ├── Middleware/
│       ├── Filters/
│       └── Program.cs
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── types/
│   └── contexts/
├── tests/
│   ├── HelpDesk.UnitTests/
│   └── HelpDesk.IntegrationTests/
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/refresh-token` | Refresh JWT token |
| POST | `/api/auth/verify-email` | Verify email |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |

### Ticket Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tickets` | Get all tickets |
| GET | `/api/tickets/{id}` | Get ticket by ID |
| POST | `/api/tickets` | Create ticket |
| PUT | `/api/tickets/{id}` | Update ticket |
| DELETE | `/api/tickets/{id}` | Delete ticket |
| GET | `/api/tickets/stats` | Get ticket statistics |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |

### Full API Documentation

Access the Swagger UI at: `https://localhost:5001/swagger`

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
dotnet test tests/HelpDesk.UnitTests

# Run specific test
dotnet test tests/HelpDesk.UnitTests --filter "FullyQualifiedName~TicketServiceTests"
```

### Integration Tests

```bash
# Run integration tests
dotnet test tests/HelpDesk.IntegrationTests

# Run with coverage
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## 🚢 Deployment

### Docker Deployment

```bash
# Build Docker images
docker-compose build

# Deploy to production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Azure Deployment

```bash
# Login to Azure
az login

# Create App Service
az webapp create --name helpdesk-api --resource-group helpdesk-rg --plan helpdesk-plan

# Deploy
az webapp deploy --name helpdesk-api --resource-group helpdesk-rg --src-path ./src/HelpDesk.API/bin/Release/net9.0/publish.zip

# Set environment variables
az webapp config appsettings set --name helpdesk-api --resource-group helpdesk-rg --settings "Jwt__Secret=your-secret" "ConnectionStrings__DefaultConnection=your-connection-string"
```

### GitHub Actions CI/CD

The repository includes a GitHub Actions workflow for automated CI/CD:

```yaml
# .github/workflows/ci-cd.yml
name: Build, Test, and Deploy
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: 9.0.x
      - name: Restore dependencies
        run: dotnet restore
      - name: Build
        run: dotnet build --no-restore --configuration Release
      - name: Run tests
        run: dotnet test --no-build --configuration Release --verbosity normal
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- **C#**: Follow Microsoft's C# coding conventions
- **TypeScript**: Use ESLint and Prettier
- **Commits**: Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All open-source libraries used in this project
- The .NET and Next.js communities
- Contributors and testers

## 📧 Contact

- **Project Maintainer:** [Your Name](mailto:your.email@example.com)
- **GitHub:** [yourusername](https://github.com/yourusername)
- **LinkedIn:** [Your LinkedIn](https://linkedin.com/in/yourprofile)

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ and modern best practices**
```

---

## 🎯 GitHub Topics (Tags)

```
aspnet-core
nextjs
helpdesk
service-management
ticketing-system
clean-architecture
entity-framework-core
signalr
jwt-authentication
typescript
tailwindcss
docker
azure
it-service-management
support-system
enterprise-software
dotnet-9
react-query
chartjs
real-time-notifications
dark-mode
responsive-design
```

---

## 📝 Short Version (For Project Card)

```markdown
# Help Desk & IT Service Management System

Enterprise-grade help desk solution with real-time notifications, analytics, and role-based access control.

**Tech Stack:** ASP.NET Core 9, Next.js 15, TypeScript, Tailwind CSS, SQL Server, SignalR, JWT, Docker

**Features:**
- 🎫 Ticket Management (CRUD, Assign, Escalate, SLA)
- 📊 Analytics Dashboard with Charts
- 🔔 Real-time Notifications (SignalR)
- 📚 Knowledge Base with Search
- 👥 User & Role Management
- 📈 Reports (PDF, Excel, CSV)
- 🌙 Dark Mode
- 📱 Mobile Responsive

**Architecture:** Clean Architecture, SOLID Principles, Repository Pattern

**Security:** JWT with Refresh Tokens, Role-Based Authorization, Audit Logging

**Live Demo:** [Link to Demo]
**Documentation:** [Link to Docs]

