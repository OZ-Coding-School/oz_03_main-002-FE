import React from 'react';
import { Refrigerator } from '../store/fridgeStore';
import Slider from './Slider';
import './Slider.css';

type FridgeItemProps = {
  item: Refrigerator;
};

const FridgeItem: React.FC<FridgeItemProps> = ({ item }) => {
  return (
    <div className="fridge-item">
      <h3>{item.fridges_name}</h3>
      <Slider ingredients={item.ingre_list} />
      <button type="button">재료 추가</button>
    </div>
  );
};

export default FridgeItem;
