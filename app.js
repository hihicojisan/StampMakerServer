var express = require("express");
var http = require("http");

var app = express();

var formidable = require("formidable");
var fs = require("fs");

app.set("port", 8888);
app.use("/lib", express.static("lib"));
app.use("/html/assetts/", express.static("html/assetts/"));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/html/bones.html", function(req, res){
    res.sendFile(__dirname+"/html/bones.html");
});

app.post("/post", function(req, res){
    var form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.uploadDir = "./images";

    form.parse(req, function(err, fields, files){
        var oldPath = files.file._writeStream.path;
        var newPath = "./images/"+files.file.name;
        console.log(oldPath, newPath);
        fs.rename(oldPath, newPath, function(err){
            if (err) throw err;
        });
    });
    // 本来はtf-poseからの出力を待ってレスポンスを返す
    res.writeHead(200, {"content-type":"text/html"});
    var array = "\
        [[7.54516134791414, -21.768140173180647, -183.4596745057812],\
        [-124.5336455982307, 2.415918621530429, -284.8569690566266],\
        [-193.02280218024345, -134.14277584172567, -702.8368725045019],\
        [-119.88440248193754, 9.72410772056005, -970.9002981473045],\
        [154.8486118073826, -45.952199328402315, -334.57519674023166],\
        [215.08971510235713, -174.52465049814086, -714.29186443519],\
        [166.46238247650444, -23.654825428960223, -983.4563352068009],\
        [3.4347934233028363, 63.754926563186196, 133.4556896348461],\
        [4.0444335372624645, 92.51847278387943, 380.5741280391957],\
        [-23.95490498313763, -6.959973842296878, 587.2537513546404],\
        [-59.80226250940439, 52.05215416663249, 664.2835118003845],\
        [195.78954304127942, 82.72433860524372, 345.4867843416409],\
        [436.04629683883314, 101.85369806885731, 157.6088322373995],\
        [467.13680014680523, -35.958118637279526, -188.32700894361506],\
        [-182.2795224752419, 127.74897641993233, 369.8786700504398],\
        [-398.79876732551367, 27.03427199859532, 338.61811621791105],\
        [-514.5184003971674, -116.86618120857737, 524.1660520795907]]";
    res.write(array);
    res.end();
});

http.createServer(app).listen(app.get("port"), function(){
    console.log("Server is listening on http://localhost:8888");
});