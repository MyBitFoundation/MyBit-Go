import styled, { css } from 'styled-components';

const flexAndAddMarginBottom = (hasWithdrawButton) => `
  display: flex;

  ${hasWithdrawButton && css`
    button:nth-child(1){
      margin-bottom: 5px;
      margin-right: 0px;
    }

    button:nth-child(2){
      margin-bottom: 20px;
    }
  `}
`;

const blockAndAddMarginRight = (hasWithdrawButton) => `
  display: block;
  margin-right: 10px;

  ${hasWithdrawButton && css`
    button:nth-child(1){
      margin-right: 10px;
      margin-bottom: 0px;
    }
    button:nth-child(2){
      margin-bottom: 0px;
    }
  `}
`;

const AssetPortfolioInvestmentButtons = styled.div`
  position: absolute;
  right: 0px;
  align-items: flex-end;
  flex-direction: column;

  ${props => blockAndAddMarginRight(props.hasWithdrawButton)}

  @media(max-width: 1349px){
    ${props => flexAndAddMarginBottom(props.hasWithdrawButton)}
  }

  @media(max-width: 1199px){
    ${props => blockAndAddMarginRight(props.hasWithdrawButton)}
  }

  @media(max-width: 949px){
    ${props => flexAndAddMarginBottom(props.hasWithdrawButton)}
  }

  @media(max-width: 768px){
    ${props => blockAndAddMarginRight(props.hasWithdrawButton)}
  }

  @media(max-width: 499px){
    ${props => flexAndAddMarginBottom(props.hasWithdrawButton)}
  }
}`

export default AssetPortfolioInvestmentButtons;