import Image from "next/image";
import styles from "./PostDetail.module.css";

export default function PostDetailPage() {
  return (
    <div className={styles.post}>
      <div className={styles.head}>
        <div className={styles.text8}>spotJam</div>
        <Image
          className={styles.line}
          src="/images/detail/line-3.svg"
          alt="line"
          width={393}
          height={2}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.POST}>
          <div className={styles.text6}>
            大阪・蜀味天下（Shokumi Tenka Hotpot Restaurant)...
          </div>

          <Image className={styles.image2} src="/images/detail/image-3.png" alt="" width={34} height={31} />
          <Image className={styles.image3} src="/images/detail/image-4.png" alt="" width={22} height={24} />
          <Image className={styles.image4} src="/images/detail/image-5.png" alt="" width={36} height={32} />

          <div className={styles.text7}>にゃんにゃん</div>
          <Image className={styles.image5} src="/images/detail/image-6.png" alt="" width={20} height={20} />

          <div className={styles.view} />

          <div className={styles.text5}>＃中華＃火鍋＃食べ放題</div>
          <div className={styles.text4}>1/2</div>

          <div className={styles.text3}>
            🌟食べ放題３０００円以下🌟
            <br /><br />
            スープの味が４つもあって…
          </div>

          <Image className={styles.img} src="/images/detail/image-2.png" alt="" width={18} height={18} />
          <div className={styles.text2}>
            大阪府大阪市中央区東心斎橋１丁目１３−２０ カネ...
          </div>

          <Image className={styles.image} src="/images/detail/image.png" alt="" width={18} height={18} />
          <div className={styles.div}>心斎橋駅 4分・難波 16分</div>

          <div className={styles.text}>…</div>
        </div>
      </div>
    </div>
  );
}
