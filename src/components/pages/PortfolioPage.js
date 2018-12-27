import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/col';
import Button from 'antd/lib/button';
import 'antd/lib/row/style';
import '../../styles/PortfolioPage.css';
import LoadingPage from './LoadingPage';
import PieChart from '../../images/chart-pie.svg';
import LineChart from '../../images/chart-line.svg';
import Fee from '../../images/Fee.png';
import AssetPortfolio from '../AssetPortfolio';
import { formatMonetaryValue } from '../../util/helpers';
import { ManagedAssetCardGrid } from '../UI/ManagedAssetPage/ManagedAssetCardGrid'
import ValueDisplay from '../ValueDisplay';

const ButtonGroup = Button.Group;

const fromWeiToEth = weiValue => window.web3js.utils.fromWei(weiValue, 'ether');

const getOwnedAssets = assets =>
  assets
    .filter(asset => asset.ownershipUnits > 0
      && !(asset.pastDate && asset.amountToBeRaisedInUSD !== asset.amountRaisedInUSD));

const getPortfolioValue = (assets, currentEthPrice) =>
  assets.reduce(
    (accumulator, currentValue) =>
      accumulator +
      currentValue.amountToBeRaisedInUSD === currentValue.amountRaisedInUSD
        ?  currentValue.amountRaisedInUSD :
          (fromWeiToEth(currentValue.ownershipUnits, 'ether') * currentEthPrice),
    0,
  );

const getPortfolioRevenue = (assets, currentEthPrice) =>
  assets.reduce(
    (accumulator, currentValue) =>
      (accumulator) +
      (((fromWeiToEth(currentValue.ownershipUnits, 'ether') * currentEthPrice) /
        (currentValue.amountToBeRaisedInUSD)) *
        currentValue.assetIncome),
    0,
  );

const getPortfolioValueAssets = (assets, currentEthPrice) =>
  assets.map((asset) => {
    let ownership = (
      ((fromWeiToEth(asset.ownershipUnits, 'ether') * currentEthPrice) /
        asset.amountToBeRaisedInUSD) *
      100
    ).toFixed(2);
    if (Number(ownership) > 100) {
      ownership = 100;
    }
    return {
      assetID: asset.assetID,
      name: asset.name,
      ownership,
      value: (
        fromWeiToEth(asset.ownershipUnits, 'ether') * currentEthPrice
      ).toFixed(2),
    };
  });

const getPortfolioRevenueAssets = (assets, currentEthPrice) =>
  assets.map((asset) => {
    const totalRevenue =
      ((fromWeiToEth(asset.ownershipUnits, 'ether') * currentEthPrice) /
        asset.amountToBeRaisedInUSD) *
      asset.assetIncome;
    return {
      assetID: asset.assetID,
      name: asset.name,
      monthlyRevenue: (totalRevenue / 12).toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
    };
  });

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
    this.displayOwned = this.displayOwned.bind(this);
    this.displayManaged = this.displayManaged.bind(this);
    this.state = {
      currentView: "managed",
    };
  }

  displayOwned() {
    this.setState({ currentView: "owned" });
  }

  displayManaged() {
    this.setState({ currentView: "managed" });
  }

  render() {
    const { loading, assets, prices, withdrawInvestorProfit, withdrawingAssetIds } = this.props;
    const { currentView } = this.state;

    if (loading.assets || !prices.ether) {
      return <LoadingPage message="Loading portfolio" />;
    }

    const { ether } = prices;
    const ownedAssets = getOwnedAssets(assets);
    const totalPortfolioValue = getPortfolioValue(
      ownedAssets,
      ether.price,
    );
    const totalPortfolioRevenue = getPortfolioRevenue(
      ownedAssets,
      ether.price,
    );

    const portfolioValueAssets = getPortfolioValueAssets(ownedAssets, ether.price);
    const portfolioRevenueAssets = getPortfolioRevenueAssets(
      ownedAssets,
      ether.price,
    );

    const totalValueEth =
      parseFloat((totalPortfolioValue / ether.price)
        .toFixed(5));

    const totalRevenuePercentage =
      (totalPortfolioValue > 0 && totalPortfolioRevenue > 0)
        ? parseFloat(((totalPortfolioRevenue * 100) / totalPortfolioValue).toFixed(2))
        : 0;

    return (
      <div>
        <div className="Portfolio">
          <div className="Portfolio__cards">
            <ValueDisplay
              text="Total Portfolio Value"
              value={formatMonetaryValue(totalPortfolioValue)}
              icon={<PieChart />}
              hasSeparator
              hasIcon
              hasShadow
              isBlue
            />
            <ValueDisplay
              text="Total Revenue"
              value={`${formatMonetaryValue(totalPortfolioRevenue)}%`}
              icon={<LineChart />}
              hasSeparator
              hasIcon
              hasShadow
              isGreen
            />
            {currentView === "managed" && (
              <div className="Portfolio__card">
                <img className="Portfolio__card-img" src={Fee} alt="Fee icon" />
                <span>Total Management Profit</span>
                <div className="Portfolio__card-separator" />
                <b className="Portfolio__card-value--is-blue">450$</b>
              </div>
            )}
            <div className="Portfolio__card-buttons">
              <ButtonGroup size="large">
                <Button onClick={this.displayOwned}
                  type={currentView === "owned" ? "primary" : "secondary"}>Investments</Button>
                <Button onClick={this.displayManaged}
                  type={currentView === "managed" ? "primary" : "secondary"}>Managed assets</Button>
              </ButtonGroup>
            </div>
          </div>
          <Row className="Portfolio__assets">
            {currentView === "owned" && ownedAssets.map((asset, index) => (
              <AssetPortfolio
                key={asset.assetID}
                name={asset.name}
                backgroundImage={asset.imageSrc}
                unrealizedProfit={portfolioRevenueAssets[index].totalRevenue}
                ownershipUsd={portfolioValueAssets[index].value}
                ownershipPercentage={portfolioValueAssets[index].ownership}
                funding={asset.amountRaisedInUSD}
                fundingTotal={asset.amountToBeRaisedInUSD}
                fundingStage={asset.fundingStage}
                assetID={asset.assetID}
                category={asset.category}
                numberOfInvestors={asset.numberOfInvestors}
                owedToInvestor={asset.owedToInvestor}
                withdrawInvestorProfit={withdrawInvestorProfit}
                withdrawingAssetIds={withdrawingAssetIds}
              />
            ))}
            {currentView === "managed" && (
              <ManagedAssetCardGrid assets={[]} />
            )}
          </Row>
        </div>
      </div>
    );
  }
};

PortfolioPage.propTypes = {
  loading: PropTypes.shape({}).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  prices: PropTypes.shape({}).isRequired,
};

export default PortfolioPage;
