module.exports = {

    MainPage:(req,res)=>{
        res.render("index.ejs",{
            Data:"No Data",
            title:"Main Page"
        });

    }

}