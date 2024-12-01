# Dev Tinder

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/:status/:userId
- POST /request/review/:status/:reqId

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed

Status = interested, accepted, rejected, ignore
