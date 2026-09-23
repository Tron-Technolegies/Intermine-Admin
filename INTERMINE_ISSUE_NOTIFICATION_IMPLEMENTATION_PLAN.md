# Intermine Admin Dashboard — Issue Notification System Implementation Plan

This implementation plan is based on an architectural analysis of the **Intermine** project codebase (`Intermine-Backend`, `Intermine-Admin`, and `Intermine-User`). It is designed as a self-guided developer manual so you can implement the feature step by step without modifying unintended parts of the system.

---

## 1. Client Requirement

### Problem Statement
> Issues are being reported through the dashboard, but sometimes nobody notices or checks them for several days. The client wants a way to inform the responsible technician or hosting company by email, so that reported issues are not forgotten and can actually be handled.

### Primary Objective
Enable administrators in the **Intermine Admin Dashboard** to dispatch an email notification to the responsible technician or hosting facility for any reported issue. The notification must contain all technical details about the affected miner, the user's issue description, and any custom instructions added by the admin. The system must track whether an issue has been notified and when.

---

## 2. Current Project Architecture

The Intermine ecosystem consists of three main components:

1. **Intermine-Backend** (`c:\web development\Intermine-Backend`)
   - **Framework**: Express 5.1.0 (ES Modules).
   - **Database**: MongoDB using Mongoose 8.19.2.
   - **Authentication**: JWT stored in HTTP-only cookies (`token`). Validated via `authenticateUser` and `isAdmin` middlewares.
   - **Email Engine**: `nodemailer` 7.0.10 configured with Gmail SMTP (`utils/nodeMailer.js`).
   - **External Integration**: Dahab API synchronization for miners and issue reminders via HTTP requests with `x-api-key`.
   - **Task Scheduling**: `node-cron` for automated farm downtime activation.

2. **Intermine-Admin Dashboard** (`c:\web development\Intermine-Admin`)
   - **Framework**: React 19 bootstrapped with Vite.
   - **Styling**: Tailwind CSS v4 and MUI Material (`@mui/material`).
   - **Data Fetching & State**: TanStack React Query v5 (`@tanstack/react-query`).
   - **HTTP Client**: Axios configured with `withCredentials: true` (`src/api/api.js`).
   - **Notifications / Toasts**: `react-toastify`.

3. **Intermine-User Dashboard** (`c:\web development\Intermine-User`)
   - **Framework**: React 19 with Vite, Tailwind CSS, TanStack React Query.
   - **Purpose**: Client-facing portal where users view miner hashrates, request pool/worker changes, and report hardware issues.

---

## 3. Existing Issue / Complaint Flow

1. **User Reports Issue**: In `Intermine-User`, the client clicks "Report Issue" on a miner (`ReportIssueModal.jsx`).
2. **API Request**: The form dispatches `POST /api/v1/issue` containing `{ miner, issue, workerAddress, description }`.
3. **Backend Processing**: Handled by `addIssueByClient` in `userIssueController.js`:
   - Validates that the miner belongs to the authenticated user.
   - Creates a new document in the `Issue` collection with `status: "Pending"`, `type: "repair"`, and `owner: "Client"`.
   - If `miner.serviceProvider === "dahab"`, syncs the report to Dahab's external API.
   - Creates an internal `Notification` for the admin.
4. **Admin Dashboard Retrieval**: In `Intermine-Admin`, the `/issues` page (`Issues.jsx`) executes `useIssues` hook calling `GET /api/v1/admin/issue`.
5. **Issue Display**: Issues are rendered via `IssueCard.jsx` showing miner model, serial number, worker ID, client name, description, and status (`Pending`).
6. **Existing Actions**: The admin can change the status (`Pending`, `Warranty`, `Repair Center`, `Resolved`), send a chat response to the client (`RespondIssueModal.jsx`), or trigger an HTTP reminder specifically to Dahab (`onReminder`).

---

## 4. Current Relevant Files and Their Locations

```text
c:\web development\
├── Intermine-Backend\
│   ├── .env                                       <-- SMTP credentials (NODEMAILER_EMAIL, NODEMAILER_PASS)
│   ├── index.js                                   <-- Express entrypoint; mounts /api/v1/admin/issue
│   ├── models\
│   │   ├── Issue.js                               <-- Issue Mongoose model
│   │   ├── ServiceProvider.js                     <-- Stores technician / provider contact info & email
│   │   └── MiningFarm.js                          <-- Mining facility details & assigned serviceProvider
│   ├── controllers\
│   │   ├── adminIssueController.js                <-- Admin issue management & Dahab reminder logic
│   │   └── userIssueController.js                 <-- Client issue creation logic
│   ├── routers\
│   │   ├── adminIssueRouter.js                    <-- Protected admin issue routes
│   │   └── userIssueRouter.js                     <-- Client issue routes
│   ├── middlewares\
│   │   ├── authMiddleWare.js                      <-- authenticateUser, isAdmin middlewares
│   │   └── validationMiddleware.js                <-- express-validator rules
│   └── utils\
│       └── nodeMailer.js                          <-- Nodemailer transporter and sendMail helper
│
├── Intermine-Admin\
│   ├── src\
│   │   ├── api\
│   │   │   └── api.js                             <-- Axios instance with withCredentials: true
│   │   ├── hooks\
│   │   │   ├── useIssues.js                       <-- TanStack Query hook fetching admin issues
│   │   │   └── useIssueActions.js                 <-- Mutations: updateStatus, sendResponse, sendReminder
│   │   ├── pages\
│   │   │   └── issues\
│   │   │       └── Issues.jsx                     <-- Main issues page managing modals and filters
│   │   └── components\
│   │       └── issues\
│   │           ├── IssueCard.jsx                  <-- Renders single issue card & action buttons
│   │           ├── RespondIssueModal.jsx          <-- Modal to message the client
│   │           └── StatusHistoryModal.jsx         <-- Modal displaying audit history of status changes
│
└── Intermine-User\
    └── src\
        └── components\
            └── myminers\
                └── ReportIssueModal.jsx           <-- Modal where client enters issue type & description
```

---

## 5. Current Data Flow vs Target Data Flow

### Current Data Flow
```text
Client (Intermine-User)
     ↓
POST /api/v1/issue
     ↓
userIssueController.addIssueByClient
     ↓
Issue saved to MongoDB (status: "Pending")
     ↓
Admin sees issue in Intermine-Admin (/issues)
     ↓
[Issue sits unaddressed if admin doesn't manually follow up]
```

### Target Data Flow with Email Notification
```text
Client reports issue (Intermine-User)
     ↓
Issue saved in MongoDB (status: "Pending", technicianNotified: false)
     ↓
Admin sees issue in Intermine-Admin with "Pending (Not Notified)" badge
     ↓
Admin clicks "Notify Technician" button on IssueCard
     ↓
NotifyTechnicianModal opens with pre-populated technician email and miner details
     ↓
Admin adds optional note (e.g. "Check PSU on Rack 3") and clicks "Send Notification"
     ↓
POST /api/v1/admin/issue/:id/notify-technician
     ↓
adminIssueController.notifyTechnicianByEmail
     ↓
Nodemailer dispatches formatted HTML email to Technician / Hosting Facility
     ↓
Issue updated: technicianNotified = true, notifiedAt = Date, technicianEmail = email
Audit log entry appended to statusHistory
     ↓
React Query invalidates "issues" cache
     ↓
IssueCard updates in real-time showing "Notified" badge and follow-up option
```

---

## 6. What Needs to Be Changed

1. **Database**: Store notification state (`technicianNotified`), timestamp (`notifiedAt`), recipient email (`technicianEmail`), and optional notes (`technicianNotes`) on the `Issue` model.
2. **Backend Utility**: Ensure `nodeMailer.js` propagates delivery failures back to the caller instead of swallowing errors.
3. **Backend Controller**: Add `notifyTechnicianByEmail` to `adminIssueController.js` to look up issue details, format the email, send it, and update the database.
4. **Backend Router**: Expose `POST /:id/notify-technician` on `adminIssueRouter.js`.
5. **Frontend API Hook**: Add `notifyTechnician` mutation to `useIssueActions.js`.
6. **Frontend Modal**: Create `NotifyTechnicianModal.jsx` in `Intermine-Admin` to allow previewing details, editing recipient email, and adding an admin note.
7. **Frontend Card & Page**: Add the "Notify Technician" button and visual status badges to `IssueCard.jsx` and wire modal state in `Issues.jsx`.

---

## 7. Database Changes

### File to Modify
`Intermine-Backend/models/Issue.js`

### What to Change
Add the following fields inside `IssueSchema`:
- `technicianNotified`: Boolean, default `false`.
- `technicianEmail`: String, trimmed.
- `notifiedAt`: Date.
- `technicianNotes`: String.

### Why It Is Needed
- **`technicianNotified`**: Allows the admin UI to immediately distinguish which reported issues have been escalated to technical staff and which remain unhandled.
- **`technicianEmail`**: Provides an audit trail of exactly which email address received the ticket.
- **`notifiedAt`**: Allows computing response times and displaying relative timestamps (e.g., "Notified 2 days ago").
- **`technicianNotes`**: Stores any specific troubleshooting instructions provided by the admin.

### Expected Result
New and existing `Issue` documents can store notification metadata. Mongoose handles default values gracefully without requiring manual table migrations.

---

## 8. Backend Changes

### 1. Update Email Helper
- **File**: `Intermine-Backend/utils/nodeMailer.js`
- **What to Change**: Modify `sendMail` so it awaits `transporter.sendMail(mailOptions)` and allows any thrown error to reach the calling controller.
- **Why**: Currently, `sendMail` catches errors and only logs them to console. If an email fails to send due to invalid credentials or SMTP downtime, the controller must know so it can return an HTTP 500 error instead of falsely reporting success to the admin.
- **Expected Result**: Controllers can accurately report email success or failure to the client.

### 2. Add Controller Function
- **File**: `Intermine-Backend/controllers/adminIssueController.js`
- **What to Change**: Create and export an async function `notifyTechnicianByEmail(req, res)`:
  1. Extract `id` from `req.params`, and `technicianEmail`, `adminNote` from `req.body`.
  2. Query `Issue.findById(id)` and populate `issue` (IssueType), `miner`, `user`, and `currentLocation`.
  3. Resolve recipient email: use `technicianEmail` from request, or fall back to looking up `ServiceProvider.findOne({ name: issue.miner.serviceProvider })`.
  4. Throw `BadRequestError` if no recipient email can be resolved.
  5. Build an HTML email containing:
     - Miner Model, Serial Number, Worker ID
     - Facility Location / Service Provider
     - Client Name and Client ID
     - Issue Type and Client's Description
     - Admin Notes (if provided)
     - Ticket Reference ID and Timestamp
  6. Call `await sendMail(transporter, mailOptions)`.
  7. Update the issue: `technicianNotified = true`, `technicianEmail = recipient`, `notifiedAt = new Date()`, `technicianNotes = adminNote`.
  8. Append an entry to `issue.statusHistory`: `{ status: "Technician Notified", changedBy: "Admin", changedOn: new Date() }`.
  9. Save the issue and return HTTP 200 with `{ message: "Technician notified successfully", notifiedAt, recipient }`.
- **Why**: Handles the complete business logic of email composition, dispatch, and state tracking in one atomic step.
- **Expected Result**: Calling this endpoint sends a clean email and persists notification history.

---

## 9. API Changes

### File to Modify
`Intermine-Backend/routers/adminIssueRouter.js`

### What to Change
1. Import `notifyTechnicianByEmail` from `../controllers/adminIssueController.js`.
2. Register the route:
   `router.post("/:id/notify-technician", notifyTechnicianByEmail);`

### API Specification
- **Method**: `POST`
- **Path**: `/api/v1/admin/issue/:id/notify-technician`
- **Authentication**: Required (`authenticateUser` + `isAdmin` from `index.js`).
- **Path Parameter**: `:id` (MongoDB ObjectId of the Issue).
- **Request Body**:
  ```json
  {
    "technicianEmail": "tech@datacenter.com",
    "adminNote": "Please check hashboard #2 and fan RPM"
  }
  ```
- **Responses**:
  - `200 OK`: `{ "message": "Technician notified successfully", "notifiedAt": "2026-09-23T...", "recipient": "..." }`
  - `400 Bad Request`: `{ "error": "Recipient email required" }`
  - `401 Unauthorized / 403 Forbidden`: `{ "error": "Not authorized" }`
  - `404 Not Found`: `{ "error": "No issue found" }`
  - `500 Internal Server Error`: `{ "error": "Failed to send email" }`

---

## 10. Email Notification System

### Existing Infrastructure
The project already includes `nodemailer` and an initialized `transporter` using Gmail SMTP in `Intermine-Backend/utils/nodeMailer.js`.

### Environment Configuration
Verify that `Intermine-Backend/.env` contains:
```env
NODEMAILER_EMAIL=your-operational-email@gmail.com
NODEMAILER_PASS=your-16-digit-google-app-password
```

### Email Content Design
The email dispatched to the technician should include:
- **Subject**: `[INTERMINE ALERT] Hardware Issue: {model} - {workerId}`
- **Header**: Clear Intermine branding and ticket ID reference.
- **Hardware Specs**: Miner Model, Serial Number, Worker ID, Hashrate, Hosting Farm.
- **Client Info**: Client Name and Client ID (for tracking unit ownership).
- **Issue Details**: Issue Category and verbatim Client Description.
- **Admin Instructions**: Prominently styled box containing any specific direction provided by the admin.
- **Call to Action**: Instructions on how to report back once the issue has been inspected.

---

## 11. Intermine Admin Dashboard UI Changes

### 1. Custom Hook Mutation
- **File**: `Intermine-Admin/src/hooks/useIssueActions.js`
- **What to Change**: Add `notifyTechnician` mutation using `useMutation` from TanStack Query.
  - Calls `api.post('/api/v1/admin/issue/${issueId}/notify-technician', { technicianEmail, adminNote })`.
  - On success: invalidates `["issues"]` query and triggers `toast.success`.
  - On error: triggers `toast.error`.
  - Export `notifyTechnician` in the return object.
- **Why**: Centralizes API communication and ensures the React Query cache refreshes automatically upon success.

### 2. New Modal Component
- **File to Create**: `Intermine-Admin/src/components/issues/NotifyTechnicianModal.jsx`
- **What to Change**: Create a modal dialog containing:
  - Header: "Notify Technician / Hosting Company".
  - Summary box showing miner model, worker ID, and issue type.
  - Input field for technician email (pre-filled if available, required).
  - Textarea for optional admin note / instructions.
  - If already notified previously: display banner showing `Last notified on {date} to {email}`.
  - Action buttons: "Cancel" and "Send Notification" (disabled with "Sending..." when `isPending`).
- **Why**: Gives the admin control to verify the recipient email and add specific technician notes before dispatching.

### 3. Issue Card Action & Badge
- **File**: `Intermine-Admin/src/components/issues/IssueCard.jsx`
- **What to Change**:
  - Accept `onNotify` callback prop.
  - In the right-hand action button group (next to Messages and Reminders), add a "Notify Technician" button.
  - If `issue.technicianNotified` is true, style the button with a soft green/teal badge showing "Notified (Re-send)". If false, style with standard admin blue showing "Notify Technician".
  - In the card header or metadata section, display notification status: e.g., `Notified: 23/09/2026, 11:30 AM`.
- **Why**: Makes it immediately visible whether an issue has been communicated to the technical team.

### 4. Page Integration
- **File**: `Intermine-Admin/src/pages/issues/Issues.jsx`
- **What to Change**:
  - Add state `const [notifyIssue, setNotifyIssue] = useState(null)`.
  - Pass `onNotify={(target) => setNotifyIssue(target)}` to `IssueCard`.
  - Render `<NotifyTechnicianModal issue={notifyIssue} onClose={() => setNotifyIssue(null)} />` at the bottom of the page.
- **Why**: Mounts the modal cleanly and handles open/close lifecycle for the selected issue.

---

## 12. Security Considerations

1. **Role Protection**: The notification route must be guarded by `authenticateUser` and `isAdmin`. Regular client users cannot invoke technician notification routes.
2. **Secret Protection**: SMTP credentials (`NODEMAILER_EMAIL`, `NODEMAILER_PASS`) must remain strictly in `Intermine-Backend/.env`. Never expose SMTP variables in frontend code or `VITE_` variables.
3. **Input Sanitization**: Validate the email address format on the backend before passing to Nodemailer to avoid email header injection attacks.

---

## 13. Error Handling Matrix

| Error Scenario | Backend Action | Frontend User Feedback |
| :--- | :--- | :--- |
| **SMTP Auth / Network Failure** | Nodemailer throws -> catch block returns `500` with error message. Database is NOT marked as notified. | `toast.error("Failed to send email")`. Modal remains open so user can retry. |
| **Missing Technician Email** | Controller detects empty recipient -> returns `400 BadRequestError`. | `toast.error("Technician email is required")`. |
| **Invalid Issue ID** | Controller queries ID -> throws `NotFoundError` (404). | `toast.error("Issue not found")`. |
| **Non-Admin Request** | `isAdmin` middleware blocks -> returns `403 UnauthorizedError`. | Access denied message / redirection. |
| **Frontend Network Drop** | Axios mutation catches network error. | `toast.error("Network error. Please try again")`. Loading state resets. |

---

## 14. Issue Status Workflow

Keep the existing status values (`Pending`, `Warranty`, `Repair Center`, `Resolved`) intact so you do not break Dahab API synchronization or existing filters.

Instead, treat technician notification as an **audit and alert attribute**:
- **Initial State**: `status: "Pending"` | `technicianNotified: false`.
  - Dashboard shows: Amber "Pending" badge + "Notify Technician" button.
- **After Notification**: `status: "Pending"` | `technicianNotified: true`.
  - Dashboard shows: Teal/Emerald "Technician Notified" badge + "Notified (Re-send)" button.
  - Status history gains an entry: `Technician Notified (tech@hosting.com)`.
- **Under Repair**: Admin updates dropdown to `"Warranty"` or `"Repair Center"` and chooses location.
- **Completed**: Admin updates status to `"Resolved"`.

---

## 15. Duplicate Notification Handling

**Recommendation**: Allow re-notification, but require conscious action.
- In hardware hosting, technicians occasionally miss an email or tickets stall. The admin needs the ability to send a reminder.
- **UI Behavior**: If `issue.technicianNotified === true`:
  - Button text: `"Notified (Re-send)"` or `"Send Follow-up"`.
  - Modal banner: Displays previous notification date and recipient email.
  - Submitting again sends another email and appends another audit entry to `statusHistory` without overwriting the original `notifiedAt` (or updates `lastNotifiedAt`).

---

## 16. Step-by-Step Implementation Roadmap

Follow these steps in exact order:

### Step 1 — Check Environment Variables
- **File**: `Intermine-Backend/.env`
- Verify `NODEMAILER_EMAIL` and `NODEMAILER_PASS` are set with valid Gmail app credentials.

### Step 2 — Modify Nodemailer Utility
- **File**: `Intermine-Backend/utils/nodeMailer.js`
- Ensure `sendMail` awaits and lets errors bubble up so the calling controller can catch them.

### Step 3 — Extend Issue Model
- **File**: `Intermine-Backend/models/Issue.js`
- Add `technicianNotified`, `technicianEmail`, `notifiedAt`, and `technicianNotes` to `IssueSchema`.

### Step 4 — Implement Backend Controller
- **File**: `Intermine-Backend/controllers/adminIssueController.js`
- Add `notifyTechnicianByEmail` function with HTML email generation, Nodemailer call, and issue document updates.

### Step 5 — Register Backend Route
- **File**: `Intermine-Backend/routers/adminIssueRouter.js`
- Add `router.post("/:id/notify-technician", notifyTechnicianByEmail);`.

### Step 6 — Add Frontend Mutation
- **File**: `Intermine-Admin/src/hooks/useIssueActions.js`
- Add `notifyTechnician` mutation calling `POST /api/v1/admin/issue/:id/notify-technician` with cache invalidation for `["issues"]`.

### Step 7 — Create NotifyTechnicianModal
- **File**: `Intermine-Admin/src/components/issues/NotifyTechnicianModal.jsx`
- Build the modal component with form inputs for recipient email, admin notes, issue summary, and submit buttons.

### Step 8 — Update IssueCard
- **File**: `Intermine-Admin/src/components/issues/IssueCard.jsx`
- Add `onNotify` prop, the "Notify Technician" button, and notification status badges.

### Step 9 — Connect in Issues Page
- **File**: `Intermine-Admin/src/pages/issues/Issues.jsx`
- Add modal state, pass `onNotify` to `IssueCard`, and render `NotifyTechnicianModal`.

---

## 17. File-by-File Change List

| File Path | Action | Why | Expected Result |
| :--- | :--- | :--- | :--- |
| `Intermine-Backend/utils/nodeMailer.js` | **Modify** | Allow `sendMail` to propagate errors instead of silently logging them. | Calling controllers can detect failed emails and return HTTP 500. |
| `Intermine-Backend/models/Issue.js` | **Modify** | Add `technicianNotified`, `technicianEmail`, `notifiedAt`, `technicianNotes`. | Issue documents track notification status in MongoDB. |
| `Intermine-Backend/controllers/adminIssueController.js` | **Modify** | Implement `notifyTechnicianByEmail` logic and HTML email template. | Backend handles email dispatch and updates database state. |
| `Intermine-Backend/routers/adminIssueRouter.js` | **Modify** | Expose `POST /:id/notify-technician`. | Route is accessible to authorized admin requests. |
| `Intermine-Admin/src/hooks/useIssueActions.js` | **Modify** | Add `notifyTechnician` mutation and query invalidation. | Admin UI can trigger the endpoint and automatically refetch issue data. |
| `Intermine-Admin/src/components/issues/NotifyTechnicianModal.jsx` | **Create** | Dialog for admin to review details, adjust email, add notes, and submit. | Admin has an intuitive, safe interface to notify technicians. |
| `Intermine-Admin/src/components/issues/IssueCard.jsx` | **Modify** | Add "Notify Technician" button and visual status badges. | Cards clearly show notification status and provide a one-click action. |
| `Intermine-Admin/src/pages/issues/Issues.jsx` | **Modify** | Manage modal state and render `NotifyTechnicianModal`. | Modal opens and closes properly from the main issues view. |
| `Intermine-User/...` | **No change** | Client issue reporting already supplies all necessary miner metadata. | Zero risk of breaking client-facing workflows. |

---

## 18. Required Changes (Core Scope)

- Add notification fields to `models/Issue.js`.
- Add `notifyTechnicianByEmail` in `controllers/adminIssueController.js`.
- Register `POST /:id/notify-technician` in `routers/adminIssueRouter.js`.
- Add `notifyTechnician` mutation in `hooks/useIssueActions.js`.
- Create `components/issues/NotifyTechnicianModal.jsx`.
- Add button and status badge in `components/issues/IssueCard.jsx`.

---

## 19. Recommended Changes (Usability Enhancements)

- Auto-fill technician email from the miner's assigned `ServiceProvider` if available.
- Add an optional admin note field to the modal for specific technician instructions.
- Append an entry to `statusHistory` on each notification dispatch for auditing.
- Display relative creation time (e.g., "Reported 3 days ago") to highlight neglected tickets.

---

## 20. Changes That Are NOT Needed (Avoid Overengineering)

- **Do NOT** send emails automatically upon client issue creation (leads to spam from false alarms or duplicate tickets).
- **Do NOT** introduce external third-party email SDKs (SendGrid, AWS SES) when your existing Nodemailer setup is fully operational.
- **Do NOT** alter the existing `status` enum (`Pending`, `Warranty`, `Repair Center`, `Resolved`) to prevent breaking Dahab API synchronization.
- **Do NOT** modify client-side `Intermine-User` code.

---

## 21. Testing Plan

1. **Client Submission Test**: In `Intermine-User`, submit an issue for a test miner.
2. **Dashboard Visibility Test**: In `Intermine-Admin`, verify the new issue appears with status `Pending` and the button shows `Notify Technician`.
3. **Modal Verification**: Click "Notify Technician" and verify that the miner model, serial number, worker ID, and client name are displayed correctly.
4. **Email Dispatch Test**: Enter your own test email address, add a short note, and click "Send Notification".
5. **Loading State Test**: Confirm the button shows "Sending..." and is disabled during dispatch.
6. **Toast & Invalidation Test**: Confirm the success toast appears, the modal closes, and the card updates to show "Notified (Re-send)" without refreshing the browser.
7. **Email Delivery Verification**: Check the recipient inbox to ensure the email arrived, formatting is clean, and worker ID/description are accurate.
8. **Audit Verification**: Click the history icon (`MdHistory`) on the issue card to confirm a "Technician Notified" entry exists in the status history timeline.
9. **Error Handling Test**: Test with an invalid email address and verify that an appropriate error toast appears.

---

## 22. Final Implementation Checklist

### Database & Backend
- [ ] Check `.env` has valid `NODEMAILER_EMAIL` and `NODEMAILER_PASS`.
- [ ] Add `technicianNotified`, `technicianEmail`, `notifiedAt`, `technicianNotes` to `models/Issue.js`.
- [ ] Update `utils/nodeMailer.js` to ensure error propagation.
- [ ] Implement `notifyTechnicianByEmail` in `controllers/adminIssueController.js`.
- [ ] Register `POST /:id/notify-technician` in `routers/adminIssueRouter.js`.

### Admin Dashboard Frontend
- [ ] Add `notifyTechnician` mutation to `hooks/useIssueActions.js`.
- [ ] Create `components/issues/NotifyTechnicianModal.jsx`.
- [ ] Add "Notify Technician" button and status badge in `components/issues/IssueCard.jsx`.
- [ ] Wire modal state and handler in `pages/issues/Issues.jsx`.

### Security & Verification
- [ ] Verify that only authenticated admins can trigger the notification route.
- [ ] Verify SMTP credentials are not exposed to the frontend.
- [ ] Verify end-to-end email delivery with a test ticket.
