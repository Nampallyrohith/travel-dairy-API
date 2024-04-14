const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const databasePath = path.join(__dirname, "travelDairy.db");

const initializeDbAndStartServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndStartServer();

app.post("/register/", async (request, response) => {
    const { username, password, name, gender } = request.body;
    // check if user already exists with the same username
    const selectUserQuery = `
        SELECT * FROM user WHERE username = '${username}';
        `;
    const dbUser = await database.get(selectUserQuery);
    if (dbUser) {
        response.status(400);
        response.send("User already exists");
    } else if (password.length < 6) {
        response.status(400);
        response.send("Password is too short");
    } else {
        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const addNewUserQuery = `
            INSERT INTO user (name, username, password, gender) 
            VALUES ('${name}', '${username}', '${hashedPassword}', '${gender}');
            `;
        await database.run(addNewUserQuery);
        response.send("User created successfully");
    }
});


app.post("/login/", async (request, response) => {
const { username, password } = request.body;
// check if the username exists
const selectUserQuery = `
    SELECT * FROM user WHERE username = '${username}';
    `;
const dbUser = await database.get(selectUserQuery);
if (!dbUser) {
    response.status(400);
    response.send("Invalid user");
} else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordMatched) {
    response.status(400);
    response.send("Invalid password");
    } else {
    const payload = { username };
    const jwtToken = jwt.sign(payload, "MY_SECRET_KEY");
    response.send({ jwtToken });
    console.log(jwtToken)
    }
}
});
  
  // Authentication Middleware
const authenticateUser = (request, response, next) => {
let jwtToken;
const authHeader = request.headers["authorization"];
if (!authHeader) {
    response.status(401);
    response.send("Invalid JWT Token");
} else {
    jwtToken = authHeader.split(" ")[1];
    jwt.verify(jwtToken, "MY_SECRET_KEY", (error, payload) => {
    if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
    } else {
        request.username = payload.username;
        next();
    }
    });
}
};



// Get all the places 
app.get('/user/places/',authenticateUser, async (request, response) => {
    const getPlaces = `SELECT * FROM dairy;`;
    const places = await database.all(getPlaces);
    response.send(places);
})


// Inserting new Place row
app.post('/user/places/id', authenticateUser, async (request, response) => {
    const {id , title, date, location, img} = request.body

    // checking row with respect to id if present
    const checkQuery = `
        SELECT * FROM dairy WHERE id=${id};
    `
    const query = await database.get(checkQuery)
    console.log(query)
    if (query !== undefined){
        response.send('Id existed in the dairy table...')
    }
    else{
        const insertQuery = `INSERT INTO dairy(id, title, date, location, img) 
                            VALUES ('${id}', '${title}', '${date}', '${location}', '${img}' );`;
    
        await database.run(insertQuery);
        response.status(200)
        response.send('Row inserted...')
    }  
})


// Get details of specific place
app.get('/user/places/:id/', authenticateUser, async (request, response) => {
    const {id} = request.params;

    const getQuery = `
        SELECT * FROM dairy WHERE id=${id};
    `;

    const query = await database.get(getQuery);
    response.send(query);
    response.status(200)
})


//Updating the Row
app.put('/user/places/:id/', authenticateUser, async (request, response) => {
    const {id} = request.params;
    const {date} = request.body;
    console.log(date)
    const checkQuery = `
        SELECT * FROM dairy WHERE id=${id};
    `;
    const query = await database.get(checkQuery)

    if (query === undefined){
        response.send('Firstly, You have to Insert, Id Not Found...')
    } else{
        const updateQuery = `
        UPDATE dairy
        SET
            date='${date}'
        WHERE id=${id}
        `
        await database.run(updateQuery);
        response.send("Row updated...")
        response.status(200);
    }
})




// Deleting the row
app.delete('/user/places/:id/', authenticateUser, async(request, response) => {
    const {id} = request.params;
    const checkQuery = `
        SELECT * FROM dairy WHERE id=${id};
    `;
    const query = await database.get(checkQuery)
    console.log(query)
    if (query === undefined){
        response.send('Id not found...')
    } else{
        const deleteQuery = `
        DELETE FROM dairy where id=${id};
        `;
        await database.run(deleteQuery);
        response.send('Row deleted....')
        response.status(200);
    }
    
})

 