import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grow, InputLabel, List, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material"

import axios from "axios"
import { useEffect, useState } from "react"
import { styles } from "..";
import world from '../../../public/images/world.gif'
import Image from "next/image";

export default function Convert() {
  const [coinValue, setCoinValue] = useState(null);
  const [coinQuotationValue, setCoinQuotationValue] = useState(null);
  const [convertCoin, setConvertCoin] = useState('');
  const [convertQuotationCoin, setConvertQuotationCoin] = useState('');
  const [convertableCoin, setConvertableCoin] = useState(0);

  const handleCoinChange = (event: any) => {
    setConvertQuotationCoin(event.target.value);
  };
  const [allCoins, setAllCoins] = useState(null);
  const [result, setResult] = useState<number | null>(null)


  async function Quotation() {
    try {
      const { data } = await axios.get(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL`)
      setAllCoins(data)
    } catch (error) {
      alert("It couldn't find any coin. Please, try it again.")
    }
  }

  useEffect(() => {
    Quotation()
  }, [])

  useEffect(() => {
    if (allCoins != null) {
      const selectedCoin: any = Object.entries(allCoins).find((item: any) => item[0] == convertCoin)
      setCoinValue(selectedCoin[1].ask)
    }
  }, [convertCoin])

  useEffect(() => {
    if (allCoins != null) {
      const selectedCoinQuotation: any = Object.entries(allCoins).find((item: any) => item[0] == convertQuotationCoin)
      setCoinQuotationValue(selectedCoinQuotation[1].ask)
    }

  }, [convertQuotationCoin])

  function Convert() {
    const calc: number = convertableCoin * Number(coinValue)
    setResult(calc)
  }

  return (
    <div className="mb-32">
      <div className={styles.containerConvert}>
        <div className={styles.welcome}>
          <h1 className={styles.title}>
            See the quotation today!
          </h1>
        </div>
        <div>
          <h1 className={styles.coinValue}>{(Number(coinQuotationValue)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h1>
        </div>
        <div className={styles.selectDiv}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Coin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={convertQuotationCoin}
              label="Coin"
              onChange={handleCoinChange}
              className="w-32"
            >
              <MenuItem value="USDBRL">USD</MenuItem>
              <MenuItem value="EURBRL">EUR</MenuItem>
              <MenuItem value="BTCBRL">BTC</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Image className={styles.animationConvertor} src={world} alt="World" />
        <div className={styles.welcome}>
          <h1 className={styles.title}>
            Convert
          </h1>
        </div>
        <div className="mt-[2rem] flex flex-col items-center justify-center">
          <TextField inputProps={{ inputMode: 'numeric' }} id="outlined-basic" label="Type here the value" variant="outlined" value={convertableCoin} onChange={(e: any) => setConvertableCoin(e.target.value)} />
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="USD"
              name="radio-buttons-group"
              value={convertCoin}
              onChange={(e) => setConvertCoin(e.target.value)}
            >
              <FormControlLabel value="USDBRL" control={<Radio />} label="USD" />
              <FormControlLabel value="EURBRL" control={<Radio />} label="EUR" />
              <FormControlLabel value="BTCBRL" control={<Radio />} label="BTC" />
            </RadioGroup>
          </FormControl>
          {result && result > 0 ?
            <Grow in>
              <h1 className="bg-lime-800 p-1 rounded-sm text-white mt-5">{result?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h1>
            </Grow>
            :
            <></>
          }
          <button className={styles.button} onClick={Convert}>Get Quotation</button>
        </div>
      </div>
    </div>
  )
}