import CatMeal, { IFeed } from '../../components/CatMeal/CatMeal';
import styles from './Cats.module.scss';

const data: IFeed[] = [
  {
    type: 'c фуа-гра',
    volume: 10,
    mices: 1,
    isEnough: false,
    id: 'fua-gra',
    weight: '0,5',
    isOutOfStock: false,
    selected: 'Печень утки разварная с артишоками.',
  },
  {
    type: 'c рыбой',
    volume: 40,
    mices: 2,
    isEnough: false,
    id: 'fish',
    weight: '2',
    isOutOfStock: false,
    selected: 'Головы щучьи с чесноком да свежайшая сёмгушка.',
  },
  {
    type: 'c курой',
    volume: 100,
    mices: 5,
    isEnough: true,
    id: 'chicken',
    weight: '5',
    isOutOfStock: false,
    selected: 'Филе из цыплят с трюфелями в бульоне.',
  },
];

const CatFeeder = () => {
  return (
    <div className={styles.component}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Ты сегодня покормил кота?</h2>
        <div className={styles.body}>
          {data.map((feed) => (
            <CatMeal feed={feed} key={feed.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatFeeder;
