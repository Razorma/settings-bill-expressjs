import express from "express";
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import radioBillTotalSettings from "./settings-bill.js";
import moment from "moment";

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
        
            callCost:settingsBill.getCallCost(),
            smsCost:settingsBill.getSmsCost(),
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
app.post("/reset", function (req, res) {
    settingsBill.setCallCost("")
    settingsBill.setSmsCost("")
    settingsBill.setWarningLevel("")
    settingsBill.setDangerLevel("")
    settingsBill.resetSettings()
    settingsBill.resetTotals()
    res.redirect("/")
});


app.get("/actions", function (req, res) {
    const actions = settingsBill.actions().map(action => ({
        ...action,
        timestamp: moment(action.timestamp).fromNow()
      }));
      res.render('actions', { actions });
});

app.get("/actions/:type", function (req, res) {
    const actionType = req.params.type;
    const actions = settingsBill.filterActions(actionType).map(action => ({
        ...action,
        timestamp: moment(action.timestamp).fromNow()
      }));
      res.render('actions', { actions });
});

let PORT = process.env.PORT || 3007;

// Start the app
app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});