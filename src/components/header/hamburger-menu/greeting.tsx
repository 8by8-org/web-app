import { useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/contexts/user-context";
import styles from '@/styles/modules/components/header/hamburger-menu/greeting.module.scss';

export default function Greeting() {
  const {activeUser} = useContext(UserContext);

  return activeUser ? (
    <div className={styles.avatar_greeting}>
        <div className={styles.blob}>
          {activeUser.avatar ? (
              <Image
                  alt="user avatar"
                  className={styles.avatar}
                  src={`/assets/3-avatars/avatar-${activeUser.avatar}.svg`}
                  width={40}
                  height={40}
              />
          ) : (
              <Image
                  alt="user avatar"
                  className={styles.avatar}
                  src={`/assets/3-avatars/avatar-1.svg`}
                  width={40}
                  height={40}
              />
          )}
        </div>
        <h2>Hi {activeUser.name}!</h2>
    </div>
  ) : ( 
    <h2 className={styles.standalone_greeting}>Hi there!</h2>
  );
}