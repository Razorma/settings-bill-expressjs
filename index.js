import express from "express";
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import radioBillTotalSettings from "./settings-bill.js";

let app = express();
const settingsBill = radioBillTotalSettings()

// Setup the Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.render('home',{
        
            smsCost:settingsBill.getCallCost(),
            callCost:settingsBill.getSmsCost(),
            warningLevel:settingsBill.getWarningLevel(),
            criticalLevel:settingsBill.getDangerLevel(),
            totals:settingsBill.getTotals(),
            Colors:settingsBill.getColor()
  
    });
})
app.post("/settings", function (req, res) {

    settingsBill.setCallCost(parseFloat(req.body.callCost))
    settingsBill.setSmsCost(parseFloat(req.body.smsCost))
    settingsBill.setWarningLevel(parseFloat(req.body.warningLevel))
    settingsBill.setDangerLevel(parseFloat(req.body.criticalLevel))
    res.redirect("/")
});

app.post("/action", function (req, res) {
    settingsBill.calculateBill(req.body.actionType)
    res.redirect("/")
});


app.get("/actions", function (req, res) {
    res.render('actions',{actions:settingsBill.actions()})
});

app.get("/actions/:type", function (req, res) {
    const actionType = req.params.type;
    res.render('actions',{actions:settingsBill.filterActions(actionType)})
});

let PORT = process.env.PORT || 3007;

// Start the app
app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});