const db = require('../data/dbConfig');

const getData = id => {
    return db.select(
        'd.value as Value',
        'a.name as Axis',
        'a.index as AxisPos',
        'a.id as AxisID',
        'l.name as Layer',
        'l.index as LayerPos',
        'g.id as GraphID',
        'g.name as Graph',
        'g.owner as Owner',
        'g.theme as Theme',
        'g.notes as Notes'
    ).from('data as d')
        .join('layers as l','d.layerId','l.id')
        .join('axes as a','d.axisId','a.id')
        .join('graphs as g','a.graphId','g.id')
        .where('g.id',id)
        .orderBy(['a.index','l.index']);
}

const addG = graph => {
    return db('graphs').insert(graph)
}
const addA = (axis,graphId) => {
    const axes = axis.map((a,i)=>{
        return {name:a,graphId:graphId,index:i};
    });
    return db('axes').insert(axes);
}
const addL = (layer,graphId) => {
    const layers = layer.map((l,i)=>{
        return {name:l,graphId:graphId,index:i};
    });
    return db('layers').insert(layers);
}
const addD = (data,axisId,layerId) => {
    const dataSet = [];
    const aStart = axisId-(data.length-1);
    data.forEach((axis,ai) => {
        const lStart = layerId-(axis.length-1);
        axis.forEach((val,li) => {
            dataSet.push({value:val,axisId:aStart+ai,layerId:lStart+li})
        })
    });
    return db('data').insert(dataSet);
}
const updG = (newGraph,graphId) => {
    return db('graphs').where('id',graphId)
        .update(newGraph);
}
const remG = graphId => {
    return db('graphs').where('id',graphId).del()
}
const remA = graphId => {
    return db('axes').where('graphId',graphId).del()
}
const remL = graphId => {
    return db('layers').where('graphId',graphId).del()
}
const remD = axisIds => {
    return db('data').whereIn('axisId',axisIds).del()
}



module.exports = {
    getData,
    addG,addA,addL,addD,
    updG,
    remG,remA,remL,remD
}