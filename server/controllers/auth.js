const mongoose  = require('mongoose');
const User  = mongoose.model('user');
const bcryptjs = require('bcryptjs');

const singIn = async (req, res) =>{
    const {login, password } = await req.body;
    User.findOne({login}).exec()
    .then((user) =>{
        if(!user){
            res.status(400).json({message:'пользователь с таким логином уже есть, придумаете другой'});
        }
        const valid = bcryptjs.compareSync(password, user.password);
        if(valid){
            const token = sign(user._id.toString());
            res.json({token});
        }else{
            res.status(400).json({message: 'что-то пошло не так'});
        }
    })

}


