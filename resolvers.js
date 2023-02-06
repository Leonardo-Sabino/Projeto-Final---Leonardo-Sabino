const viagem = require("./models/viagem");

const ViagemResolvers = {
  Query: {
    allTrips: () => viagem.find(),
    trip: (_, { id }) => viagem.findById(id)
  },
  Mutation: {
    createTrip: (_, args) => viagem.create(args)
  }
};

module.exports = ViagemResolvers;
