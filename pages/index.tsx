import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  
  return (
    <div>
      <Head>
        <title>Nada svake mame - Home</title>
        <meta name="description" content="Ovo je stranica udruge 'Nada svake mame' čija je svrha pomaganje potrebitima." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={"flex fixed justify-end top-0 left-0 h-20 w-screen bg-yellow-400"}>
        <div className="flex flex-row my-auto gap-10">
          <div>Početna</div>
          <div >Prijava</div>
        </div>
      </div>

      <div className={"bg-green-700 h-screen w-full flex"}>
        
      </div>
    </div>
  )
}

export default Home
