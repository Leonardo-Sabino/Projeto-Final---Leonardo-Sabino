
const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLID, 
  GraphQLSchema, 
  GraphQLList, 
  GraphQLNonNull, 
  GraphQLEnumType,
  GraphQLFloat} = require('graphql');

const viagem = require('./models/viagem');
const passageiro = require('./models/passageiro');
const navio = require ('./models/navio');
const passageiro_viagem = require ('./models/passageiro_viagem');

//tipo viagem
const TipoViagem = new GraphQLObjectType ({
  name: "viagem",
 
  fields: () => ( {
      id_viagem: {type:GraphQLID},     
      porto_partida: {type:GraphQLString},
      porto_chegada: {type:GraphQLString},
      Data_inicio: {type:GraphQLInt},
      Data_fim: {type:GraphQLInt},
      ibm_navio: 
      {type: TipoNavio,
        resolve(parent, args){
          return viagem.findById(parent.ibm)
        }
      }
  }   
  ),
});

//tipo navio
const TipoNavio = new GraphQLObjectType ({
  name: "navio",
 
  fields: () => ( {
      ibm: {type:GraphQLID},
      nome: {type:GraphQLString},    
      max_passageiro: {type:GraphQLInt},
      max_carga: {type:GraphQLInt}
  }   
  ),
});

//tipo passageiro
const TipoPassageiro = new GraphQLObjectType ({
  name: "passageiro",
 
  fields: () => ( {
      bi_passageiro:  {type:GraphQLID},
      nome: {type:GraphQLString}, 
      idade: {type:GraphQLInt},  
  }   
  ),
});

//tipo passageiro-viagem
const TipoPassageiroViagem = new GraphQLObjectType ({
  name: "passageiro",
 
  fields: () => ( {
      id: {type:GraphQLID},
      BI_passageiro:  {type:GraphQLID},
      id_viagem: {type:GraphQLID},
  }   
  ),
});

