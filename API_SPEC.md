Table of Contents
Authentication

Register User

Login User

Logout User

User Profile

Get Profile

Update Profile

Auctions

Get All Auctions

Get Auction Details

Bidding

Place a Bid

Get User Bids

Error Handling

Authentication & Headers

1. Authentication
Register User
Endpoint:
POST /api/auth/register

Request Body:

json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword"
}
Success Response:

json
{
  "success": true,
  "message": "User registered successfully"
}
Error Response:

json
{
  "success": false,
  "error": "Email already exists"
}
Login User
Endpoint:
POST /api/auth/login

Request Body:

json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
Success Response:

json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {
    "id": "user123",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
Error Response:

json
{
  "success": false,
  "error": "Invalid credentials"
}
Logout User
Endpoint:
POST /api/auth/logout

Headers:
Authorization: Bearer <JWT_TOKEN>

Success Response:

json
{
  "success": true,
  "message": "Logged out successfully"
}
2. User Profile
Get Profile
Endpoint:
GET /api/user/profile

Headers:
Authorization: Bearer <JWT_TOKEN>

Success Response:

json
{
  "success": true,
  "user": {
    "id": "user123",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
Update Profile
Endpoint:
PUT /api/user/profile

Headers:
Authorization: Bearer <JWT_TOKEN>

Request Body:

json
{
  "username": "john_doe_2",
  "email": "john2@example.com"
}
Success Response:

json
{
  "success": true,
  "user": {
    "id": "user123",
    "username": "john_doe_2",
    "email": "john2@example.com"
  }
}
3. Auctions
Get All Auctions
Endpoint:
GET /api/auctions

Success Response:

json
{
  "success": true,
  "auctions": [
    {
      "id": "auction1",
      "title": "MacBook Pro 2025",
      "description": "Brand new MacBook Pro",
      "currentBid": 1200,
      "endTime": "2025-06-01T15:00:00Z"
    },
    ...
  ]
}
Get Auction Details
Endpoint:
GET /api/auctions/:id

Success Response:

json
{
  "success": true,
  "auction": {
    "id": "auction1",
    "title": "MacBook Pro 2025",
    "description": "Brand new MacBook Pro",
    "currentBid": 1200,
    "bids": [
      {
        "userId": "user123",
        "amount": 1200,
        "timestamp": "2025-05-21T13:00:00Z"
      }
    ],
    "endTime": "2025-06-01T15:00:00Z"
  }
}
4. Bidding
Place a Bid
Endpoint:
POST /api/auctions/:id/bid

Headers:
Authorization: Bearer <JWT_TOKEN>

Request Body:

json
{
  "amount": 1300
}
Success Response:

json
{
  "success": true,
  "message": "Bid placed successfully",
  "newBid": {
    "userId": "user123",
    "amount": 1300,
    "timestamp": "2025-05-21T13:10:00Z"
  }
}
Error Response:

json
{
  "success": false,
  "error": "Bid must be higher than current bid"
}
Get User Bids
Endpoint:
GET /api/user/bids

Headers:
Authorization: Bearer <JWT_TOKEN>

Success Response:

json
{
  "success": true,
  "bids": [
    {
      "auctionId": "auction1",
      "amount": 1200,
      "timestamp": "2025-05-21T13:00:00Z"
    },
    ...
  ]
}
5. Error Handling
All error responses will have success: false and an error message.

HTTP status codes will match the error type (e.g., 400, 401, 404, 500).

6. Authentication & Headers
All protected endpoints require the header:
Authorization: Bearer <JWT_TOKEN>

Obtain the JWT token from the login endpoint and store it securely (e.g., HTTP-only cookie or localStorage).

7. Example Environment Variables
text
NEXT_PUBLIC_API_URL=http://localhost:5000