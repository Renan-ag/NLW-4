import Head from 'next/head';
import { GetServerSideProps } from 'next'

import { ChallengeBox } from '../Components/ChallengeBox';
import { CompletedChallenges } from '../Components/CompletedChallenges';
import { Countdown } from '../Components/Countdown';
import { ExperiencerBar } from "../Components/ExperienceBar";
import { Profile } from '../Components/Profile';
import { CountdownProvider } from '../Contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../Contexts/ChallengeContext';

interface HomeProps{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  username: String;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
        level={props.level} 
        currentExperience={props.currentExperience} 
        challengesCompleted={props.challengesCompleted}
      >      
      <div className={styles.container}>
        <Head>
          <title>Início | Move.it</title>
        </Head>

        <ExperiencerBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile username={props.username} />
              <CompletedChallenges />
              <Countdown/>
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
 
  const { level, currentExperience, challengesCompleted, username } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      username: String(username),
    }
  }
}