# SkillUp AI - Mobile Design Guidelines

## Architecture Decisions

### Authentication
**Auth Required** - The platform requires user accounts to:
- Store personalized learning roadmaps
- Track course progress and completion
- Match users with compatible jobs based on their skills
- Generate AI-powered recommendations

**Implementation:**
- Include Apple Sign-In (iOS) and Google Sign-In
- Email/password option with validation
- Onboarding flow to collect initial profile data (current role, skills, career goals)
- Login screen with purple-to-blue gradient background matching web design
- Logout from Profile screen with confirmation
- Delete account under Settings > Account > Delete (double confirmation)

### Navigation
**Tab Navigation** (4 tabs):
1. **Dashboard** (Home icon) - Overview, progress, recent activities
2. **Vagas** (Briefcase icon) - Compatible job listings with match %
3. **Recomendações** (Lightbulb icon) - AI insights and course recommendations
4. **Perfil** (User icon) - Profile, settings, statistics

**Navigation Stack Structure:**
- Auth Stack (pre-login): Welcome → Login → Signup
- Main Stack (post-login): Tab Navigator
- Modal Screens: Course Details, Job Details, Edit Profile, Roadmap Detail

## Screen Specifications

### 1. Login/Signup Screens
- **Purpose:** Authenticate users
- **Layout:**
  - Full-screen gradient background (purple #7C3AED to blue #3B82F6, diagonal 135deg)
  - Logo/brand icon at top center
  - Scrollable form (email, password fields)
  - Submit button below form (solid purple, white text)
  - SSO buttons (Apple, Google) with outlined style
  - Toggle link to switch Login ↔ Signup
  - Safe area: top: insets.top + Spacing.xl, bottom: insets.bottom + Spacing.xl

### 2. Dashboard (Home Tab)
- **Purpose:** Overview of learning progress and quick actions
- **Layout:**
  - Transparent header with "Olá, [Nome]" greeting and profile photo (right)
  - Scrollable content
  - Progress card: Circular progress (68%) with label "Progresso Geral"
  - Section: "Cursos em Andamento" (horizontal scroll list)
  - Section: "Vagas Compatíveis" (vertical list, max 3 items, "Ver Todas" link)
  - Safe area: top: headerHeight + Spacing.xl, bottom: tabBarHeight + Spacing.xl

### 3. Roadmap Screen
- **Purpose:** Display personalized learning path
- **Layout:**
  - Custom header with title "Roadmap de Aprendizado"
  - Scrollable vertical timeline
  - Each item: Course title, status badge (Concluído/Em Andamento), skill tags, duration
  - Visual connector line between items
  - Safe area: top: headerHeight + Spacing.xl, bottom: tabBarHeight + Spacing.xl

### 4. Vagas (Jobs Tab)
- **Purpose:** Browse compatible job listings
- **Layout:**
  - Header with search bar
  - Filter pills below search (Localização, Salário, Tipo)
  - Scrollable job cards list
  - Each card: Company name, job title, match % badge (87%, 82%), location, salary range, required skills tags
  - Safe area: top: headerHeight + Spacing.xl, bottom: tabBarHeight + Spacing.xl

### 5. Job Details (Modal)
- **Purpose:** Full job description and application
- **Layout:**
  - Standard navigation header with back button
  - Scrollable content: Company logo, title, match %, description, skills required, benefits
  - Floating CTA button "Candidatar-se" at bottom
  - Safe area: bottom: insets.bottom + Spacing.xl (floating button shadow)

### 6. Recomendações (Recommendations Tab)
- **Purpose:** AI-powered insights and course suggestions
- **Layout:**
  - Transparent header with title "Recomendações IA"
  - Scrollable content
  - Section: "Insights da IA" (cards with icon, title, description)
  - Section: "Cursos Recomendados" (vertical list with match % badges: 92%, 88%, 95%)
  - Each course card: Image, title, match %, duration, level
  - Safe area: top: headerHeight + Spacing.xl, bottom: tabBarHeight + Spacing.xl

### 7. Perfil (Profile Tab)
- **Purpose:** User profile and statistics
- **Layout:**
  - Custom header with "Meu Perfil" title and edit button (right)
  - Scrollable content
  - Profile section: Avatar (large), name, current role, bio
  - Stats section: 3 columns (Cursos Concluídos, Anos Experiência, Membro Desde)
  - Skills section: "Minhas Habilidades" with tag chips, "+ Adicionar" button
  - Settings section: Links (Notificações, Privacidade, Sair)
  - Safe area: top: headerHeight + Spacing.xl, bottom: tabBarHeight + Spacing.xl

### 8. Edit Profile (Modal)
- **Purpose:** Update user information
- **Layout:**
  - Standard header with "Cancelar" (left) and "Salvar" (right)
  - Scrollable form: Avatar picker, name field, current role field, bio textarea
  - Form fields with labels above inputs
  - Safe area: top: Spacing.xl, bottom: insets.bottom + Spacing.xl

## Design System

### Color Palette
- **Primary Gradient:** Purple #7C3AED → Blue #3B82F6 (135deg)
- **Primary Purple:** #7C3AED (buttons, accents)
- **Primary Blue:** #3B82F6 (secondary accents)
- **Background:** #F9FAFB (light gray)
- **Card Background:** #FFFFFF
- **Text Primary:** #111827
- **Text Secondary:** #6B7280
- **Success Green:** #10B981 (completed status)
- **Warning Yellow:** #F59E0B (in-progress status)
- **Border:** #E5E7EB

### Typography
- **Headings:** System font, Bold (700)
  - H1: 32px (Dashboard greeting)
  - H2: 24px (Section titles)
  - H3: 18px (Card titles)
- **Body:** System font, Regular (400)
  - Body: 16px (Descriptions)
  - Small: 14px (Labels, metadata)
  - Tiny: 12px (Tags, badges)

### Components

**Cards:**
- White background (#FFFFFF)
- Border radius: 16px
- Shadow: offset (0, 2), opacity 0.08, radius 8
- Padding: Spacing.lg (16px)

**Match Badges:**
- Circular or pill-shaped
- Purple gradient background for high match (>85%)
- Blue background for medium match (70-84%)
- White text, bold
- Display: "92% Match"

**Skill Tags:**
- Outlined style with 1px border
- Border radius: 20px (fully rounded)
- Padding: 4px horizontal, 8px vertical
- Purple border color (#7C3AED)
- Small text (12px)

**Progress Indicators:**
- Circular progress: Purple gradient fill
- Linear progress: Purple gradient track
- Show percentage label

**Buttons:**
- Primary: Solid purple (#7C3AED), white text, rounded 12px
- Secondary: Outlined purple, purple text
- Floating: Use shadow (offset: {width: 0, height: 2}, opacity: 0.10, radius: 2)
- Press feedback: Opacity 0.8

**Input Fields:**
- Border: 1px solid #E5E7EB
- Border radius: 12px
- Padding: 12px
- Focus state: Border purple (#7C3AED)

### Visual Design
- Use Feather icons from @expo/vector-icons
- Avatar placeholders: Generate 4 professional gradient avatars (purple/blue theme)
- Course images: Use placeholder images with purple/blue overlay
- NO emojis in UI

### Accessibility
- Minimum touch target: 44x44 points
- Color contrast ratio: 4.5:1 for text
- Labels for all interactive elements
- Support for dynamic text sizing