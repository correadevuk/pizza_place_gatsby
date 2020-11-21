import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // 1 - Array with pizzas object
  // 2 - Array of arrays of toppings and flat to one array of toppings
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // if it is, increment by 1
        existingTopping.count += 1;
      } else {
        // otherwise create a new entry in our acc and set it to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }

      return acc;
    }, {});
  // sort them based on their count
  const sortedToppinfs = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  // Return the pizzas with counts
  return sortedToppinfs;
}

export default function ToppingsFilter() {
  // 1 - Get a list of all toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
          }
        }
      }
    }
  `);
  //   console.clear();
  //   console.log({ toppings, pizzas });
  // 2 - Get a list of all the Pizzas with their toppings
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  //   console.log(toppingsWithCounts);
  // 3 - Count how many pizzas are in each topping
  // 4 - Loop over the list of toppings and display the topping and the count of pizzas in that topping
  return (
    <ToppingsStyles>
      {toppingsWithCounts.map((topping) => (
        <Link id={topping.id} to={`/topping/${topping.name}`}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
