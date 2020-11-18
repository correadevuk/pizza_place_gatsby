import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data: { pizzas } }) {
  // console.log(props.data.pizzas);
  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={pizzas.nodes} />
    </>
  );
}

export const query = graphql`
  query MyQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        price
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
