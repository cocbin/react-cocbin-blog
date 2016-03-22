var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var IdsSchema = new Schema ({
    name:String,
    id:Number
});

var CategorySchema = new Schema({
    id:{type:Number, unique: true},
    name:{type:String, unique:true},
    icon:String,
    description:String,
    articleCount:{type:Number, default:0}
});

var TagsSchema = new Schema({
    id:{type:Number, unique: true},
    name:{type:String, unique:true},
    icon:String,
    description:String,
    articleCouont:{type:Number,default:0}
});

var ArticleSchema = new Schema({
    id:{type:Number, unique: true},
    title:String,
    description:String,
    date:Date,
    category:{
        type:Schema.ObjectId,
        ref:'category'
    },
    tags:[{
        type:Schema.ObjectId,
        ref:'tags'
    }],
    keyword:[
        String
    ],
    content:String,
    look:{
        type:Number,
        default:0
    },
    like:{
        type:Number,
        default:0
    }
});


var Ids = mongoose.model('ids',IdsSchema);
var CategoryModel = mongoose.model('category',CategorySchema);
var TagsModel = mongoose.model('tags',TagsSchema);
var getNewID = function(name,callback){
    Ids.findOneAndUpdate({"name":name}, {$inc:{'id':1}},{new:true,upsert:true},callback);
};

var addArticleCountOfCate = function(id) {
    CategoryModel.findOneAndUpdate({'_id':id}, {$inc:{'articleCouont':1}},{new:true},null);
};

var addArticleCountOfTags = function(tags) {
    TagsModel.findOneAndUpdate({'id':{$in:tags}}, {$inc:{'articleCouont':1}},{new:true},null);
};

module.exports.CategoryModel = CategoryModel;
module.exports.TagsModel = TagsModel;
module.exports.ArticleModel = mongoose.model('article',ArticleSchema);
module.exports.getNewID = getNewID;
module.exports.addArticleCountOfCate = addArticleCountOfCate;
module.exports.addArticleCountOfTags = addArticleCountOfTags;
