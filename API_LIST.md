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

- POST /reques/send/intrested/:userId
- POST /reques/send/ignore/:userId
- POST /reques/review/accepted/:reqId
- POST /reques/review/rejected/:reqId

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed

Status = intrested, accepted, rejected, ignore
