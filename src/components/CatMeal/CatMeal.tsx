import { useEffect, useState } from 'react';

import styles from './CatMeal.module.scss';
import cat from './Photo.png';

export interface IFeed {
  type: string;
  volume: number;
  mices: number;
  weight: string;
  isEnough: boolean;
  isOutOfStock: boolean;
  id: string;
}

interface ICatProps {
  feed: IFeed;
}

const CatMeal = ({ feed }: ICatProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [selectTrigger, setSelectTrigger] = useState(false);
  const { type, volume, mices, weight, isOutOfStock } = feed;

  useEffect(() => {
    // Карточка выбрана и курсор уходит за пределы
    if (selectTrigger && !isMouseHover) {
      setIsSelected(true);
    }
    // Отмена выбора карточки
    if (isSelected && !selectTrigger) {
      setIsSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseHover, selectTrigger]);

  const getTemplateText = (
    qty: number,
    wordVariations: [string, string, string]
  ) => {
    if (qty === 1) {
      return wordVariations[0];
    }
    if (qty < 5) {
      return wordVariations[1];
    }
    if (qty < 20) {
      return wordVariations[2];
    }
    const qtyText = qty.toString();
    const prevNum = Number.parseInt(qtyText.at(-2)!);
    const lastnum = Number.parseInt(qtyText.at(-1)!);

    if (prevNum === 1 || lastnum > 6 || lastnum === 0) {
      return wordVariations[2];
    }
    if (lastnum === 1) {
      return wordVariations[0];
    }
    if (lastnum < 5) {
      return wordVariations[1];
    }
  };

  const getPortionText = (volume: number) => {
    return `${volume} ${getTemplateText(volume, [
      'порция',
      'порции',
      'порций',
    ])}`;
  };

  const getMouseText = (volume: number) => {
    if (volume === 1) {
      return 'мышь в подарок';
    }
    return `${volume} ${getTemplateText(volume, [
      'мышь',
      'мыши',
      'мышей',
    ])} в подарок`;
  };

  const selectFood = () => {
    setSelectTrigger((prevState) => !prevState);
  };

  const onHoverHandler = () => {
    setIsMouseHover((prevState) => !prevState);
  };

  return (
    <div className={styles.component}>
      <div
        className={`${styles.border} ${isSelected && styles.border_selected} ${
          isOutOfStock && styles.border_outOfStock
        }`}
        onMouseEnter={onHoverHandler}
        onMouseLeave={onHoverHandler}
      >
        <div className={styles.main} onClick={selectFood}>
          <div className={styles.textField}>
            <></>
            <p className={styles.headerDescription}>
              Сказочное заморское яство
            </p>
            <h2 className={styles.header}>Нямушка</h2>
            <p className={styles.type}>{type}</p>
            <p className={styles.volume}>{getPortionText(volume)}</p>
            <p className={styles.mices}>{getMouseText(mices)}</p>
            <p
              className={`${styles.weight} ${
                isSelected && styles.weight_selected
              } ${isOutOfStock && styles.weight_outOfStock}`}
            >
              <span>{weight}</span>
              <span className={styles.weightMeasure}>кг</span>
            </p>
            <img
              className={`${styles.cat} ${
                isOutOfStock && styles.cat_outOfStock
              }`}
              src={cat}
              alt='cat'
            />
          </div>
        </div>
      </div>
      {isOutOfStock ? (
        <p
          className={`${styles.buyHook} ${styles.buyHook_outOfStock}`}
        >{`Печалька, ${type} закончился.`}</p>
      ) : (
        <p className={styles.buyHook}>
          Чего сидишь? Порадуй котэ,
          <button type='button' className={styles.link} onClick={selectFood}>
            купи.
          </button>
        </p>
      )}
    </div>
  );
};

export default CatMeal;
