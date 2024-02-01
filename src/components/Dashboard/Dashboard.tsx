// local import
import "./dashboard.css";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";

const Dashboard = () => {
  return (
    <section className="dashMain">
      <div className="dashWrapper">
        <div className="dashContentFirst">
          <div className="secondContent">
            <div className="tradeItemParent">
              <div>
                <div>
                  <h4>-$500</h4>
                  <p>32 minutes ago</p>
                </div>
                <div className="iconParent">
                  <HiArrowTrendingDown color="white" size={"22.5px"} />
                </div>
              </div>

              <div>
                <div>
                  <h4>+$1200</h4>
                  <p>50 minutes ago</p>
                </div>
                <div className="iconParent">
                  <HiArrowTrendingUp color="white" size={"22.5px"} />
                </div>
              </div>

              <div>
                <div>
                  <h4>-$100</h4>
                  <p>2 hours ago</p>
                </div>
                <div className="iconParent">
                  <HiArrowTrendingDown color="white" size={"22.5px"} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashContentSecond">
          <div className="dashChildFirst">
            <h2>Coming Soon..!</h2>
            <h3>
              The trading platform will be operational
              <br /> on the day of the launch
            </h3>
          </div>
          <div className="dashChild">
            <div>
              <p>Market Insights</p>
              <h4>
                (BTC) ETF Approval Expected <br />
                this year
              </h4>
            </div>
            <div>
              <p>Profit/Loss</p>
              <h4>
                +$500 Profit <br /> last 24 hours
              </h4>
            </div>
          </div>
        </div>
        <div className="dashContentThird">
          <div className="thirdDashChild">
            <div>
              <p>Market Insights</p>
              <h4>
                (BTC) ETF Approval Expected <br />
                this year
              </h4>
            </div>
            <div>
              <p>Profit/Loss</p>
              <h4>
                +$500 Profit <br /> last 24 hours
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
