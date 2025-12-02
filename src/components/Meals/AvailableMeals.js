import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import mealsData from '../../data/meals.json';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const loadMeals = () => {
      try {
        const loadedMeals = [];

        for(const key in mealsData) {
          loadedMeals.push({
            id: key,
            name: mealsData[key].name,
            description: mealsData[key].description,
            price: mealsData[key].price,
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    loadMeals();
  }, []);

  if(isLoading){
    return( <section className={classes.MealsLoading}>
      <p>Loading...</p>
      </section>
      );
  }

  if(httpError){
    return (
      <section className={classes.MealsError}>
      <p>{httpError}</p>
      </section>
    )
  }



  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
