import {
  GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
  GraphQLEnumType,
  GraphQLFloat} from 'graphql'

  import { Navio } from './models/navio.js'
  import { Viagem } from './models/viagem.js'
  import { Passageiro } from './models/passageiro.js'
  import { Passageiro_viagem } from './models/passageiro_viagem.js'

//tipo viagem
const TipoViagem = new GraphQLObjectType ({
  name: "viagem",
 
  fields: () => ( {
      id: {type:GraphQLID},     
      porto_partida: {type:GraphQLString},
      porto_chegada: {type:GraphQLString},
      data_inicio: {type:GraphQLInt},
      data_fim: {type:GraphQLInt},
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
      max_carga: {type:GraphQLInt},
      id_viagem:  {
        type: TipoViagem,
        resolve(parent, args) {
            return Viagem.findById(parent.id_viagem)
        }
      }
  }   
  )
});

//tipo passageiro
const TipoPassageiro = new GraphQLObjectType ({
  name: "passageiro",
 
  fields: () => ( {
      bi:  {type:GraphQLID}  
  }   
  ),
});

//tipo passageiro-viagem
const TipoPassageiroViagem = new GraphQLObjectType ({
  name: "passageiro_viagem",
 
  fields: () => ( {
      id: {type:GraphQLID},
      bi_passageiro: {
        type: TipoPassageiro,
        resolve(parent,args) {
          return Passageiro.findById(parent.passageiro)
        }
      },
      id_viagem: {
        type: TipoViagem,
        resolve(parent, args) {
            return Viagem.findById(parent.viagem)
        }
    }
  }   
  )
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
      navios: {
          type: new GraphQLList(TipoNavio),
          async resolve(parent, args) {
              return await Navio.find();
          },
      },

      navio: {
          type: TipoNavio,
          args: { id: { type: GraphQLID } },
          async resolve(parent, args) {
              return await Navio.findById(args.ibm)
          },
      },
      viagens: {
          type: new GraphQLList(TipoViagem),
          async resolve(parent, args) {
              return await Viagem.find();
          },
      },

      viagem: {
          type: TipoViagem,
          args: { id: { type: GraphQLID } },
          async resolve(parent, args) {
              return await Viagem.findById(args.id)
          },
      },

      passageiros: {
          type: new GraphQLList(TipoPassageiro),
          async resolve(parent, args) {
              return await Passageiro.find();
          },
      },

      passageiro: {
          type: TipoPassageiro,
          args: { id: { type: GraphQLID } },
          async resolve(parent, args) {
              return await Passageiro.findById(args.bi);
          },
      },
      passageiro_viagens: {
        type: new GraphQLList(TipoPassageiroViagem),
        async resolve(parent, args) {
            return await Passageiro_viagem.find();
        },
    },

    passageiro_viagem: {
        type: TipoPassageiroViagem,
        args: { id: { type: GraphQLID } },
        async resolve(parent, args) {
            return await Passageiro_viagem.findById(args.id);
        },
    },
}
});

//mutations

const TypeMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      addNavio: {
          type: TipoNavio,
          args: {
              ibm: { type: new GraphQLNonNull(GraphQLInt) },
              id_viagem: {
                  type: GraphQLInt
              },
              max_passageiros: { type: GraphQLInt },
              max_carga: { type: GraphQLInt }
          },
          resolve(parent, args) {
              const newNavio= new Navio({
                  ibm: args.ibm,
                  id_viagem: args.id_viagem,
                  max_passageiros: args.max_passageiros,
                  max_carga: args.max_carga
              })
              return newNavio.save()
          },
      },

      updateNavio: {
          type: TipoNavio,
          args: {
              ibm: { type: new GraphQLNonNull(GraphQLInt) },
              id_viagem: { type: GraphQLInt },
              max_passageiros: { type: GraphQLInt },
              max_carga: { type: GraphQLInt }

          },
          async resolve(parent, args) {

              const updateNavio = await Navio.findByIdAndUpdate(
                  args.ibm
                  ,
                  {
                      id_viagem: args.id_viagem,
                      max_passageiros: args.max_passageiros,
                      max_carga: args.max_carga
                  },
                  { new: true },
              )

              return updateNavio
          },
      },
      addViagem: {
          type: TipoViagem,
          args: {
              id: { type: new GraphQLNonNull(GraphQLInt) },
              porto_partida: { type: GraphQLString },
              porto_chegada: { type: GraphQLString },
              data_inicio: { type: GraphQLInt },
              data_fim: { type: GraphQLInt }
          },
          resolve(parent, args) {
              const newViagem = new Viagem({
                  id: args.id,
                  porto_chegada: args.porto_chegada,
                  porto_partida: args.porto_partida,
                  data_inicio: data_inicio,
                  data_fim: data_fim
              })
              return newViagem.save()
          },
      },

      updateViagem: {
          type: TipoViagem,
          args: {
              id: { type: new GraphQLNonNull(GraphQLInt) },
              porto_partida: { type: GraphQLString },
              porto_chegada: { type: GraphQLString },
              data_inicio: { type: GraphQLInt },
              data_fim: { type: GraphQLInt }
          },
          async resolve(parent, args) {

              const updateViagem = await Viagem.findByIdAndUpdate(
                  args.id
                  ,
                  {
                      porto_partida: args.porto_partida,
                      porto_chegada: args.porto_chegada,
                      data_inicio: args.data_inicio,
                      data_fim: args.data_fim
                  },
                  { new: true },
              )

              return updateViagem
          },
      },

      addPassageiro: {
          type: TipoPassageiro,
          args: {
              bi: { type: new GraphQLNonNull(GraphQLInt) },
          },
          resolve(parent, args) {
              const addPassageiro = new Passageiro({
                  bi: args.bi,
              })
              return addPassageiro.save()
          },
      },

      updatePassageiro: {
          type: TipoPassageiro,
          args: {
              bi: { type: new GraphQLNonNull(GraphQLInt) },
          },
          async resolve(parent, args) {

              const updatePassageiro = await Passageiro.findByIdAndUpdate(
                  args.bi,

                  { new: true },
              )

              return updatePassageiro
          },
      },
    
      addPassageiroViagem: {
          type: TipoPassageiroViagem,
          args: {
              id: { type: new GraphQLNonNull(GraphQLInt) },
              bi_passageiro: { type: GraphQLInt },
              id_viagem: { type: GraphQLInt }
          },
          resolve(parent, args) {
              const addPassageiroViagem = new Passageiro_viagem({
                  id: args.id,
                  bi_passageiro: args.bi_passageiro,
                  id_viagem: args.id_viagem
              })
              return addPassageiroViagem.save()
          },
      },

      updatePassageiroLinha: {
          type: TipoPassageiroViagem,
          args: {
              id: { type: new GraphQLNonNull(GraphQLInt) },
              bi_passageiro: { type: GraphQLInt },
              id_viagem: { type: GraphQLInt }
          },
          async resolve(parent, args) {

              const updatePassageiroViagem = await Passageiro_viagem.findByIdAndUpdate(
                  args.id,
                  {
                      bi_passageiro: args.bi_passageiro,
                      bi_linha: args.bi_linha
                  },
                  { new: true },
              )

              return updatePassageiroViagem
          },
      },
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: TypeMutation,
})
