import styles from "./page.module.css";


export default function Page() {
  	return (
    		<div className={styles.div}>
      			<img className={styles.bottomIcon} alt="" />
      			<div className={styles.body}>
        				<div className={styles.div2}>
          					<div className={styles.div3} />
          					<b className={styles.b}>その他</b>
          					<div className={styles.div4} />
          					<b className={styles.b2}>女性</b>
          					<div className={styles.div5} />
          					<b className={styles.b3}>男性</b>
          					<b className={styles.b4}>性別</b>
        				</div>
        				<div className={styles.div6}>
          					<div className={styles.div7}>
            						<div className={styles.child} />
            						<div className={styles.div8}>5</div>
          					</div>
          					<div className={styles.div9}>
            						<div className={styles.child} />
            						<div className={styles.div8}>4</div>
          					</div>
          					<div className={styles.div11}>
            						<div className={styles.child} />
            						<div className={styles.div8}>3</div>
          					</div>
          					<div className={styles.div13}>
            						<div className={styles.ellipseDiv} />
            						<div className={styles.div8}>2</div>
          					</div>
          					<div className={styles.div15}>
            						<div className={styles.ellipseDiv} />
            						<div className={styles.div8}>1</div>
          					</div>
        				</div>
      			</div>
      			<div className={styles.head}>
        				<b className={styles.b5}>会員登録</b>
      			</div>
    		</div>);
};

export default Component1 as FunctionComponent;