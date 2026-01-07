import styles from "./page.module.css";


export function Hamburger() {
  	return (
    		<div className={styles.hamburger}>
      			<div className={styles.bottom} />
      			<div className={styles.body}>
        				<div className={styles.div}>
          					<div className={styles.logout}>
            						<div className={styles.logoutChild} />
            						<img className={styles.icon} alt="" />
            						<b className={styles.b}>ログアウト</b>
            						<img className={styles.logoutIcon} alt="" />
          					</div>
          					<div className={styles.div2}>
            						<div className={styles.logoutChild} />
            						<img className={styles.icon} alt="" />
            						<b className={styles.b}>アカウントを削除</b>
            						<img className={styles.icon3} alt="" />
          					</div>
          					<div className={styles.div3}>
            						<div className={styles.logoutChild} />
            						<img className={styles.icon} alt="" />
            						<b className={styles.b}>キャッシュをクリア</b>
            						<img className={styles.icon5} alt="" />
          					</div>
          					<div className={styles.sns}>
            						<div className={styles.logoutChild} />
            						<img className={styles.icon} alt="" />
            						<b className={styles.b}>SNS連携の状況</b>
          					</div>
        				</div>
        				<div className={styles.div4}>
          					<img className={styles.istockphoto1389610257170667aIcon} alt="" />
          					<b className={styles.b4}>グループ管理</b>
        				</div>
        				<div className={styles.div5}>
          					<img className={styles.icon7} alt="" />
          					<b className={styles.b5}>ポスター管理</b>
        				</div>
        				<div className={styles.div6}>
          					<img className={styles.icon8} alt="" />
          					<b className={styles.b4}>プロフィール管理</b>
        				</div>
        				<div className={styles.myprofile}>
          					<img className={styles.kumaIcon} alt="" />
          					<b className={styles.b7}>にゃんにゃん</b>
        				</div>
      			</div>
      			<div className={styles.head}>
        				<div className={styles.headChild} />
        				<b className={styles.spotjam}>spotJam</b>
        				<img className={styles.menuIcon} alt="" />
      			</div>
      			<img className={styles.icon9} alt="" />
      			<div className={styles.menu}>
        				<div className={styles.myprofile2}>
          					<img className={styles.kumaIcon2} alt="" />
          					<b className={styles.b8}>にゃんにゃん</b>
        				</div>
        				<div className={styles.div7}>
          					<div className={styles.logout2}>
            						<img className={styles.icon10} alt="" />
            						<b className={styles.b9}>ログアウト</b>
            						<img className={styles.logoutIcon2} alt="" />
          					</div>
          					<div className={styles.div8}>
            						<img className={styles.icon10} alt="" />
            						<b className={styles.b9}>アカウントを削除</b>
            						<img className={styles.icon12} alt="" />
          					</div>
          					<div className={styles.div9}>
            						<img className={styles.icon10} alt="" />
            						<b className={styles.b9}>キャッシュをクリア</b>
            						<img className={styles.icon14} alt="" />
          					</div>
          					<div className={styles.sns3}>
            						<img className={styles.icon10} alt="" />
            						<b className={styles.b9}>SNS連携の状況</b>
            						<img className={styles.icon16} alt="" />
          					</div>
          					<div className={styles.div10}>
            						<img className={styles.icon10} alt="" />
            						<b className={styles.b9}>グループ管理</b>
            						<img className={styles.groupIcon} alt="" />
          					</div>
          					<div className={styles.div11}>
            						<img className={styles.icon18} alt="" />
            						<b className={styles.b13}>ポスター管理</b>
            						<img className={styles.icon19} alt="" />
          					</div>
          					<div className={styles.div12}>
            						<img className={styles.icon10} alt="" />
            						<b className={styles.b9}>プロフィール管理</b>
            						<img className={styles.icon21} alt="" />
          					</div>
          					<div className={styles.div13}>
            						<b className={styles.b15}>いいね</b>
            						<img className={styles.icon22} alt="" />
          					</div>
          					<div className={styles.div14}>
            						<b className={styles.b15}>ポスター</b>
            						<img className={styles.icon23} alt="" />
          					</div>
          					<div className={styles.div15}>
            						<b className={styles.b15}>マップ</b>
            						<img className={styles.mapIcon} alt="" />
          					</div>
        				</div>
        				<div className={styles.menuChild} />
      			</div>
    		</div>);
};

export default HAMBURGER as FunctionComponent;