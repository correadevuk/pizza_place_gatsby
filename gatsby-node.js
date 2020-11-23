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
  //   console.log(data);
  // 3 - Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      // context : pass slug to template to query specific pizza
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1 - Get the template
  const toppingTemplate = path.resolve(`./src/pages/pizzas.js`);
  // 2 - query all the Toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3 - createPage for that topping
  data.toppings.nodes.forEach((topping) => {
    // console.log('Creating page for topping', topping.name);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO: Regex for topping
        // toppingRegex: `/${topping.name}/i`
      },
    });
  });
  // 4 - pass topping data to pizza.js
}

export async function createPages(params) {
  //   console.log('Between building schema and create pages on log');
  // This two itens are not related JS will not wait for first a wait func and wont
  // wait for turnPizzasIntoPages. They need to be wrapped into Promise.all
  // 1 - Wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);

  // 2 - Toppings
  // 3 - Slicemasters
}
