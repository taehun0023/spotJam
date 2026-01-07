import styles from "./page.module.css";

export default function Page() {
  	return (
		    <div className="screen">
    		<div className={styles.map}>
      			<div className={styles.body}>
        				<div className={styles.map2}>
          					<img className={styles.icon} alt="" />
          					<div className={styles.div}>
            						<div className={styles.div2}>
              							<div className={styles.div3}>{`東京都渋谷区渋谷２丁目２４−12 スクランブルスクエア... `}</div>
              							<img className={styles.icon2} alt="" />
              							<div className={styles.div4}>渋谷スカイ</div>
            						</div>
            						<div className={styles.div5}>
              							<div className={styles.div6}>東京都渋谷区道玄坂２丁目１</div>
              							<img className={styles.icon3} alt="" />
              							<div className={styles.div4}>ハチ公前広場</div>
            						</div>
            						<div className={styles.div8} />
          					</div>
          					<img className={styles.icon4} alt="" />
          					<img className={styles.icon5} alt="" />
        				</div>
        				<div className={styles.div9}>
          					<img className={styles.icon6} alt="" />
          					<img className={styles.icon7} alt="" />
          					<div className={styles.my}>MY</div>
          					<img className={styles.icon8} alt="" />
          					<img className={styles.icon9} alt="" />
          					<div className={styles.group}>GROUP</div>
          					<img className={styles.icon10} alt="" />
          					<img className={styles.icon11} alt="" />
          					<div className={styles.all}>ALL</div>
        				</div>
        				<div className={styles.div10}>
          					<img className={styles.bottonIcon} alt="" />
        				</div>
      			</div>
      			<div className={styles.head}>
        				<div className={styles.headChild} />
        				<b className={styles.spotjam}>spotJam</b>
      			</div>
    		</div>
			</div>);
};
