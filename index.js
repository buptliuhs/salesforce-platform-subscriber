var jsforce = require("jsforce");

var conn = new jsforce.Connection({
    loginUrl: "https://login.salesforce.com/",
});

console.log("Starting listener...");

var username = "xxxxx";
var password = "xxxxx";
var channel = "/event/My_Event__e";
conn.login(username, password, function(err, userInfo) {
    if (err) {
        return console.error(err);
    }
    console.log(`>>> ${JSON.stringify(userInfo)}`);
    console.log("Login to Salesforce is successful!");
    const replayExt = new jsforce.StreamingExtension.Replay(channel, -1);
    // const replayExt = new jsforce.StreamingExtension.Replay(channel, 1606);
    const fayeClient = conn.streaming.createClient([ replayExt ]);

    const subscription = fayeClient.subscribe("/event/My_Event__e", function(message) {
        console.log("=== Message received ===");
        console.log(`>>> ${JSON.stringify(message)}`);
    });
    const stream = fayeClient.unsubscribe("/event/My_Event__e", function(message) {
        console.log("=== Message un ===");
        console.log(`>>> ${JSON.stringify(message)}`);
    });
    console.log(subscription);
    subscription.cancel();
    // console.log(subscription);
    console.log(">>> here")
    // console.log(conn);
    // conn.logout(() => {
        // console.log("Logged out");
    // });
    // console.log(conn);
});

console.log(">>>");

