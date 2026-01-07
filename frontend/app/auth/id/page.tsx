import styles from "./page.module.css";


export default function Page() {
  	return (
    		<div className={styles.id}>
      			<img className={styles.bottomIcon} alt="" />
      			<div className={styles.body}>
        				<div className={styles.div}>
          					<img className={styles.icon} alt="" />
          					<b className={styles.b}>再送信</b>
          					<img className={styles.icon2} alt="" />
          					<b className={styles.b2}>認証する</b>
          					<div className={styles.div2} />
          					<div className={styles.div3}> 6桁のコードを入力</div>
          					<div className={styles.div4}>認証コード</div>
          					<img className={styles.icon3} alt="" />
          					<b className={styles.b3}>認証コードを送る</b>
          					<div className={styles.id2} />
          					<div className={styles.id3}> ログインID</div>
          					<b className={styles.b4}>メール</b>
        				</div>
        				<div className={styles.div5}>
          					<div className={styles.div6}>
            						<div className={styles.child} />
            						<div className={styles.div7}>5</div>
          					</div>
          					<div className={styles.div8}>
            						<div className={styles.item} />
            						<div className={styles.div7}>4</div>
          					</div>
          					<div className={styles.div10}>
            						<div className={styles.item} />
            						<div className={styles.div7}>3</div>
          					</div>
          					<div className={styles.div12}>
            						<div className={styles.item} />
            						<div className={styles.div7}>2</div>
          					</div>
          					<div className={styles.div14}>
            						<div className={styles.item} />
            						<div className={styles.div7}>1</div>
          					</div>
        				</div>
      			</div>
      			<div className={styles.head}>
        				<b className={styles.b5}>会員登録</b>
      			</div>
    		</div>);
};

export default ID as FunctionComponent;