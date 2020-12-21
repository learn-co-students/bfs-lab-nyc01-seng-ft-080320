const edges = [
	['14th&6th', '23rd&6th'],
	['23rd&6th', '34th&6th'],
	['34th&6th', '28th&Bwy'],
	['28th&Bwy', '23rd&Bwy'],
	['23rd&Bwy', '14th&Lex'],
	['14th&Lex', '23rd&Lex']
]

const vertices = [
    {name: '34th&6th', distance: null, predecessor: null},
    {name: '23rd&6th', distance: null, predecessor: null},
    {name: '28th&Bwy', distance: null, predecessor: null},
    {name: '14th&6th', distance: null, predecessor: null},
    {name: '23rd&Bwy', distance: null, predecessor: null},
    {name: '14th&Lex', distance: null, predecessor: null},
    {name: '23rd&Lex', distance: null, predecessor: null}
]

function findNode(nodeName, vertices) {
    return vertices.find((vertex) => {
        return vertex.name === nodeName
    })
}

function findAdjacent(nodeName, vertices, edges) {
    let foundEdges = edges.filter(edge => edge.includes(nodeName))
    let foundVerticesNames = foundEdges.map(edge => edge.filter(node => node !== nodeName)[0])
    let foundVerticesObjects = foundVerticesNames.map(name => findNode(name, vertices))
    return foundVerticesObjects.filter(vertices => vertices.distance === null )
}


function markDistanceAndPredecessor(predecessor, adjacentNodes) {
    adjacentNodes.map(node => { node.distance = predecessor.distance + 1; node.predecessor = predecessor })
}

function bfs(rootNode, vertices, edges) {
    rootNode.distance = 0
    let discovered = [rootNode]
    let order = [rootNode]

    while (discovered.length != 0) {
        let currentNode = discovered.shift()
        let adjacentNodes = findAdjacent(currentNode.name, vertices, edges)
        markDistanceAndPredecessor(currentNode, adjacentNodes)
        order = order.concat(adjacentNodes)
        discovered = discovered.concat(adjacentNodes)
    }
    return order

}


bfs(vertices[0], vertices, edges)