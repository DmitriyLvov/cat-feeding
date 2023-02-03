import { useState } from 'react';

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
  selected: string;
}

interface ICatMealProps {
  feed: IFeed;
}
const CatMeal = ({ feed }: ICatMealProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isMouseHover, setIsMouseHover] = useState(false);
  const { type, volume, mices, weight, isOutOfStock, selected, isEnough } = feed;

  const getTemplateText = (qty: number, wordVariations: [string, string, string]) => {
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
    return `${getTemplateText(volume, ['порция', 'порции', 'порций'])}`;
  };

  const getMouseText = (volume: number) => {
    if (volume === 1) {
      return 'мышь в подарок';
    }
    return `${getTemplateText(volume, ['мышь', 'мыши', 'мышей'])} в подарок`;
  };

  const selectFood = () => {
    setIsSelected((prevState) => !prevState);
    // Принудительно отключаем фиксацию наведения мыши, чтобы эффекты сработали только после возвращения
    setIsMouseHover(false);
  };

  const onHoverEnterHandler = () => {
    setIsMouseHover(true);
  };
  const onHoverLeaveHandler = () => {
    setIsMouseHover(false);
  };

  return (
    <div className={styles.component}>
      <div
        className={
          isOutOfStock
            ? styles.border_outOfStock
            : isSelected
            ? styles.border_selected
            : styles.border_default
        }
        onMouseEnter={onHoverEnterHandler}
        onMouseLeave={onHoverLeaveHandler}
      >
        <div className={styles.main} onClick={selectFood}>
          <div className={styles.cardContent}>
            {isMouseHover && isSelected && !isOutOfStock ? (
              <p className={styles.headerDescription_hoverSelected}>Котэ не одобряет?</p>
            ) : (
              <p className={isOutOfStock ? styles.headerDescription_outOfStock : styles.headerDescription}>
                Сказочное заморское яство
              </p>
            )}
            <h2 className={isOutOfStock ? styles.header_outOfStock : styles.header}>Нямушка</h2>
            <p className={isOutOfStock ? styles.type_outOfStock : styles.type}>{type}</p>
            <div className={styles.descriptionField}>
              <p className={isOutOfStock ? styles.descriptionText_outOfStock : styles.descriptionText}>
                <span className={styles.descriptionNumber}>{volume}</span> {getPortionText(volume)}
              </p>
              <p className={isOutOfStock ? styles.descriptionText_outOfStock : styles.descriptionText}>
                {mices !== 1 && <span className={styles.descriptionNumber}>{`${mices} `}</span>}
                {getMouseText(mices)}
              </p>
              {isEnough && (
                <p className={isOutOfStock ? styles.descriptionText_outOfStock : styles.descriptionText}>
                  заказчик доволен
                </p>
              )}
            </div>
            <p
              className={
                isOutOfStock
                  ? styles.weight_outOfStock
                  : isSelected
                  ? styles.weight_selected
                  : styles.weight_default
              }
            >
              <span>{weight}</span>
              <span className={styles.weightMeasure}>кг</span>
            </p>
            <img className={isOutOfStock ? styles.cat_outOfStock : styles.cat} src={cat} alt="cat" />
          </div>
        </div>
      </div>
      {isOutOfStock ? (
        <p className={styles.buyHook_outOfStock}>{`Печалька, ${type} закончился.`}</p>
      ) : (
        <>
          {isSelected ? (
            <p className={styles.buyHook}>{selected}</p>
          ) : (
            <p className={styles.buyHook}>
              {`Чего сидишь? Порадуй котэ, `}
              <button type="button" className={styles.link} onClick={selectFood}>
                купи.
              </button>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CatMeal;
