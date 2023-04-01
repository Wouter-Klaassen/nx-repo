export const NeoQueries = {
    addNode : 'CREATE (a:Review {id: $id})',
     
    addToUser : 'MATCH (a:Review),(b:User) \
                WHERE b.id = $userId AND a.id = $id \
                CREATE (a)-[:Created]->(b)',

    deleteNode :'MATCH (a:Review {id: $id}) \
                    DETACH DELETE a',

    addToProduct : 'MATCH \
                    (a:Review {id: $idB}), \
                    (b:Product {id: $idA}) \
                    CREATE (a)-[:Reviews]->(b)',
}