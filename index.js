var fs = require("fs");
var flags = require("flags");
var async = require("async");
var jsonpi = {};

jsonpi.flags = function(){
    return function(callback){
        flags.defineString('input', false, 'Input Path');
        flags.defineString('callback', 'callback', 'Callback Name');
        flags.parse();
        var pass = {};
        pass.input = flags.get('input');
        pass.callback = flags.get('callback');
        return callback(null, pass);
    }
};

jsonpi.input = function(){
    return function(pass, callback){
        if(pass.input){
            return callback(null, pass);
        }else{
            return callback("no --input file specified", pass);
        }
    }
}

jsonpi.exists = function(){
    return function(pass, callback){
        fs.lstat(pass.input, function(err, stats){
            if(err){
                return callback("can't find specified input path", pass);
            }else{
                pass.stats = stats;
                return callback(null, pass);
            }
        }); 
    }
}

jsonpi.file = function(){
    return function(pass, callback){
        if(pass.stats.isFile()){
            return callback(null, pass);
        }else{
            return callback("input is not file", pass);            
        }
    }
}

jsonpi.read = function(){
    return function(pass, callback){
        fs.readFile(pass.input, "utf8", function (err, data) {
            if(err){
                return callback("read file failed", pass);
            }else{
                pass.data = data
                return callback(null, pass);
            }
        });
    }
}

jsonpi.together = function(){
    return function(pass, callback){
        pass.ship = "";
        pass.ship = pass.callback + '({"data":'+JSON.stringify(pass.data)+'})';
        return callback(null, pass);
    }
}

async.waterfall([
    jsonpi.flags(),
    jsonpi.input(),
    jsonpi.exists(),
    jsonpi.file(),
    jsonpi.read(),
    jsonpi.together()
], function(err, pass){
    if(err){
        console.log(err);
    }else{
        console.log(pass.ship);
    }
});