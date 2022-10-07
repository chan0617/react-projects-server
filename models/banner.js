module.exports=function(sequelize, dataTypes){
    const banner=sequelize.define('Banner',{//테이블명 보통 앞글자는 대문자로 만듬
        imageUrl:{
            type:dataTypes.STRING(300),
            allowNull:false,//빈값허용할건지
        },
        href:{
            type:dataTypes.STRING(200),
            allowNull:false,
        }
    });
    return banner;
}