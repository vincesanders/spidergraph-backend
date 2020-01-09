const db = require('../data/dbConfig');

const getData = id => {
    return db.select(
        'd.value as Value',
        'a.name as Axis',
        'l.name as Layer',
        'g.id as GraphID',
        'g.name as Graph',
        'g.theme as Theme',
        'g.scale as Scale'
    ).from('data as d')
        .join('layers as l','d.layerId','l.id')
        .join('axes as a','d.axisId','a.id')
        .join('graphs as g','a.graphId','g.id')
        .where('g.id',id);
}

const addG = graph => {
    const {name,owner,theme,scale} = graph;
    return db('graphs').insert({name:name,owner:owner,theme:theme,scale:scale})
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
    const aStart = axisId-data.length;   
    data.forEach((axis,ai) => {
        const lStart = layerId-axis.length;
        axis.forEach((val,li) => {
            dataSet.push({value:val,axisId:aStart-ai,layerId:lStart-li})
        })
    });
    return db('data').insert(dataSet);
}
const overwrite = () => {
    //trunc & replace data
}
const remove = () => {
    //val,layer,graph
}
module.exports = {getData,addG,addA,addL,addD,overwrite,remove}