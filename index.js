var express = require('express');
const {OperationHelper} = require('apac');

var app = express();
var port = process.env.PORT || 10007;

app.use((req,resp,next)=>{
    resp.setHeader("Access-Control-Allow-Origin","*");
    next();
})
app.listen(port, (err)=>{
    if (err){
        console.log("error: " + err);
        return false;
    }
    console.log("port is running");
})

var opHelper = new OperationHelper({
    awsId:     'AKIAIF7UQEIYOQ5V7WYA',
    awsSecret: "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",
    assocId:   "beautytwin07-20",
    locale:    'CA'
});

/* GET home page. */
app.get('/search/:item', function(req, res, next) {
    
    var item = req.params.item;
    opHelper.execute('ItemSearch', {
        'SearchIndex': 'Beauty',
        'Keywords': item,
        'ResponseGroup': 'ItemAttributes,Offers'
    }).then((response) => {
        //console.log("Results object: ", response.result);
        res.send(response.result);
        //console.log("Raw response body: ", response.responseBody);
    }).catch((err) => {
        console.error("Something went wrong! ", err);
    });
    
    //res.render('index', { title: 'Express' });
});

//app.post('/search/:item', function(req, res, next) {
//    
//}
