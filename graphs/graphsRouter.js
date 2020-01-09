const express = require('express');
const router = express.Router();
const authMW = require('../auth/authMW');
const graphs = require('./graphsModel');
router.use(authMW);

const reqAuth = (req,res,next) => {
    if(req.method === 'POST' || req.method === 'PuT'){
        const {name,owner,theme,axis,layer,data} = req.body;
        name && owner && theme
        ? typeof name === 'string' && typeof owner === 'number' && typeof theme === 'number'
        ? axis && layer && data
        ? typeof axis === 'object' && typeof layer === 'object' && typeof data === 'object'
        ? axis.length === data.length && data.reduce((sum,i)=>sum+i.length,0) === axis.length * layer.length
        ? next()
        : res.status(400).json({message:'Data shape doesn\'t match axes and layers'}) 
        : res.status(400).json({message:'Axes, Layers, and Data should be arrays'})
        : res.status(400).json({message:'Graphs need axes, layers, and data'})
        : res.status(400).json({message:'Name, Owner, or Theme are of the wrong type'})
        : res.status(400).json({message:'Graphs need name, owner, and theme'});
    } else next();
}

const dataFormatter = data => {
    const graph = {
        id:data[0].GraphID,
        name:data[0].Graph,
        owner:data[0].Owner,
        theme:data[0].Theme,
        axis:[],
        layer:[],
        data:[]
    }
    let axisIndex = -1;
    data.forEach(d => {
        if(graph.axis.indexOf(d.Axis) === -1){
            graph.axis.push(d.Axis);
            graph.data.push([]);
            axisIndex++;
        }
        if(graph.layer.indexOf(d.Layer) === -1){
            graph.layer.push(d.Layer)
            
        }
        graph.data[axisIndex].push(d.Value);
    })
    return graph;
}

const axisIdCatcher = data => {
    const ids = []
    data.forEach(d => {
        if(ids.indexOf(d.AxisID) === -1) ids.push(d.AxisID);
    })
    return ids;

}

router.use(reqAuth);

router.get('/:id',(req,res)=>{
    graphs.getData(req.params.id)
        .then(data => {
            if(!data.length) {
                res.status(400).json({message:'No data for that id'});
            } else {
                const graph = dataFormatter(data);
                res.status(200).json(graph);
            }  
        })
        .catch(err => {
            res.status(500).json({...err,message:'Could not get graph'})
        })
        
})
router.post('/',(req,res)=>{
    const {name,owner,theme,axis,layer,data} = req.body;
    graphs.addG({name:name,owner:owner,theme:theme})
        .then(graphId => {
            graphs.addA(axis,graphId[0])
        .then(axisId => {
            graphs.addL(layer,graphId[0])
        .then(layerId => {
            graphs.addD(data,axisId[0],layerId[0])
        .then( () => {
            graphs.getData(graphId[0])
        .then(data => {
            const graph = dataFormatter(data);
            res.status(201).json(graph);
        })})})})})
        .catch(err => {
            res.status(500).json({...err,message:'There was an error creating the graph'})
        })

})
router.put('/:id',(req,res)=>{
    const {name,owner,theme,axis,layer,data} = req.body;
    graphs.getData(req.params.id)
        .then(gData => {
            const ids = axisIdCatcher(gData);
            graphs.remD(ids)
        .then( () => {
            graphs.remL(req.params.id)
        .then( () => {
            graphs.remA(req.params.id)
        .then( () => {
            graphs.updG({name:name,owner:owner,theme:theme},req.params.id)
        .then( () => {
            graphs.addA(axis,req.params.id)
        .then(axisId => {
            graphs.addL(layer,req.params.id)
        .then(layerId => {
            graphs.addD(data,axisId[0],layerId[0])
        .then( () => {
            graphs.getData(req.params.id)
        .then(data => {
            const graph = dataFormatter(data);
            res.status(201).json(graph)
        })})})})})})})})})
        .catch(err => {
            res.status(500).json({...err,message:'Could not update graph'})
        })
})
router.delete('/:id',(req,res)=>{
    graphs.getData(req.params.id)
        .then(data => {
            const graph = dataFormatter(data);
            const ids = axisIdCatcher(data);
            graphs.remD(ids)
        .then( () => {
            graphs.remL(graph.id)
        .then( () => {
            graphs.remA(graph.id)
        .then( () => {
            graphs.remG(graph.id)
        .then( () => {
            res.status(200).json({message:`Graph ${graph.id} removed.`})
        })})})})})
        .catch(err => {
            res.status(500).json({...err,message:'Could not remove graph'})
        })
})

module.exports = router;