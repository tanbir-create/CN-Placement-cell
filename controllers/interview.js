const Interview = require('../models/interview');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.allocateInterview = async(req, res) => {

    if(!ObjectId.isValid(req.params.id)) return res.status(404).json('No company found');
    if(!ObjectId.isValid(req.body.id)) return res.status(404).json('No Student found');
    
    try {
        let interview = new Interview({
            company: req.params.id,
            student: req.body.id
        })

        await interview.save();

        return res.status(401).json({
            message: 'Allocated Interview to student'
        })
    } catch (error) {  
        return res.status(500).json('Internal Server error')
    }

}

module.exports.setresultStatus = async (req, res) => {

    if(!ObjectId.isValid(req.params.id)) return res.status(404).json('No Student found');
    if(!ObjectId.isValid(req.body.id)) return res.status(404).json('No Company found');

    try {
        let interview = await Interview.findOne({company: req.body.id, student: req.params.id},)
        if(!interview) return res.status(404).json({message: 'No interview found!'})

        interview.status = req.body.status;

        await interview.save()
        return res.status(204).json({
                    message: 'Status updated',
                    interview
        })

    } catch (error) {
        return res.status(500).json(error.message);
    }
}