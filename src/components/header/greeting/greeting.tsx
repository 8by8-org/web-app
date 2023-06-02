import { useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/contexts/UserContext";
import BlobSvg from "../../../../public/assets/4-pages/Sidebar/Blob.svg";
import styles from '@/styles/modules/components/header/greeting/greeting.module.scss';

export default function Greeting() {
  const {activeUser} = useContext(UserContext);

  return activeUser ? (
    <div className="avatar-greeting">
        <div className="blob">
            <Image src={BlobSvg} alt="player avatar background blob"/>
        </div>
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
                className="avatar"
                src={require(`../../../../public/assets/3-avatars/avatar-1.svg`).default}
            />
        )}
        <p className="text">HI {activeUser.name}!</p>
    </div>
  ) : ( 
    <h2 className={styles.standalone_greeting}>HI THERE!</h2>
  );
}