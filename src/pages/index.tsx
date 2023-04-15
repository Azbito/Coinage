import { Grow } from '@mui/material'
import Image from 'next/image'
import Investment from '../../public/images/investment.gif'

import { useRouter } from 'next/router'
import { styles } from '@/styles/styles'

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
        <Image className={styles.animation} src={Investment} alt="Investment" />
      </div>
    </div>
  )
}
