# The School project

The School is a JavaScript application for making a timetable and planing school hours.

## MondoDB models schema

Please visit [this link](https://whimsical.com/MgMqUjTAqfcGqtDcsNdhAV) to check the full models schema

## Usage
In order to register you need to send a POST request to `/register` route:

```http
POST /register HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
"email": "youremail@example.com",
"password": "yourpassword"
}
```
Then probably you would like to login. You can do it on `/login` route via POST request:
```http
POST /login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
"email": "youremail@example.com",
"password": "yourpassword"
}
```
The response will be the following:
```json
{
    "token": "your-secret-token"
}
```
You will receive back a token that should be present in Authorization header in your next requests.

Then you can do the following:
1. Create a lesson.

* Request

```http
POST /create-lesson HTTP/1.1
Host: localhost:3000
Authorization: Bearer your-secret-token
Content-Type: application/json

{
    "subject": "English",
    "teacher": { "name": "Name", "surname": "Surname"},
    "group": 1,
    "class": 5,
    "order": 1,
}
```
* Response
```
{
    "text": "The lesson was created."
}
```
2. View all lessons.

* Request

```http
GET /lessons HTTP/1.1
Host: localhost:3000
Authorization: Bearer your-secret-token
```

* Response
```json
{
    "lessons": [
        {
            "_id": "5f04be59f7be0a8a7be65435",
            "subject": "Pure math",
            "teacher": {
                "name": "Name",
                "surname": "Surname"
            },
            "group": {
                "students": [],
                "number": 121
            },
            "class": 204,
            "order": 2
        },
        {
            "_id": "5f04c6a7d84e9e8e69f320a3",
            "subject": "english",
            "teacher": {
                "name": "Name",
                "surname": "Surname"
            },
            "group": {
                "students": [],
                "number": 4
            },
            "class": 101,
            "order": 1
        }
    ]
}
```
3. Delete a lesson by its id.

* Request

```http
DELETE /delete-lesson/<id-of-lesson-to-delete> HTTP/1.1
Host: localhost:3000
Authorization: Bearer your-secret-token
```
* Responce
```json
{
    "text": "Lesson was deleted."
}
```
4. Update a lesson by its id.

* Request

```http
PUT /update-lesson/<id-of-lesson-to-update>  HTTP/1.1
Host: localhost:3000
Authorization: Bearer 
Content-Type: application/json

{
  "subject": "Pure math",
  "teacher": { "name": "Name", "surname": "Surname" },
  "group": 7,
  "class": 3,
  "order": 6
}
```
* Responce 
```
{
    "text": "Lesson was updated."
}
```

## License

[ISC](https://choosealicense.com/licenses/isc/)
