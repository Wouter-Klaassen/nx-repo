export const NeoQueries = {
    relateProducts: 'MATCH (a:Product), (b:Product) WHERE a.id = $idA AND b.id = $idB CREATE (a)-[:Related]->(b)',

    removeRelation: 'MATCH (a:Product {id: $idA})-[r:Related]-(b:Product {id: $idB}) \
                     DELETE r',

    getRelatedProducts: 'MATCH (a:Product {id: $id})-[:Related]-(r) \
                        RETURN r',

    createNode: 'CREATE (a:Product {id: $id})',

    deleteNode: 'MATCH (a:Product {id: $id}) \
    DETACH DELETE a',
}