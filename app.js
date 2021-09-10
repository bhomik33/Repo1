const express = require('express');
const app = express();


app.get('/', (req,res)=> {
    res.send('Hello, welcome to Sales Analysis Software :)')
})


//Listening to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})