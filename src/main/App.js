const express=require('express');
const path = require('path');
const hbs = require('hbs');
const weatherRequest=require('../utils/request');
const fetchWeatherInformation = require('../utils/request');
const e = require('express');


//directory for the paths
const app=express();
const publicDirectoryName=path.join(__dirname,'../public');
const partialsDirectoryPath=path.join(__dirname,'../public/templates/partials');
const styles=path.join(__dirname,'../stylesheets/css');


//registering views and partials
app.set('view engine','hbs');
app.set('views', path.join(__dirname, '../public/templates/views'));


const publicPath = path.resolve(__dirname, "public/templates");

hbs.registerPartials(partialsDirectoryPath);
//hbs.registerPartial(styles);

app.use(express.static(publicDirectoryName));


app.get('',(req,res)=>{
    res.render('index',{title:'Weather',footerLabel:'Creatd by Gyanesh'});
})


app.get('/about',(req,res)=>{
    res.render('about',{title:'About' ,footerLabel:'Created by Gyanesh'});
})


app.get('/help',(req,res)=>{
    res.render('help',{
        information:'Please reach us for any query',
        title:'Help',
        footerLabel:'Creatd by Gyanesh'
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

/** fetch the weather report **/
app.get('/weather',(req,res)=>{



    fetchWeatherInformation(req.query.address,(error,data)=>{
        if(error){
            res.end({
                error:error
            })
        }else{ 
            // res.send({
            //     latitude:data.latitude,
            //     longitude:data.longitude,
            //     forecast:data.weatherReport
            // })

            res.render('index',{title:'Weather',weatherReport:data.weatherReport});

        }
    })
})

/** error handling  **/
app.get('*',(req,res)=>{
    res.send('404 oage not found');
})

app.listen(3000,()=>{
    console.log("Port 3000 is listeninig")
})