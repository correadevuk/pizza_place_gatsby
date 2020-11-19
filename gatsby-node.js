import path from 'path';
// import PizzasPage from './src/pages/pizzas';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1 - Get a template for this page
  const pizzaTemplate = path.resolve(`./src/templates/Pizza.js`);
  // 2 - Query all Pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  console.log(data);
  // 3 - Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    // console.log('creating a pizza : ', pizza.name);
    actions.createPage({
      // What is the URL for this new page?
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      // Pass data to Template
      context: {
        // correa: 'any param',
        slug: pizza.slug.current,
      },
    });
  });
}

export async function createPages(params) {
  //   console.log('Between building schema and create pages on log');
  // 1 - Pizzas
  await turnPizzasIntoPages(params);
  // 2 - Toppings
  // 3 - Slicemasters
}
