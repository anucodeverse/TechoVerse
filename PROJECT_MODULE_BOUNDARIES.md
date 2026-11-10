# TechoVerse Module Boundaries

## Member 2: Project Management

These files implement the project-management feature and are the primary Member 2 ownership surface.

### Frontend

- `client/src/pages/Projects.jsx` and `Projects.module.css`: authenticated user's project list, search, filtering, sorting, editing, and deletion.
- `client/src/pages/ProjectDetails.jsx` and `ProjectDetails.module.css`: individual project view.
- `client/src/components/ProjectForm.jsx` and `ProjectForm.module.css`: create and edit form with client-side validation.
- `client/src/services/projectService.js`: project CRUD API client and JWT attachment.

### Backend and database

- `server/models/Project.js`: project schema, owner association, status, and timestamps.
- `server/validation/projectValidation.js`: create/update request validation.
- `server/controllers/projectController.js`: project CRUD and ownership enforcement.
- `server/routes/projectRoutes.js`: authenticated project endpoints.

## Shared Integration Points

These files connect project management to the wider application. They are not project-only files and should remain when isolating Member 2's work.

- `client/src/App.jsx`: registers protected project pages alongside the app's other routes.
- `server/server.js`: mounts project routes alongside authentication, payment, and AI routes.
- `client/src/context/AuthContext.js`, `client/src/components/ProtectedRoute.jsx`, and `server/middleware/authMiddleware.js`: provide the existing authentication contract.
- `client/src/pages/Dashboard.jsx`: reads and links to projects as part of the dashboard.
- `server/models/User.js`: provides user records and the premium flag used by the project-creation limit.
- `client/src/components/Navbar.jsx` and `client/src/components/Loading.jsx`: shared presentation components used by project pages.
- `client/src/services/aiService.js` and `client/src/utils/notification.js`: optional AI task suggestions and notifications used by the project form.

## Other Feature Modules

- Authentication: `server/controllers/authController.js`, `server/routes/authRoutes.js`, and the corresponding client auth pages and services.
- Payments: `server/controllers/paymentController.js`, `server/routes/paymentRoutes.js`, `server/services` payment integration, and the corresponding client payment pages and service.
- AI: `server/controllers/aiController.js`, `server/routes/aiRoutes.js`, `server/services/geminiService.js`, and `client/src/services/aiService.js`.

## Separation Guidance

The repository is organized by technical layer, while project-specific files are already distinctly named and grouped within those layers. Keep the shared integration points in place; removing them would disconnect project management from authentication, routing, dashboard links, and user plan data. For a standalone delivery, package the Member 2 files above together with the shared integration contracts they consume rather than deleting the other application modules.