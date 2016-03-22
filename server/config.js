var pass = require('./pass').hash;

config = {
    userName:"cocbin",
    password:"123456",
    salt:undefined,
    hash:undefined
};

(function(){
    pass(config.password,(err,salt,hash)=>{
        if(err) {
            console.log('启动失败,初始化用户异常,ERR:'+err);
        }
        config.hash = hash;
        config.salt = salt;
    })
})();

module.exports = config;