const Trip = require("../models/Trip");

const tripResolvers = {
  Query: {
    allTrips: () => Trip.find(),
    trip: (_, { id }) => Trip.findById(id)
  },
  Mutation: {
    createTrip: (_, args) => Trip.create(args)
  }
};

module.exports = tripResolvers;
