const express=require('express');
const path = require('path');
const hbs = require('hbs');


//directory for the paths
const app=express();
const publicDirectoryName=path.join(__dirname,'../public');
const partialsDirectoryPath=path.join(__dirname,'../public/templates/partials');

//registering views and partials
app.set('view engine','hbs');
app.set('views', path.join(__dirname, '../public/templates/views'));
hbs.registerPartials(partialsDirectoryPath);

//app.use(express.static(publicDirectoryName));


app.get('',(req,res)=>{
    res.render('index',{title:'Weather Data',name:'Andrew Mead'});
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'Gyanesh Bohara Test Page'});
})


app.get('/help',(req,res)=>{
    res.render('help',{
        information:'Please reach us for any query',
        title:'Help'
    })
})

console.log(publicDirectoryName);

// /** api call for normal request */
// app.get('',(req,res)=>{
//     res.send("<h3>Gyanesh</h3>");
// })

/** api call for help  */
app.get('/help',(req,res)=>{
    res.send("Help Page");
})

app.get('/weather',(req,res)=>{
    res.send([{
        weather:'Test'
    },
    {
        weather:'Hello World'
    },
])
})

/** error handling  **/
app.get('*',(req,res)=>{
    res.send('404 oage not found');
})

app.listen(3000,()=>{
    console.log("Port 3000 is listeninig")
})