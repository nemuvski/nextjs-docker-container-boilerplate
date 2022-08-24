import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='format-detection' content='telephone=no, email=no, address=no' />
        <meta name='description' content='Next App' />
        <title>Next App</title>
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      </Head>

      <div>It works!</div>
    </>
  )
}

export default Home
