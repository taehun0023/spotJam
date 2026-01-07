import styles from "./page.module.css";


export default function Page() {
  	return (
    		<div className={styles.pw}>
      			<img className={styles.bottomIcon} alt="" />
      			<div className={styles.body}>
        				<div className={styles.div}>
          					<div className={styles.div2}>※8文字以上、数字・英大文字・英小文字を各1文字以上使用してください。</div>
          					<div className={styles.div3} />
          					<img className={styles.icon} alt="" />
          					<div className={styles.div4}> パスワード（確認用）</div>
          					<div className={styles.div5} />
          					<img className={styles.icon2} alt="" />
          					<div className={styles.div6}> パスワード</div>
          					<b className={styles.b}>パスワード</b>
        				</div>
        				<div className={styles.div7}>
          					<div className={styles.div8}>
            						<div className={styles.child} />
            						<div className={styles.div9}>5</div>
          					</div>
          					<div className={styles.div10}>
            						<div className={styles.child} />
            						<div className={styles.div9}>4</div>
          					</div>
          					<div className={styles.div12}>
            						<div className={styles.child} />
            						<div className={styles.div9}>3</div>
          					</div>
          					<div className={styles.div14}>
            						<div className={styles.child} />
            						<div className={styles.div9}>2</div>
          					</div>
          					<div className={styles.div16}>
            						<div className={styles.child} />
            						<div className={styles.div9}>1</div>
          					</div>
        				</div>
      			</div>
      			<div className={styles.head}>
        				<b className={styles.b2}>会員登録</b>
      			</div>
    		</div>);
};

export default PW as FunctionComponent;