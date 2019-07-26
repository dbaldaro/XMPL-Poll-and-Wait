// Functions to run upon XMPL startup
var xmplOnReady = function()
{

    // We know that when the page loads an external touchoint will be triggered. 
    // That arbitary process will, at the end write back an updated ADOR to the recipient's data.
    // We know that the ADOR that is expected to change is 'CouponID' and 'CouponURL'
    // We do not know how long that process will take, so we need to poll the Recipient's data 
    // until we see that it has changed. 

    var loopCount = 1;
    var successFlag = 0; 
    // Set up a function that will run every 500 milliseconds 
    var tid = setInterval(function(){

        // Initiate and set up the XMPL controller that will be used to read the recipient ADORs
        var xmpControllerDriverVar = new xmpControllerDriver($('[ng-controller="XMPPersonalizedPage"]'));
        xmpControllerDriverVar.ready(function() {
            if (xmpControllerDriverVar.xmp.recipientFailed == true)
                // If for some reason the controller fails, then handle it!
                window.location="pageError.html";
            else 
            {
                // Controller has initiated, so now set the options and retrieve the ADORs
                var resourceDriver = new xmpResourceDriver();
                var inOptions= {adors: ['CouponURL', 'CouponID']};
                resourceDriver.getRecipientADORs(xmpControllerDriverVar.xmp.recipientID, inOptions, function (data) {
                    // We now have recipient data held within 'data', so we can now test.
                    if (data.CouponID){
                        // The Coupon data has been written back, all is good.
                        // Either handle displaying the data on the page, or in this case we
                        // can redirect the user to the URL that is held in the ADOR value.
                        window.location=data.CouponURL;
                    }
                    else
                        // No updated data in the ADOR, so give some visual clue that something is 
                        // happening and try again. 
                        $("#status").html("Still trying: "+ loopCount);
                        loopCount++
                }, null);
            }
        });
        loopCount++;
      },500); //delay is in milliseconds 
      
    // We need to handle the possibility that after 10 second (or some amount of time)
    // that nothing has been written back to the recipient's ADORs. So handle that instance. 
    // In this case we kill the Interval loop above, so we do not loop forever and we display 
    // an error message for the user.
    setTimeout(function(){
        if(successFlag==0){
            $("#error").show();
            clearInterval(tid); //clear above interval after 10 seconds
        }

    },10000);

} //end xmplOnReady
