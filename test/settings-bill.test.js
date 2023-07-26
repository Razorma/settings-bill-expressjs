import assert from "assert";
import radioBillTotalSettings from "../settings-bill.js";


describe('radioBillTotalSettings', function() {
    it('should be able to set the call cost', function() {
      const results = radioBillTotalSettings();
      results.setCallCost(2.75);
      assert.equal(results.getCallCost(), 2.75);
    });
    it('should be able to set the sms cost', function() {
      const results = radioBillTotalSettings();
      results.setSmsCost(0.75);
      assert.equal(results.getSmsCost(), 0.75);
    });
    it('should be able to set the warning level', function() {
      const results = radioBillTotalSettings();
      results.setWarningLevel(30);
      assert.equal(results.getWarningLevel(), 30);
    });
  
    it('should be able to set the danger level', function() {
      const results = radioBillTotalSettings();
      results.setDangerLevel(60);
      assert.equal(results.getDangerLevel(), 60);
    });
    it('should be able to use the call cost ', function() {
      const results = radioBillTotalSettings();
      results.setCallCost(2.00);
      results.setSmsCost(1.50);
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      
      assert.equal(results.getTotals().calls,10.00);
    });
    it('should be able to use the sms cost ', function() {
      const results = radioBillTotalSettings();
      results.setSmsCost(1.50);
      results.setCallCost(1.50);
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      
      assert.equal(results.getTotals().sms,7.50);
    });

    it('should be able to use the sms cost and call cost to set the total  ', function() {
      const results = radioBillTotalSettings();
      results.setSmsCost(2.50);
      results.setCallCost(3.00);
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      
      assert.equal(results.getTotals().total,14.00);
    });

    it('should be able to use the warning level', function() {
      const results = radioBillTotalSettings();
      results.setSmsCost(2.00);
      results.setCallCost(3.00);
      results.setWarningLevel(41.00);
      results.setDangerLevel(50.00);
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      
      assert.equal(results.getWarningLevel(), '41.00');
      assert.equal(results.getColor(), 'warning');
    });
    it('should be able to use the danger level ', function() {
      const results = radioBillTotalSettings();
      results.setSmsCost(2.00);
      results.setCallCost(3.00);
      results.setWarningLevel(41.00);
      results.setDangerLevel(50.00);
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('call');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      results.calculateBill('sms');
      
      assert.equal(results.getDangerLevel(), '50.00');
      assert.equal(results.getColor(), 'danger');
    });
  });