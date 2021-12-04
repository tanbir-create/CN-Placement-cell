const {Admin, validate} = require('../models/admin');
const _ = require('lodash')
const Joi = require('joi');
const bcrypt = require('bcrypt')



module.exports.adminSignUp = async (req, res) => {
    
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   try {
    
        let admin = await Admin.findOne({ email: req.body.email });
        if(admin) return res.status(400).send('Already an admin');

        admin = new Admin(_.pick(req.body, ['name', 'email', 'password']));

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);

        await admin.save();

        return res.status(200).send(_.pick(admin, ['name', 'email']));
   } catch (error) {
       return res.status(500).send(error);
   }

}

module.exports.adminLogin = async (req, res) => {

    const { error } = validateLoginBody(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        let admin = await Admin.findOne({ email: req.body.email }).select('+password');
        if(!admin) return res.status(400).send('Invalid email or password');
       
        const validPassword = await bcrypt.compare(req.body.password, admin.password);
        if(!validPassword) return res.status(400).send('Invalid email or password');
       
        const token = admin.generateAuthToken();   
        res.status(200).send(token);

    } catch (error) {
        return res.status(500).send('Internal Server error');
    }

}

function validateLoginBody(body) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().required() 
    })

    return schema.validate(body);
}