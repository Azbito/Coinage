import { styles } from "@/styles/styles"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import axios from "axios"
import { useState } from "react"

export default function Convert() {
  const [coinValue, setCoinValue] = useState({
    ticker: {
      buy: ""
    }
  })

  const [coin, setCoin] = useState('');
  const handleCoinChange = (event: any) => {
    setCoin(event.target.value);
    console.log(coin)
  };
  async function Quotation() {
    if (coin === "USD") {
      try {
        const { data } = await axios.get("https://www.mercadobitcoin.net/api/USDC/ticker")
        setCoinValue(data)
        console.log(coinValue)
        return;
      } catch (error) {
        alert(error)
        return;
      }
    }
  }
  return (
    <div className={styles.containerConvert}>
      <div className={styles.welcome}>
        <h1 className={styles.title}>
          See the quotation today!
        </h1>
      </div>
      <div>
        <h1>{(Number(coinValue.ticker.buy)).toFixed(2)}</h1>
      </div>
      <div className={styles.radioDiv} >
        <RadioGroup aria-label="Money" name="gender" value={coin} onChange={handleCoinChange}>
          <FormControlLabel className={styles.radioDiv} value="USD" control={<Radio />} label="USD" />
          <FormControlLabel className={styles.radioDiv} value="EUR" control={<Radio />} label="EUR" />
        </RadioGroup>
      </div>
      <button className={styles.button} onClick={Quotation}>Convert</button>
    </div>
  )
}