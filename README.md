
# Hospital Appointment

Hospital Appointment is a Appointment Management System made with Node.js & React.\
Patients can create hospital appointments to departments and doctors they choose.\
Doctors can open and close appointments, diagnose patients and choose diseases form completed appointments.


## Installation

- Clone Project 

```bash
$ git clone https://github.com/erentnr/hospital-appointment.git
```

- Install dependencies and start both client and backend server
```
$ cd server
$ npm i
$ npm start
$ cd ..
$ cd client
$ npm i
$ npm start
```

- Go to `localhost:3000`


## Tech

- **Server Side:** Node.js, Express

- **Client Side:** React.js, Axios

- **Database:** MongoDB

## Deployed Demo

Deployed demo will be at [here]("") when it is ready.

For Patient:
- email: `patient@mail.com`
- password: `patient`

For Doctor:
- username: `doctor@mail.com`
- password: `doctor`



## API Reference

The backend and frontend communicate through REST Apis. On the frontend, 
we make Axios requests to the following routes:

### Users

| URI | Method | Operation |
| :--- | :--- | :--- |
| api/users | get | get all users  |
| api/users/:id | get | get a user |
| api/users/:id | put | update a user |
| api/users/:id | delete | delete a user |

### Auth

| URI | Method | Operation |
| :--- | :--- | :--- |
| api/auth/register | post | create a new account  |
| api/auth/login | post | login to an account |
| api/auth/logout | post | logout from an account |

### Departments

| URI | Method | Operation |
| :--- | :--- | :--- |
| api/departments | get | get all departments  |
| api/departments | post | create a new departments  |
| api/departments/:id | get | get a department |
| api/departments/:id | put | update a department |
| api/departments/:id | delete | delete a department |

### Appointments

| URI | Method | Operation |
| :--- | :--- | :--- |
| api/appointments | get | get all appointments  |
| api/appointments | post | create a new appointment  |
| api/appointments/:id | get | get an appointment |
| api/appointments/:id | put | update an appointment |
| api/appointments/:id/status | put | update an appointment status | 

### Diseases

| URI | Method | Operation |
| :--- | :--- | :--- |
| api/diseases | get | get all diseases  |
| api/diseases | post | create a new disease  |
| api/diseases/:id | get | get a disease |
| api/diseases/:id | put | update a disease |
| api/diseases/:id | delete | delete a diseases |

## Authors

- [@yrtby](https://github.com/yrtby)
- [@Coskntkk](https://github.com/Coskntkk)
- [@cagatay135](https://github.com/cagatay135)
- [@erentnr](https://github.com/erentnr)
- [@imertekin](https://github.com/imertekin)


## License

[MIT](https://choosealicense.com/licenses/mit/)
