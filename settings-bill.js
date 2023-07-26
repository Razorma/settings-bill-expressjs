
export default function radioBillTotalSettings(){ 
    var callCost = 0;
    var smsCost = 0;
    var cost = 0;
    var callsTotalSetting = "";
    var smsTotalSetting = "";
    var warningTotal = "";
    var criticalTotal = "";
    var actionList =[];


    function setCallCost(callCostSettings){
      callsTotalSetting = callCostSettings
    }
    function getCallCost(){
      return callsTotalSetting
    }
    function setSmsCost(smsCostSettings){
      smsTotalSetting = smsCostSettings
    }
    function getSmsCost(){
      return smsTotalSetting
    }
    function setWarningLevel(warningSettings){
      warningTotal = warningSettings
    }
    function getWarningLevel(){
      return warningTotal
    }
    function setDangerLevel(dangerSettings){
      criticalTotal = dangerSettings
    }
    function getDangerLevel(){
      return criticalTotal
    }

    function calculateBill(billItemType) {
      if (getColor() === "danger") {
        return;
      }
      if (billItemType === "call") {
        callCost += callsTotalSetting
        cost = callsTotalSetting
      } else if (billItemType === "sms") {
        smsCost += smsTotalSetting;
        cost = smsTotalSetting
      }
      actionList.push({
        type:billItemType,
        cost:cost.toFixed(2),
        timestamp:new Date()
      })
    }
    function actions() {
      return actionList
    }
    function filterActions(actionType) {
      if (actionType === "totals") {
        return actionList;
      } else {
        return actionList.filter((action) => action.type === actionType);
      }
    }
  
    function getTotals() {
      return {
        calls: callCost.toFixed(2),
        sms: smsCost.toFixed(2),
        total: (callCost + smsCost).toFixed(2),
      };
    }
    function getSettings() {
      return {
        callsTotalSetting,
        smsTotalSetting,
        warningTotal,
        criticalTotal,
      };
    }
    function resetSettings() {
        callsTotalSetting="";
        smsTotalSetting="";
        warningTotal="";
        criticalTotal="";
      
    }
  
  
    function getColor() {
      const totalCost = callCost + smsCost;
      if (totalCost >= criticalTotal && criticalTotal!=="") {
        return "danger";
      } else if (totalCost >= warningTotal && warningTotal!=="") {
        return "warning";
      } else {
        return "";
      }
    }
    function resetTotals() {
      callCost = 0;
      smsCost = 0;
    }
  
    
      
      return {
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        actions,
        filterActions,
        setWarningLevel,
        resetSettings,
        getWarningLevel,
        setDangerLevel,
        getDangerLevel,
        calculateBill,
        getTotals,
        getColor,
        resetTotals,
        getSettings
      };
      
  };

