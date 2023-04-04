export const NeoQueries = {
    addNode : 'CREATE (a:Review {id: $id})',
     
    addToUser : 'MATCH (a:Review),(b:User) \
                WHERE b.id = $userId AND a.id = $id \
                CREATE (b)-[:Created]->(a)',

    deleteNode :'MATCH (a:Review {id: $id}) \
                    DETACH DELETE a',

    addToProduct : 'MATCH \
                    (a:Review {id: $idB}), \
                    (b:Product {id: $idA}) \
                    CREATE (a)-[:Reviews]->(b)',

    findByProduct : 'MATCH (a:Review)-[r:Reviews]->(b:Product)\
                    WHERE b.id=$productId\
                    RETURN a.id AS match',

    findByUser : 'MATCH (a:User)-[r:Created]->(b:Review)\
                 WHERE a.id=$userId\
                    RETURN b.id AS match'
}