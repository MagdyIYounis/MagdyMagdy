var Info;
module.exports = {

    Student: (req, res) => {

        res.render("Student.ejs", {
            title: "Add Student",
            Massage: ""

        });

    },
    Select: (req, res) => {

        let Stat = "SELECT * FROM `student` WHERE `ID_ST`=? and `Phone_ST`=?",
            ID = req.body.ID,
            phone = req.body.Phone;
        DB.query(Stat, [ID, phone], (err, result) => {

            if (err) throw err;
            if (result.length == 1) {

                Stat = "SELECT * FROM `all_student` WHERE `Student`=?";

                DB.query(Stat, [ID], (err, result) => {

                    if (result.length == 0) {
                        res.render("Student.ejs", {
                            title: "Add Student",
                            Massage: "هذا الطالب غير حاجز مواد"
                        });
                    } else {
                        Info = result;
                        res.render("Data_Student.ejs", {
                            title: "Add Student",
                            Data: Info,
                            Massage: {
                                code: "",
                                Massages: "هناك خطا فى بيانات الدخول"
                            },
                        });


                    }

                })


            } else {

                res.render("Student.ejs", {
                    title: "Add Student",
                    Massage: "بيانات غير صحيحة"
                });

            };

        })

    },
    SendOrder: (req, res) => {

        let ID = req.body.ID,
            Order = req.body.Order,
            stat = "INSERT INTO `order_student`( `ID_Stu`, `Order_St`) VALUES (?,?)";
        if (ID != "" && Order != "") {


            DB.query(stat, [ID, Order], (err, result) => {
                if (err) throw err;
                if(result.affectedRows == 1){

                    res.render("Data_Student.ejs", {
                        title: "Add Student",
                        Massage: {
                            code: "1",
                            Massages: "تم ارسال الطلب بنجاح"
                        },
                        Data: Info
                    })

                }
                

            })




        } else {
            res.render("Data_Student.ejs", {
                title: "Add Student",
                Massage: {
                    code: "0",
                    Massages: "هناك خطا فى بيانات الدخول"
                },
                Data: Info
            })
        }

    }

}