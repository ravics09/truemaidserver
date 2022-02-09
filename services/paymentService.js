require("dotenv").config();
const https = require("https");
const PaytmChecksum = require("paytmchecksum");

module.exports = { generatechecksum };

async function generatechecksum(request, response) {

  let callbackurl = `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=${request.body.orderId}`;

  let paytmParams = {};

  paytmParams["MID"] = process.env.MID;
  paytmParams["ORDERID"] = request.body.orderId;
  paytmParams["WEBSITE"] = "WEBSTAGING";
  paytmParams["INDUSTRY_TYPE_ID"] = "Retail";
  paytmParams["CHANNEL_ID"] = "WAP";
  paytmParams["TXN_AMOUNT"] = request.body.amount;
  paytmParams["CALLBACK_URL"] = callbackurl;

  let paytmChecksum = PaytmChecksum.generateSignature(
    paytmParams,
    process.env.MERCHANT_KEY
  );

  paytmChecksum
    .then(function (checksum) {
      console.log("generateSignature Returns Checksum: " + checksum);

      return response.status(200).json({
        status: 200,
        token: checksum,
      });
      //   paytmParams.head = {
      //     signature: checksum,
      //   };
      //   var post_data = JSON.stringify(paytmParams);
      //   var options = {
      //     /* for Staging */
      //     hostname: "securegw-stage.paytm.in" /* for Production */, // hostname: 'securegw.paytm.in',

      //     port: 443,
      //     path: `/theia/api/v1/initiateTransaction?mid=${process.env.MID}&orderId=${orderId}`,
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Content-Length": post_data.length,
      //     },
      //   };

      //   var response = "";
      //   var post_req = https.request(options, function (post_res) {
      //     post_res.on("data", function (chunk) {
      //       response += chunk;
      //     });

      //     post_res.on("end", function () {
      //       console.log("Response: ", response, "\n");
      //       let result = JSON.parse(response);
      //       if (result.STATUS === "TXN_SUCCESS") {
      //         res.send("payment success");
      //       } else {
      //         res.send("payment failed");
      //       }
      //     });
      //   });

      //   post_req.write(post_data);
      //   //   post_req.end();

      //   var verifyChecksum = PaytmChecksum.verifySignature(
      //     paytmParams,
      //     process.env.MERCHANT_KEY,
      //     result
      //   );
      //   console.log("verifySignature Returns: " + verifyChecksum);
    })
    .catch(function (error) {
      console.log(error);
    });
}
