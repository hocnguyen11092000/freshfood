import React, { useState } from "react";

type Props = {
  onSubmit?: (price: string) => void;
  value?: number | string;
};

const Price = (props: Props) => {
  const { onSubmit, value } = props;
  const [valueprice, setValuePrice] = useState<string>("50");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSubmit) {
      onSubmit(e.target.value);
      setValuePrice(e.target.value);
    }
  };

  return (
    <div className="price-range">
      <span>0</span>
      <input
        type="range"
        name="price"
        min="0"
        max="100"
        onChange={handlePriceChange}
        value={valueprice}
      />
      <span>100</span>
      <div style={{ fontSize: "0.9rem", marginTop: "10px" }}>
        price below equal
        <span style={{ color: "#16a34a" }}> {valueprice}.000đ</span>
      </div>
    </div>
  );
};

export default Price;
