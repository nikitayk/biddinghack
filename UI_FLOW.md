/* Table of Contents
User Registration Flow

User Login Flow

Browse Auctions Flow

Place Bid Flow

Profile Management Flow

Integration Points

Error Handling in UI

State Management

Testing Checklist

Mockups & Wireframes

1. User Registration Flow
Steps:

User navigates to /register.

Fills in username, email, password, and confirm password.

Submits the form.

Integration Points:

UI Component: RegistrationForm (/components/UserRegistrationForm.tsx)

API Endpoint: POST /api/auth/register

Success Action: Redirect to /login with success toast.

Error Handling: Display inline errors (e.g., "Email already exists").

2. User Login Flow
Steps:

User navigates to /login.

Enters email and password.

Submits the form.

Integration Points:

UI Component: LoginForm (/components/LoginForm.tsx)

API Endpoint: POST /api/auth/login

Success Action:

Store JWT token in localStorage/React Context.

Redirect to /auctions.

Error Handling: Display "Invalid credentials" below the form.

3. Browse Auctions Flow
Steps:

User visits /auctions.

Sees a list of active auctions with titles, current bids, and end times.

Clicks an auction to view details (/auctions/:id).

Integration Points:

UI Components:

AuctionList (/components/AuctionList.tsx)

AuctionItem (/components/AuctionItem.tsx)

API Endpoints:

GET /api/auctions (list)

GET /api/auctions/:id (details)

State Management:

Fetch auctions on mount using useEffect.

Cache data in React Context to minimize API calls.

4. Place Bid Flow
Steps:

On /auctions/:id, user enters bid amount.

Clicks "Place Bid".

Confirms bid in a modal.

Integration Points:

UI Components:

BidForm (/components/BidForm.tsx)

ConfirmationModal (/components/ConfirmationModal.tsx)

API Endpoint: POST /api/auctions/:id/bid

Success Action: */

// router.tsx