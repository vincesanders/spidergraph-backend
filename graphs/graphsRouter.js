const express = require('express');
const router = express.Router();
const authMW = require('../auth/authMW');
const graphs = require('./graphsModel');
router.use(authMW);


router.get('/:id',(req,res)=>{
    graphs.getData(req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({...err,message:'Could not get graph'})
        })
        
})
router.post('/',(req,res)=>{
    const {name,owner,theme,scale,axis,layer,data} = req.body;
    graphs.addG({name:name,owner:owner,theme:theme,scale:scale})
        .then(graphId => {
            graphs.addA(axis,graphId[0])
                .then(axisId => {
                    graphs.addL(layer,graphId[0])
                        .then(layerId => {
                            graphs.addD(data,axisId[0],layerId[0])
                                .then(dataSet => {
                                    res.status(201).json({graphId,axisId,layerId,dataSet});
                                })
                                .catch(err => {
                                    res.status(500).json({...err,message:'There was an error creating the graph'})
                                })
                        })
                })
        })

})
router.put('/:id',(req,res)=>{
    
})
router.delete('/:id',(req,res)=>{
    
})

module.exports = router;