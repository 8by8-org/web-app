import { useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/contexts/UserContext";
import styles from '@/styles/modules/components/header/greeting/greeting.module.scss';

export default function Greeting() {
  const {activeUser} = useContext(UserContext);

  return activeUser ? (
    <div className={styles.avatar_greeting}>
        <div className={styles.blob}>
          {activeUser.avatar ? (
              <Image
                  alt="player avatar"
                  className="avatar"
                  src={
                      require(`../../../../public/assets/3-avatars/avatar-${activeUser.avatar}.svg`)
                          .default
                  }
              />
          ) : (
              <Image
                  alt="player avatar"
                  className={styles.avatar}
                  src={require(`../../../../public/assets/3-avatars/avatar-1.svg`).default}
              />
          )}
        </div>
        <h2 className="text">HI {activeUser.name}!</h2>
    </div>
  ) : ( 
    <h2 className={styles.standalone_greeting}>HI THERE!</h2>
  );
}