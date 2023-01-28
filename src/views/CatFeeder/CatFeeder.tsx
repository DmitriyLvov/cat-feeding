import Cat, { IFeed } from '../../components/CatMeal/CatMeal';
import styles from './Cats.module.scss';

const CatFeeder = () => {
  const data: IFeed[] = [
    {
      type: 'c фуа-гра',
      volume: 10,
      mices: 1,
      isEnough: false,
      id: 'fua-gra',
      weight: '0,5',
      isOutOfStock: false,
    },
    {
      type: 'c рыбой',
      volume: 40,
      mices: 2,
      isEnough: false,
      id: 'fish',
      weight: '2',
      isOutOfStock: false,
    },
    {
      type: 'c курой',
      volume: 100,
      mices: 5,
      isEnough: true,
      id: 'chicken',
      weight: '5',
      isOutOfStock: true,
    },
  ];
  return (
    <div className={styles.root}>
      <h2 className={styles.header}>Ты сегодня покормил кота?</h2>
      <div className={styles.body}>
        {data.map((feed) => (
          <Cat feed={feed} key={feed.id} />
        ))}
      </div>
    </div>
  );
};

export default CatFeeder;
