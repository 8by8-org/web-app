import styles from '@/styles/modules/components/footer/footer.module.scss';
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineInstagram,
} from "react-icons/ai";

type FooterProps = {
  isPreview?:boolean;
}

export default function Footer({ isPreview }:FooterProps) {
  return (
    <div className={styles.footer_container}>
      <footer className={styles.footer}>
        <div className={styles.icons}>
          <button 
            className={styles.transparent_btn}
            onClick={() =>
              !isPreview && window.open("https://www.facebook.com/8by8vote/", "_blank")
            }
            aria-label="open 8by8 Facebook page"
          >
            <AiFillFacebook />
          </button>
          <button
            className={styles.transparent_btn} 
            onClick={() =>
              !isPreview && window.open("https://www.linkedin.com/company/8by8vote/", "_blank")
            }
            aria-label="open 8by8 LinkedIn page"
          >
            <AiFillLinkedin />
          </button>
          <button
            className={styles.transparent_btn} 
            onClick={() =>
              !isPreview && window.open("https://www.instagram.com/8by8vote/", "_blank")
            }
            aria-label="open 8by8 Instagram page"
          >
            <AiOutlineInstagram />
          </button>
        </div>
        <div className={styles.description}>
          <p>Copyright © 2021</p>
          <p>
            8BY8 is a nonprofit organization dedicated to stopping hate against
            Asian American Pacific Islander communities through voter registration
            and turnout.
          </p>
        </div>
      </footer>
    </div>
  );
}