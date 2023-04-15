import { Grow } from '@mui/material'
import Image from 'next/image'
import Crisis from '../../public/images/crisis.gif'

import { useRouter } from 'next/router'

export const styles = {
  container: 'flex items-center justify-center flex-col',
  containerConvert: 'flex items-center justify-center flex-col mt-[10rem]',
  content: 'flex items-center text-center justify-center flex-col mt-[2rem]',
  welcome:
    'bg-emerald-700 p-5 rounded-lg flex items-center justify-center flex-col shadow-2xl mt-[2rem]',
  webTitle: 'text-emerald-500 font-bold text-4xl mt-[10rem]',
  title: 'text-white text-2xl font-bold',
  description: 'text-white italic text-center',
  animation: 'w-[20rem] mr-[60rem] absolute',
  button:
    'bg-lime-600 p-3 text-white rounded-lg hover:bg-lime-500 duration-300 active:bg-lime-700 mt-[2rem]',
  selectDiv: 'mt-[2rem] z-10',
  coinValue: 'bg-indigo-500 mt-[2rem] p-2 rounded-sm text-white',
  animationConvertor: "w-[20rem] ml-[60rem] absolute"
}


export default function Home() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <h1 className={styles.webTitle}>Coinage</h1>
      <div className={styles.content}>
        <Grow in>
          <div className={styles.welcome}>
            <h1 className={styles.title}>Welcome!</h1>
            <p className={styles.description}>Here you can easily see the quotation of the world.</p>
          </div>
        </Grow>
        <button className={styles.button} onClick={() => router.push('/convert')}>Convert</button>
        <Image className={styles.animation} src={Crisis} alt="Crisis" />
      </div>
    </div>
  )
}
