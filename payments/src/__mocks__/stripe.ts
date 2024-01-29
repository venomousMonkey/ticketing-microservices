// export const stripe = {
//   charges: {
//     create: jest.fn().mockResolvedValue({}),
//   },
// };

export const stripe = {
  charges: {
    // Mocking the create method of the charges object
    create: jest.fn().mockImplementation((params) => {
      // Assuming params contains orderId and other necessary data
      // Generate a mock stripeId (for example, using a UUID generator)
      const id = 1234;

      // Return an object with the provided params and the generated stripeId
      return Promise.resolve({
        ...params,
        id,
      });
    }),
  },
};
